import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787';

const http = axios.create({ baseURL: BASE_URL });

// Cache store
const cache = new Map<string, { data: unknown; expiresAt: number }>();

http.interceptors.request.use(config => {
  const auth = useAuthStore();
  if (auth.token) config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
});

http.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) useAuthStore().logout();
    return Promise.reject(err);
  }
);

function cacheKey(url: string, params?: unknown): string {
  return `${url}::${JSON.stringify(params ?? {})}`;
}

export const api = {
  async get<T>(url: string, params?: unknown, ttlMs = 2 * 60 * 1000): Promise<T> {
    const key = cacheKey(url, params);
    const cached = cache.get(key);
    if (cached && Date.now() < cached.expiresAt) return cached.data as T;

    const res = await http.get<T>(url, { params } as AxiosRequestConfig);
    cache.set(key, { data: res.data, expiresAt: Date.now() + ttlMs });
    return res.data;
  },

  async post<T>(url: string, body: unknown): Promise<T> {
    const res = await http.post<T>(url, body);
    return res.data;
  },

  async patch<T>(url: string, body: unknown): Promise<T> {
    const res = await http.patch<T>(url, body);
    return res.data;
  },

  async put<T>(url: string, body: unknown): Promise<T> {
    const res = await http.put<T>(url, body);
    return res.data;
  },

  async upload<T>(url: string, formData: FormData): Promise<T> {
    const res = await http.post<T>(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  },

  clearCache(pattern?: string): void {
    if (!pattern) { cache.clear(); return; }
    for (const key of cache.keys()) {
      if (key.startsWith(pattern)) cache.delete(key);
    }
  }
};
