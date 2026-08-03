<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { api } from '@/services/api';
import { compressImage } from '@/utils/imageCompress';
import { resolveImageUrl } from '@/utils/image';

interface Plan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  weekly_appointment_limit: number | null;
  features: string[];
}

interface CurrentPlan {
  active_plan_id: number | null;
  plan_name: string | null;
  plan_expires_at: string | null;
  weekly_appointment_limit: number | null;
  features: string[];
  is_free_tier: boolean;
}

interface PaymentRequestRow {
  id: number;
  plan_name: string;
  plan_price: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  admin_message: string | null;
  receipt_image_key: string;
  created_at: string;
}

const plans = ref<Plan[]>([]);
const current = ref<CurrentPlan | null>(null);
const history = ref<PaymentRequestRow[]>([]);
const loading = ref(true);

const selectedPlan = ref<Plan | null>(null);
const form = reactive({ transfer_reference: '' });
const receiptFile = ref<File | null>(null);
const receiptPreview = ref<string>('');
const submitting = ref(false);
const submitError = ref('');
const submitSuccess = ref(false);

const CARD_NUMBER = '6037-9911-2233-0000';
const CARD_HOLDER = 'شرکت دور گردون';

onMounted(async () => {
  const [plansRes, currentRes, historyRes] = await Promise.all([
    api.get<Plan[]>('/api/plans', undefined, 10 * 60 * 1000),
    api.get<CurrentPlan>('/api/subscription-requests/my/current', undefined, 0),
    api.get<PaymentRequestRow[]>('/api/subscription-requests/my', undefined, 0),
  ]);
  plans.value = plansRes;
  current.value = currentRes;
  history.value = historyRes;
  loading.value = false;
});

function choosePlan(plan: Plan) {
  selectedPlan.value = plan;
  form.transfer_reference = '';
  receiptFile.value = null;
  receiptPreview.value = '';
  submitError.value = '';
  submitSuccess.value = false;
}

async function onReceiptChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.[0]) return;
  submitError.value = '';
  try {
    const compressed = await compressImage(input.files[0], { maxWidth: 1024, maxHeight: 1024, quality: 0.85 });
    receiptFile.value = compressed;
    receiptPreview.value = URL.createObjectURL(compressed);
  } catch (e: any) {
    submitError.value = e?.message ?? 'خطا در پردازش تصویر';
  }
}

