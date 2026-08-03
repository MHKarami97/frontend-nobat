<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { toGregorian, jalaaliMonthLength } from 'jalaali-js';
import { todayJalali } from '@/utils/date';

const props = defineProps<{ modelValue: string; minToday?: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];
const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

const [initJy, initJm] = props.modelValue.split('/').map(Number);
const viewYear = ref(initJy);
const viewMonth = ref(initJm);
const open = ref(false);

const todayParts = computed(() => {
  const [jy, jm, jd] = todayJalali().split('/').map(Number);
  return { jy, jm, jd };
});

function weekdayIndex(jy: number, jm: number, jd: number): number {
  const { gy, gm, gd } = toGregorian(jy, jm, jd);
  const jsDay = new Date(gy, gm - 1, gd).getDay(); // 0=Sunday..6=Saturday
  return (jsDay + 1) % 7; // shift so Saturday=0
}

const calendarCells = computed(() => {
  const daysInMonth = jalaaliMonthLength(viewYear.value, viewMonth.value);
  const firstWeekday = weekdayIndex(viewYear.value, viewMonth.value, 1);
  const cells: Array<{ jd: number | null }> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ jd: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ jd: d });
  return cells;
});

function isPast(jy: number, jm: number, jd: number): boolean {
  if (!props.minToday) return false;
  const t = todayParts.value;
  if (jy !== t.jy) return jy < t.jy;
  if (jm !== t.jm) return jm < t.jm;
  return jd < t.jd;
}

function isSelected(jd: number): boolean {
  const [sy, sm, sd] = props.modelValue.split('/').map(Number);
  return sy === viewYear.value && sm === viewMonth.value && sd === jd;
}

function selectDay(jd: number | null) {
  if (jd === null) return;
  if (isPast(viewYear.value, viewMonth.value, jd)) return;
  const value = `${viewYear.value}/${String(viewMonth.value).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
  emit('update:modelValue', value);
  open.value = false;
}

function prevMonth() {
  if (viewMonth.value === 1) { viewMonth.value = 12; viewYear.value -= 1; }
  else viewMonth.value -= 1;
}

function nextMonth() {
  if (viewMonth.value === 12) { viewMonth.value = 1; viewYear.value += 1; }
  else viewMonth.value += 1;
}

watch(() => props.modelValue, (val) => {
  const [jy, jm] = val.split('/').map(Number);
  viewYear.value = jy;
  viewMonth.value = jm;
});
</script>

<template>
  <div class="relative">
    <button type="button" @click="open = !open"
      class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-right">
      <span class="text-neutral-800">{{ modelValue }}</span>
      <span class="text-neutral-400">📅</span>
    </button>

    <div v-if="open" class="absolute z-20 mt-2 w-72 bg-white rounded-2xl border border-neutral-100 shadow-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <button type="button" @click="nextMonth" class="p-1.5 rounded-lg hover:bg-neutral-100 transition">‹</button>
        <span class="text-sm font-semibold text-neutral-800">{{ monthNames[viewMonth - 1] }} {{ viewYear }}</span>
        <button type="button" @click="prevMonth" class="p-1.5 rounded-lg hover:bg-neutral-100 transition">›</button>
      </div>

      <div class="grid grid-cols-7 gap-1 mb-1">
        <span v-for="w in weekDays" :key="w" class="text-xs text-center text-neutral-400 font-medium py-1">{{ w }}</span>
      </div>

      <div class="grid grid-cols-7 gap-1">
        <button v-for="(cell, idx) in calendarCells" :key="idx" type="button"
          :disabled="cell.jd === null || isPast(viewYear, viewMonth, cell.jd)"
          @click="selectDay(cell.jd)"
          :class="['h-9 rounded-lg text-sm transition',
            cell.jd === null ? 'invisible' :
            isPast(viewYear, viewMonth, cell.jd) ? 'text-neutral-300 cursor-not-allowed' :
            isSelected(cell.jd) ? 'bg-primary text-white font-semibold' :
            'text-neutral-700 hover:bg-primary/10']">
          {{ cell.jd }}
        </button>
      </div>
    </div>
  </div>
</template>