<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { resolveImageUrl } from '@/utils/image';

interface PaymentRequestRow {
  id: number;
  shop_name: string;
  shop_slug: string;
  plan_name: string;
  amount: number;
  transfer_reference: string | null;
  receipt_image_key: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_message: string | null;
  created_at: string;
}

const requests = ref<PaymentRequestRow[]>([]);
const filter = ref<'pending' | 'approved' | 'rejected' | ''>('pending');
const loading = ref(true);
const processingId = ref<number | null>(null);
const messageDraft = ref<Record<number, string>>({});

async function load() {
  loading.value = true;
  requests.value = await api.get('/api/admin/payment-requests', filter.value ? { status: filter.value } : undefined, 0);
  loading.value = false;
}

onMounted(load);

async function approve(req: PaymentRequestRow) {
  processingId.value = req.id;
  try {
    await api.patch(`/api/admin/payment-requests/${req.id}/approve`, { message: messageDraft.value[req.id] ?? '' });
    await load();
  } finally {
    processingId.value = null;
  }
}

async function reject(req: PaymentRequestRow) {
  const message = messageDraft.value[req.id];
  if (!message) { alert('لطفاً دلیل رد درخواست را بنویسید'); return; }
  processingId.value = req.id;
  try {
    await api.patch(`/api/admin/payment-requests/${req.id}/reject`, { message });
    await load();
  } finally {
    processingId.value = null;
  }
}

function formatPrice(n: number): string {
  return n.toLocaleString('fa-IR') + ' تومان';
}

function statusLabel(status: string): string {
  return { pending: 'در انتظار بررسی', approved: 'تایید شده', rejected: 'رد شده' }[status] ?? status;
}

function statusColor(status: string): string {
  return {
    pending: 'bg-yellow-50 text-yellow-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-600',
  }[status] ?? 'bg-neutral-100 text-neutral-600';
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">بررسی درخواست‌های اشتراک</h1>

    <div class="flex gap-2 mb-6">
      <button v-for="f in [['pending','در انتظار'],['approved','تایید شده'],['rejected','رد شده'],['','همه']] as const"
        :key="f[0]" @click="filter = f[0] as any; load()"
        :class="['px-4 py-2 rounded-xl text-sm font-medium transition',
          filter === f[0] ? 'bg-primary text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50']">
        {{ f[1] }}
      </button>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-40 shimmer rounded-2xl"></div>
    </div>

    <div v-else class="space-y-4">
      <div v-for="req in requests" :key="req.id" class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <p class="font-semibold text-neutral-800">{{ req.shop_name }} <span class="text-neutral-400 text-sm">(@{{ req.shop_slug }})</span></p>
            <p class="text-sm text-neutral-500 mt-1">پلن {{ req.plan_name }} — {{ formatPrice(req.amount) }}</p>
            <p v-if="req.transfer_reference" class="text-xs text-neutral-400 mt-1">کد پیگیری: {{ req.transfer_reference }}</p>
            <p class="text-xs text-neutral-400 mt-1">{{ req.created_at?.slice(0, 16).replace('T', ' ') }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-xs font-medium', statusColor(req.status)]">{{ statusLabel(req.status) }}</span>
        </div>

        <a :href="resolveImageUrl(req.receipt_image_key)" target="_blank" rel="noopener" class="block mb-4">
          <img :src="resolveImageUrl(req.receipt_image_key)" class="max-h-64 rounded-xl border border-neutral-100 object-contain" />
        </a>

        <p v-if="req.admin_message" class="text-sm text-neutral-600 bg-neutral-50 rounded-lg p-3 mb-3">💬 {{ req.admin_message }}</p>

        <template v-if="req.status === 'pending'">
          <textarea v-model="messageDraft[req.id]" rows="2" placeholder="پیام برای فروشگاه (اختیاری برای تایید، الزامی برای رد)"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none mb-3"></textarea>
          <div class="flex gap-2">
            <button @click="reject(req)" :disabled="processingId === req.id"
              class="flex-1 py-2.5 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition disabled:opacity-50">
              رد درخواست
            </button>
            <button @click="approve(req)" :disabled="processingId === req.id"
              class="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 transition disabled:opacity-50">
              {{ processingId === req.id ? 'در حال پردازش...' : 'تایید و فعال‌سازی' }}
            </button>
          </div>
        </template>
      </div>

      <div v-if="requests.length === 0" class="text-center text-neutral-400 py-12">درخواستی یافت نشد</div>
    </div>
  </div>
</template>
