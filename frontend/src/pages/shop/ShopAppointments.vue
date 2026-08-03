<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { toJalali } from '@/utils/date';
import StatusBadge from '@/components/StatusBadge.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';

const appointments = ref<any[]>([]);
const loading = ref(true);
const actionId = ref<number | null>(null);
const rejectReason = ref('');
const showRejectModal = ref(false);
const rejectTargetId = ref<number | null>(null);

onMounted(async () => {
  await load();
});

async function load() {
  loading.value = true;
  appointments.value = await api.get('/api/appointments/shop', undefined, 0);
  loading.value = false;
}

async function confirm(id: number) {
  actionId.value = id;
  await api.patch(`/api/appointments/${id}/status`, { status: 'confirmed' });
  api.clearCache('/api/appointments');
  await load();
  actionId.value = null;
}

function openReject(id: number) {
  rejectTargetId.value = id;
  rejectReason.value = '';
  showRejectModal.value = true;
}

async function submitReject() {
  if (!rejectTargetId.value) return;
  actionId.value = rejectTargetId.value;
  await api.patch(`/api/appointments/${rejectTargetId.value}/status`, { status: 'rejected_by_shop', rejection_reason: rejectReason.value });
  api.clearCache('/api/appointments');
  showRejectModal.value = false;
  await load();
  actionId.value = null;
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">مدیریت نوبت‌ها</h1>

    <SkeletonCard v-if="loading" :count="4" />

    <div v-else class="space-y-3">
      <div v-for="appt in appointments" :key="appt.id"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
        <div class="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p class="font-semibold text-neutral-800">{{ appt.customer_name }}</p>
            <p class="text-sm text-neutral-500">📱 {{ appt.customer_mobile }}</p>
            <p class="text-sm text-neutral-500 mt-1">
              📅 {{ toJalali(appt.appointment_date) }} | {{ appt.start_time }} – {{ appt.end_time }}
            </p>
          </div>
          <StatusBadge :status="appt.status" />
        </div>
        <p v-if="appt.rejection_reason" class="text-xs text-red-400 mt-2">دلیل: {{ appt.rejection_reason }}</p>
        <div v-if="appt.status === 'pending'" class="flex gap-2 mt-3">
          <button @click="confirm(appt.id)" :disabled="actionId === appt.id"
            class="flex-1 py-2 text-sm bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50">
            ✅ تایید
          </button>
          <button @click="openReject(appt.id)" :disabled="actionId === appt.id"
            class="flex-1 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition disabled:opacity-50">
            ❌ رد
          </button>
        </div>
      </div>
      <div v-if="appointments.length === 0" class="text-center text-neutral-400 py-16">نوبتی ثبت نشده است</div>
    </div>

    <!-- Reject modal -->
    <Transition name="fade">
      <div v-if="showRejectModal" class="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center px-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <h3 class="font-semibold text-neutral-800 mb-4">دلیل رد نوبت</h3>
          <textarea v-model="rejectReason" rows="3" placeholder="دلیل را وارد کنید..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"></textarea>
          <div class="flex gap-2 mt-4">
            <button @click="submitReject" class="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition">رد کردن</button>
            <button @click="showRejectModal = false" class="flex-1 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-medium hover:bg-neutral-200 transition">انصراف</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
