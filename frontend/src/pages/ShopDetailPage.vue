<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { resolveImageUrl } from '@/utils/image';
import { toJalali, fromJalali, todayJalali } from '@/utils/date';
import { dayMap } from '@/utils/mapper';
import PublicNavbar from '@/components/PublicNavbar.vue';
import PublicFooter from '@/components/PublicFooter.vue';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const shop = ref<any>(null);
const slots = ref<any[]>([]);
const selectedJalali = ref(todayJalali());
const selectedSlot = ref<any>(null);
const loading = ref(true);
const slotsLoading = ref(false);
const booking = ref(false);
const bookingError = ref('');
const bookingSuccess = ref(false);

onMounted(async () => {
  shop.value = await api.get(`/api/shops/${route.params.slug}`);
  loading.value = false;
  await loadSlots();
});

async function loadSlots() {
  if (!shop.value) return;
  slotsLoading.value = true;
  selectedSlot.value = null;
  const greg = fromJalali(selectedJalali.value);
  slots.value = (await api.get<{ slots: any[] }>('/api/slots', { shop_id: shop.value.id, date: greg }, 1 * 60 * 1000)).slots;
  slotsLoading.value = false;
}

async function book() {
  if (!auth.isLoggedIn) { router.push('/login'); return; }
  if (!selectedSlot.value) return;
  booking.value = true;
  bookingError.value = '';
  try {
    await api.post('/api/appointments', {
      shop_id: shop.value.id,
      appointment_date: fromJalali(selectedJalali.value),
      start_time: selectedSlot.value.start,
      end_time: selectedSlot.value.end,
    });
    api.clearCache('/api/appointments');
    api.clearCache('/api/slots');
    bookingSuccess.value = true;
    await loadSlots();
  } catch (e: any) {
    bookingError.value = e?.response?.data?.error ?? 'خطا در رزرو';
  } finally {
    booking.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <PublicNavbar />

    <div class="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
      <!-- Skeleton -->
      <template v-if="loading">
        <div class="h-48 shimmer rounded-2xl mb-4"></div>
        <div class="h-8 shimmer rounded-lg w-1/2 mb-2"></div>
        <div class="h-4 shimmer rounded-lg w-3/4"></div>
      </template>

      <template v-else-if="shop">
        <!-- Shop header -->
        <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden mb-6">
          <div class="h-48 bg-neutral-100">
            <img :src="resolveImageUrl(shop.logo_key)" :alt="shop.name" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h1 class="text-2xl font-bold text-neutral-800">{{ shop.name }}</h1>
            <p class="text-sm text-primary mt-1">{{ shop.category_name }}</p>
            <p v-if="shop.address" class="text-sm text-neutral-500 mt-2">📍 {{ shop.address }}</p>
            <p v-if="shop.description" class="text-sm text-neutral-600 mt-3">{{ shop.description }}</p>
          </div>
        </div>

        <!-- Schedule -->
        <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 mb-6">
          <h2 class="font-semibold text-neutral-800 mb-4">ساعات کاری</h2>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="s in shop.schedules" :key="s.day_of_week"
              class="flex items-center justify-between text-sm p-2 rounded-lg" :class="s.is_closed ? 'bg-red-50 text-red-400' : 'bg-green-50 text-green-700'">
              <span>{{ dayMap[s.day_of_week] }}</span>
              <span>{{ s.is_closed ? 'تعطیل' : `${s.start_time} – ${s.end_time}` }}</span>
            </div>
          </div>
        </div>

        <!-- Booking -->
        <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
          <h2 class="font-semibold text-neutral-800 mb-4">رزرو نوبت</h2>

          <div class="space-y-1 mb-4">
            <label class="block text-sm font-medium text-neutral-700">تاریخ (شمسی)</label>
            <input v-model="selectedJalali" @change="loadSlots" type="text" placeholder="1403/01/01"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>

          <div v-if="slotsLoading" class="grid grid-cols-4 gap-2">
            <div v-for="i in 8" :key="i" class="h-10 shimmer rounded-lg"></div>
          </div>
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
            <button v-for="slot in slots" :key="slot.start" :disabled="!slot.available"
              @click="slot.available && (selectedSlot = slot)"
              :class="['py-2 text-sm rounded-xl border transition font-medium',
                !slot.available ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed border-neutral-100' :
                selectedSlot?.start === slot.start ? 'bg-primary text-white border-primary' :
                'bg-white text-neutral-700 border-neutral-200 hover:border-primary']">
              {{ slot.start }}
            </button>
            <p v-if="slots.length === 0" class="col-span-4 text-center text-neutral-400 text-sm py-4">در این روز نوبتی موجود نیست</p>
          </div>

          <div v-if="bookingSuccess" class="bg-green-50 text-green-700 text-sm rounded-xl p-3 mb-3 text-center">
            ✅ نوبت با موفقیت رزرو شد!
          </div>
          <p v-if="bookingError" class="text-sm text-red-500 text-center mb-3">{{ bookingError }}</p>

          <button @click="book" :disabled="!selectedSlot || booking"
            class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-40">
            {{ booking ? 'در حال رزرو...' : selectedSlot ? `رزرو ${selectedSlot.start}` : 'یک نوبت انتخاب کنید' }}
          </button>
        </div>
      </template>
    </div>

    <PublicFooter />
  </div>
</template>
