<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { useRouter } from 'vue-router';
import PublicNavbar from '@/components/PublicNavbar.vue';
import PublicFooter from '@/components/PublicFooter.vue';

const router = useRouter();
const categories = ref<Array<{ id: number; name: string; icon: string; slug: string }>>([]);
const loadingCategories = ref(true);

onMounted(async () => {
  try {
    categories.value = await api.get('/api/categories', undefined, 10 * 60 * 1000);
  } finally {
    loadingCategories.value = false;
  }
});

const features = [
  { icon: '⚡', title: 'رزرو در چند ثانیه', desc: 'بدون تماس تلفنی و انتظار، نوبت خود را در چند کلیک رزرو کنید.' },
  { icon: '🛡️', title: 'جلوگیری از تداخل نوبت', desc: 'موتور رزرو ما به‌صورت اتمیک تضمین می‌کند دو نفر یک بازه را نگیرند.' },
  { icon: '🗓️', title: 'تقویم شمسی', desc: 'تمام تاریخ‌ها به‌صورت کامل شمسی نمایش داده و مدیریت می‌شوند.' },
  { icon: '🔔', title: 'وضعیت لحظه‌ای نوبت', desc: 'در انتظار، تایید یا رد شدن نوبت را همان لحظه ببینید.' },
  { icon: '📊', title: 'داشبورد مدیریتی', desc: 'برای فروشگاه‌ها، آمار کامل رزروها و مشتریان در یک نگاه.' },
  { icon: '🔒', title: 'امنیت در اولویت', desc: 'رمزنگاری bcrypt، احراز هویت JWT و محافظت در برابر حملات رایج.' },
];

const testimonials = [
  { name: 'سارا محمدی', role: 'مدیر آرایشگاه بانو', avatar: '👩🏻', text: 'از وقتی نوبت‌یاب رو فعال کردیم، تماس‌های مکرر برای گرفتن نوبت به صفر رسید. مشتری‌ها خودشون رزرو می‌کنن.', rating: 5 },
  { name: 'علی رضایی', role: 'مشتری', avatar: '👨🏻', text: 'خیلی راحت توانستم نوبت دندانپزشکی بگیرم، بدون اینکه با کسی تماس بگیرم. فقط چند ثانیه طول کشید.', rating: 5 },
  { name: 'مریم احمدی', role: 'صاحب کلینیک پوست', avatar: '👩🏻‍⚕️', text: 'مدیریت تقویم هفتگی و رد یا تایید نوبت‌ها خیلی ساده شده. حتی نسخه رایگان هم برای شروع کافی بود.', rating: 4 },
];

const stats = [
  { value: '۵۰+', label: 'فروشگاه فعال' },
  { value: '۱۰,۰۰۰+', label: 'نوبت رزرو شده' },
  { value: '۹۸٪', label: 'رضایت مشتریان' },
  { value: '۲۴/۷', label: 'دسترسی آنلاین' },
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <PublicNavbar />

    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
        <span class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
          ✨ رزرو آنلاین نسل جدید
        </span>
        <h1 class="text-4xl md:text-6xl font-bold mb-5 leading-tight">
          نوبت‌گیری آنلاین<br class="md:hidden" /> بدون دردسر
        </h1>
        <p class="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          هر کسب‌وکاری در چند دقیقه صفحه اختصاصی خود را راه‌اندازی می‌کند و مشتریان بدون تماس تلفنی، نوبت رزرو می‌کنند.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button @click="router.push('/shops')"
            class="px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition shadow-lg">
            🔍 جستجوی فروشگاه‌ها
          </button>
          <button @click="router.push('/register/shop')"
            class="px-8 py-3.5 bg-primary-500/80 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-primary-500 transition border border-white/30">
            🏪 ثبت فروشگاه رایگان
          </button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
      <div class="bg-white rounded-2xl border border-neutral-100 shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-primary">{{ s.value }}</div>
          <div class="text-xs md:text-sm text-neutral-500 mt-1">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-4 py-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-neutral-800 mb-3">چرا نوبت‌یاب؟</h2>
        <p class="text-neutral-500">امکاناتی که تجربه رزرو نوبت را برای همه ساده‌تر می‌کند</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <div v-for="f in features" :key="f.title"
          class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 hover:shadow-md hover:border-primary/20 transition group">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition">
            {{ f.icon }}
          </div>
          <h3 class="font-semibold text-neutral-800 mb-2">{{ f.title }}</h3>
          <p class="text-sm text-neutral-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto px-4 pb-20">
      <h2 class="text-2xl font-bold text-neutral-800 mb-6 text-center">دسته‌بندی‌های خدمات</h2>
      <div v-if="loadingCategories" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="h-24 shimmer rounded-2xl"></div>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button v-for="cat in categories" :key="cat.id"
          @click="router.push({ path: '/shops', query: { category: cat.slug } })"
          class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 text-center hover:border-primary/40 hover:shadow-md transition">
          <div class="text-3xl mb-2">{{ cat.icon }}</div>
          <span class="text-sm font-medium text-neutral-700">{{ cat.name }}</span>
        </button>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-neutral-50 py-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-800 mb-3">نظرات کاربران</h2>
          <p class="text-neutral-500">تجربه واقعی فروشگاه‌ها و مشتریانی که از نوبت‌یاب استفاده می‌کنند</p>
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          <div v-for="t in testimonials" :key="t.name"
            class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
            <div class="flex items-center gap-1 mb-3 text-amber-400">
              <span v-for="i in t.rating" :key="i">⭐</span>
            </div>
            <p class="text-sm text-neutral-600 leading-relaxed mb-5">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">{{ t.avatar }}</div>
              <div>
                <p class="text-sm font-semibold text-neutral-800">{{ t.name }}</p>
                <p class="text-xs text-neutral-400">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Shop owner -->
    <section class="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">صاحب کسب‌وکار هستید؟</h2>
        <p class="text-neutral-300 mb-8">با نوبت‌یاب رایگان شروع کنید. تا ۵۰ رزرو در هفته، کاملاً رایگان — بدون کارت بانکی.</p>
        <button @click="router.push('/register/shop')"
          class="px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-600 transition shadow-lg">
          ثبت فروشگاه رایگان
        </button>
      </div>
    </section>

    <PublicFooter />
  </div>
</template>
