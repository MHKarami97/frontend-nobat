export const statusMap: Record<string, { label: string; classes: string }> = {
  pending: { label: 'در انتظار', classes: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'تایید شده', classes: 'bg-green-100 text-green-700' },
  cancelled_by_customer: { label: 'لغو شده', classes: 'bg-gray-100 text-gray-600' },
  rejected_by_shop: { label: 'رد شده', classes: 'bg-red-100 text-red-700' },
  approved: { label: 'تایید شده', classes: 'bg-green-100 text-green-700' },
  banned: { label: 'مسدود', classes: 'bg-red-100 text-red-700' },
};

export const roleMap: Record<string, string> = {
  customer: 'مشتری',
  shop_owner: 'صاحب فروشگاه',
  system_admin: 'مدیر سیستم',
};

export const dayMap: Record<number, string> = {
  0: 'یکشنبه',
  1: 'دوشنبه',
  2: 'سه‌شنبه',
  3: 'چهارشنبه',
  4: 'پنجشنبه',
  5: 'جمعه',
  6: 'شنبه',
};

export function getStatusBadge(status: string): { label: string; classes: string } {
  return statusMap[status] ?? { label: status, classes: 'bg-gray-100 text-gray-600' };
}
