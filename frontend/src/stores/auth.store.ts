import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/services/api';

interface AuthUser { token: string; role: string; full_name?: string; }

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const role = ref<string | null>(localStorage.getItem('role'));
  const fullName = ref<string | null>(localStorage.getItem('full_name'));

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => role.value === 'system_admin');
  const isShopOwner = computed(() => role.value === 'shop_owner');
  const isCustomer = computed(() => role.value === 'customer');

  function setAuth(data: AuthUser) {
    token.value = data.token;
    role.value = data.role;
    fullName.value = data.full_name ?? null;
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    if (data.full_name) localStorage.setItem('full_name', data.full_name);
  }

  function logout() {
    token.value = null;
    role.value = null;
    fullName.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('full_name');
    api.clearCache();
  }

  async function login(email: string, password: string) {
    const data = await api.post<AuthUser>('/api/auth/login', { email, password });
    setAuth(data);
    return data;
  }

  async function register(payload: Record<string, unknown>) {
    const data = await api.post<AuthUser>('/api/auth/register', payload);
    setAuth(data);
    return data;
  }

  return { token, role, fullName, isLoggedIn, isAdmin, isShopOwner, isCustomer, login, register, logout };
});