async function submitRequest() {
  if (!selectedPlan.value || !receiptFile.value) {
    submitError.value = 'لطفاً تصویر فیش واریزی را انتخاب کنید';
    return;
  }
  submitting.value = true;
  submitError.value = '';
  try {
    const fd = new FormData();
    fd.append('plan_id', String(selectedPlan.value.id));
    fd.append('amount', String(selectedPlan.value.price));
    if (form.transfer_reference) fd.append('transfer_reference', form.transfer_reference);
    fd.append('receipt', receiptFile.value);

    await api.upload('/api/subscription-requests', fd);
    submitSuccess.value = true;
    history.value = await api.get('/api/subscription-requests/my', undefined, 0);
    selectedPlan.value = null;
  } catch (e: any) {
    submitError.value = e?.response?.data?.error ?? 'خطا در ثبت درخواست';
  } finally {
    submitting.value = false;
  }
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

function formatPrice(n: number): string {
  return n.toLocaleString('fa-IR') + ' تومان';
}
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">اشتراک و محدودیت‌ها</h1>

    <template v-if="loading">
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div v-for="i in 3" :key="i" class="h-56 shimmer rounded-2xl"></div>
      </div>
    </template>

    <template v-else>
      <!-- Current plan status -->
      <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 mb-8">
        <h2 class="font-semibold text-neutral-700 mb-3">وضعیت فعلی</h2>
        <div v-if="current?.is_free_tier" class="flex items-center gap-3">
          <span class="text-2xl">🆓</span>
          <div>
            <p class="font-medium text-neutral-800">پلن رایگان</p>
            <p class="text-sm text-neutral-500">حداکثر ۵۰ رزرو در هفته</p>
          </div>
        </div>
        <div v-else class="flex items-center gap-3">
          <span class="text-2xl">👑</span>
          <div>
            <p class="font-medium text-neutral-800">پلن {{ current?.plan_name }}</p>
            <p class="text-sm text-neutral-500">
              محدودیت هفتگی: {{ current?.weekly_appointment_limit ?? 'نامحدود' }} —
              انقضا: {{ current?.plan_expires_at?.slice(0, 10) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Plans grid -->
      <h2 class="font-semibold text-neutral-700 mb-4">ارتقای پلن</h2>
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div v-for="plan in plans" :key="plan.id"
          class="bg-white rounded-2xl border p-6 flex flex-col"
          :class="current?.active_plan_id === plan.id ? 'border-primary ring-2 ring-primary/20' : 'border-neutral-100'">
          <h3 class="font-bold text-lg text-neutral-800">{{ plan.name }}</h3>
          <p class="text-2xl font-bold text-primary mt-2">{{ formatPrice(plan.price) }}</p>
          <p class="text-xs text-neutral-400 mb-4">هر {{ plan.duration_days }} روز</p>
          <ul class="text-sm text-neutral-600 space-y-2 flex-1 mb-4">
            <li v-for="f in plan.features" :key="f" class="flex items-start gap-2">
              <span class="text-green-500">✓</span> {{ f }}
            </li>
          </ul>
          <button @click="choosePlan(plan)"
            :disabled="current?.active_plan_id === plan.id"
            class="w-full py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 transition disabled:opacity-40 disabled:cursor-not-allowed">
            {{ current?.active_plan_id === plan.id ? 'پلن فعلی شما' : 'انتخاب این پلن' }}
          </button>
        </div>
      </div>

      <!-- Payment inline form -->
      <div v-if="selectedPlan" class="bg-white rounded-2xl border border-primary/30 shadow-sm p-6 mb-8">
        <h2 class="font-semibold text-neutral-800 mb-1">پرداخت کارت به کارت — پلن {{ selectedPlan.name }}</h2>
        <p class="text-sm text-neutral-500 mb-4">مبلغ {{ formatPrice(selectedPlan.price) }} را به شماره کارت زیر واریز کنید و تصویر فیش را آپلود نمایید.</p>

        <div class="bg-neutral-50 rounded-xl p-4 mb-4 text-center">
          <p class="text-lg font-bold text-neutral-800 tracking-wider">{{ CARD_NUMBER }}</p>
          <p class="text-sm text-neutral-500 mt-1">به نام {{ CARD_HOLDER }}</p>
        </div>

        <div class="space-y-4">
          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700">کد پیگیری تراکنش (اختیاری)</label>
            <input v-model="form.transfer_reference" type="text" placeholder="مثلاً 123456789"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700">تصویر فیش واریزی <span class="text-red-500">*</span></label>
            <label class="flex items-center justify-center h-32 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-primary/40 transition overflow-hidden">
              <img v-if="receiptPreview" :src="receiptPreview" class="h-full object-contain" />
              <span v-else class="text-sm text-neutral-400">برای انتخاب تصویر کلیک کنید</span>
              <input type="file" accept="image/*" class="hidden" @change="onReceiptChange" />
            </label>
          </div>

          <div v-if="submitSuccess" class="bg-green-50 text-green-700 text-sm rounded-xl p-3 text-center">
            ✅ درخواست شما ثبت شد و در انتظار بررسی ادمین است.
          </div>
          <p v-if="submitError" class="text-sm text-red-500 text-center">{{ submitError }}</p>

          <div class="flex gap-2">
            <button @click="selectedPlan = null" class="flex-1 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 transition">
              انصراف
            </button>
            <button @click="submitRequest" :disabled="submitting"
              class="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 transition disabled:opacity-50">
              {{ submitting ? 'در حال ارسال...' : 'ثبت درخواست' }}
            </button>
          </div>
        </div>
      </div>

      <!-- History -->
      <h2 class="font-semibold text-neutral-700 mb-4">تاریخچه درخواست‌ها</h2>
      <div class="space-y-3">
        <div v-for="req in history" :key="req.id" class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
          <div class="flex items-start justify-between flex-wrap gap-2">
            <div>
              <p class="font-medium text-neutral-800">پلن {{ req.plan_name }} — {{ formatPrice(req.amount) }}</p>
              <p class="text-xs text-neutral-400 mt-1">{{ req.created_at?.slice(0, 10) }}</p>
            </div>
            <span :class="['px-3 py-1 rounded-full text-xs font-medium', statusColor(req.status)]">{{ statusLabel(req.status) }}</span>
          </div>
          <p v-if="req.admin_message" class="text-sm text-neutral-600 mt-3 bg-neutral-50 rounded-lg p-3">
            💬 {{ req.admin_message }}
          </p>
          <a :href="resolveImageUrl(req.receipt_image_key)" target="_blank" rel="noopener"
            class="text-xs text-primary hover:underline mt-2 inline-block">مشاهده فیش ارسالی</a>
        </div>
        <div v-if="history.length === 0" class="text-center text-neutral-400 py-8">هنوز درخواستی ثبت نکرده‌اید</div>
      </div>
    </template>
  </div>
</template>
