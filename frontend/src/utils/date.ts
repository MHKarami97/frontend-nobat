import jalaali from 'jalaali-js';

export function toJalali(gregorianDate: string): string {
  if (!gregorianDate) return '';
  const [y, m, d] = gregorianDate.split('-').map(Number);
  const { jy, jm, jd } = jalaali.toJalaali(y, m, d);
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}

export function fromJalali(jalaliDate: string): string {
  const [jy, jm, jd] = jalaliDate.split('/').map(Number);
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

export function todayGregorian(): string {
  return new Date().toISOString().split('T')[0];
}

export function todayJalali(): string {
  return toJalali(todayGregorian());
}

export function getJalaliMonthDays(jy: number, jm: number): number {
  return jalaali.jalaaliMonthLength(jy, jm);
}
