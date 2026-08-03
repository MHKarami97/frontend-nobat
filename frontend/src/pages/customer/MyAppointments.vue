<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { toJalali } from '@/utils/date';
import StatusBadge from '@/components/StatusBadge.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';

const appointments = ref<any[]>([]);
const loading = ref(true);
const cancelling = ref<number | null>(null);

onMounted(async () => {
  await load();
});

async function load() {
  loading.value = true;
  try {
    appointments.value = await api.get('/api/appointments/my');
  } finally {
    loading.value = false;
  }
}

async function cancel(id: number) {
  cancelling.value = id;
  try {
    await api.patch(`/api/appointments/${id}/cancel`, {});
    api.clearCache('/api/appointments');
    await load();
  } finally {
    cancelling.value = null;
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">نوبت‌های من</h1>

    <template v-if="loading">
      <SkeletonCard :count="4" />
    </template>

    <div v-else class="space-y-3">
      <div v-for="appt in appointments" :key="appt.id"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-semibold text-neutral-800">{{ appt.shop_name }}</p>
            <p class="text-sm text-neutral-500 mt-1">
              📅 {{ toJalali(appt.appointment_date) }} &nbsp;|&nbsp; {{ appt.start_time }} – {{ appt.end_time }}
            </p>
          </div>
          <StatusBadge :status="appt.status" />
        </div>
        <p v-if="appt.rejection_reason" class="text-xs text-red-500 mt-2">دلیل رد: {{ appt.rejection_reason }}</p>
        <button
          v-if="['pending','confirmed'].includes(appt.status)"
          @click="cancel(appt.id)"
          :disabled="cancelling === appt.id"
          class="mt-3 text-sm text-red-500 hover:underline disabled:opacity-50">
          {{ cancelling === appt.id ? 'در حال لغو...' : 'لغو نوبت' }}
        </button>
      </div>
      <div v-if="appointments.length === 0" class="text-center text-neutral-400 py-16">
        هنوز نوبتی رزرو نکرده‌اید
      </div>
    </div>
  </div>
</template>
