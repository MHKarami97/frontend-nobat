<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { useShopStore } from '@/stores/shop.store';
import SkeletonCard from '@/components/SkeletonCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { toJalali } from '@/utils/date';

const shopStore = useShopStore();
const appointments = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  await shopStore.fetchMyShop();
  appointments.value = await api.get('/api/appointments/shop');
  loading.value = false;
});

const stats = ref([
  { label: 'کل نوبت‌ها', key: 'total', icon: '📅' },
  { label: 'در انتظار', key: 'pending', icon: '⏳' },
  { label: 'تایید شده', key: 'confirmed', icon: '✅' },
]);

function count(status: string) {
  if (status === 'total') return appointments.value.length;
  return appointments.value.filter(a => a.status === status).length;
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-neutral-800">داشبورد فروشگاه</h1>
      <StatusBadge v-if="shopStore.myShop" :status="shopStore.myShop.status as string" />
    </div>

    <div v-if="shopStore.myShop?.status === 'pending'"
      class="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 text-sm text-yellow-700">
      ⏳ فروشگاه شما در انتظار تایید مدیر است. پس از تایید، مشتریان می‌توانند نوبت رزرو کنند.
    </div>

    <template v-if="loading">
      <SkeletonCard :count="3" />
    </template>
    <template v-else>
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div v-for="s in stats" :key="s.key"
          class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 text-center">
          <div class="text-3xl mb-2">{{ s.icon }}</div>
          <div class="text-2xl font-bold text-neutral-800">{{ count(s.key) }}</div>
          <div class="text-xs text-neutral-500 mt-1">{{ s.label }}</div>
        </div>
      </div>

      <h2 class="text-lg font-semibold text-neutral-800 mb-3">آخرین نوبت‌ها</h2>
      <div class="space-y-3">
        <div v-for="appt in appointments.slice(0, 5)" :key="appt.id"
          class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p class="font-medium text-neutral-700">{{ appt.customer_name }}</p>
            <p class="text-xs text-neutral-400">{{ toJalali(appt.appointment_date) }} – {{ appt.start_time }}</p>
          </div>
          <StatusBadge :status="appt.status" />
        </div>
      </div>
    </template>
  </div>
</template>
