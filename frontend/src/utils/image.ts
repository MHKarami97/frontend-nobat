const BASE_URL = import.meta.env.VITE_R2_BASE_URL ?? '';

export function resolveImageUrl(key: string | null | undefined): string {
  if (!key) return '/placeholder-shop.png';
  return `${BASE_URL}/${key}`;
}
