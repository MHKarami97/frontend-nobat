<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { dayMap } from '@/utils/mapper';

const loading = ref(true);
const saving = ref(false);
const success = ref(false);

const schedules = ref(
  Array.from({ length: 7 }, (_, i) => ({
    day_of_week: i,
    start_time: '09:00',
    end_time: '18:00',
    is_closed: i === 5,
  }))
);

onMounted(async () => {
  try {
    const data: any[] = await api.get('/api/schedules');
    if (data.length === 7) {
      schedules.value = data.map(d => ({ ...d, is_closed: Boolean(d.is_closed) }));
    }
  } finally {
    loading.value = false;
  }
});

async function save() {
  saving.value = true;
  success.value = false;
  try {
    await api.put('/api/schedules', schedules.value);
    api.clearCache('/api/schedules');
    success.value = true;
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="max-w-lg">
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">تنظیم تقویم هفتگی</h1>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 7" :key="i" class="h-14 shimmer rounded-xl"></div>
    </div>

    <form v-else @submit.prevent="save" class="space-y-3">
      <div v-for="s in schedules" :key="s.day_of_week"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex items-center gap-4 flex-wrap">
        <span class="w-20 text-sm font-medium text-neutral-700">{{ dayMap[s.day_of_week] }}</span>

        <label class="flex items-center gap-2 text-sm text-neutral-500 mr-auto">
          <input type="checkbox" v-model="s.is_closed" class="rounded" />
          تعطیل
        </label>

        <template v-if="!s.is_closed">
          <input type="time" v-model="s.start_time"
            class="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          <span class="text-neutral-400 text-sm">تا</span>
          <input type="time" v-model="s.end_time"
            class="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
        </template>
      </div>

      <div v-if="success" class="bg-green-50 text-green-700 text-sm rounded-xl p-3 text-center">✅ تقویم ذخیره شد</div>

      <button type="submit" :disabled="saving"
        class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50">
        {{ saving ? 'در حال ذخیره...' : 'ذخیره تقویم' }}
      </button>
    </form>
  </div>
</template>
