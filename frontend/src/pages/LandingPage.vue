<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref<Array<{ id: number; name: string; icon: string; slug: string }>>([]);

onMounted(async () => {
  categories.value = await api.get('/api/categories');
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <header class="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div class="relative max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">نوبت‌یاب</h1>
        <p class="text-xl text-primary-100 mb-8">رزرو آنلاین نوبت از هر کجا، در هر زمان</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button @click="router.push('/shops')"
            class="px-8 py-3 bg-white text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition shadow-lg">
            جستجوی فروشگاه‌ها
          </button>
          <button @click="router.push('/register')"
            class="px-8 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-400 transition border border-white/30">
            ثبت‌نام رایگان
          </button>
        </div>
      </div>
    </header>

    <!-- Features -->
    <section class="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
      <div v-for="f in [
        { icon: '📱', title: 'رزرو آسان', desc: 'در چند ثانیه نوبت بگیرید، بدون تماس تلفنی' },
        { icon: '⏰', title: 'مدیریت هوشمند', desc: 'تقویم هفتگی خودکار با جلوگیری از تداخل نوبت' },
        { icon: '🔔', title: 'یادآوری خودکار', desc: 'هرگز نوبت‌تان را فراموش نکنید' }
      ]" :key="f.title"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 text-center hover:shadow-md transition">
        <div class="text-4xl mb-3">{{ f.icon }}</div>
        <h3 class="font-semibold text-neutral-800 mb-2">{{ f.title }}</h3>
        <p class="text-sm text-neutral-500">{{ f.desc }}</p>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-5xl mx-auto px-4 pb-16">
      <h2 class="text-2xl font-bold text-neutral-800 mb-6 text-center">دسته‌بندی‌های خدمات</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <button v-for="cat in categories" :key="cat.id"
          @click="router.push({ path: '/shops', query: { category: cat.slug } })"
          class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 text-center hover:border-primary/40 hover:shadow-md transition">
          <div class="text-3xl mb-2">{{ cat.icon }}</div>
          <span class="text-sm font-medium text-neutral-700">{{ cat.name }}</span>
        </button>
      </div>
    </section>

    <!-- CTA Shop owner -->
    <section class="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white py-16">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">صاحب کسب‌وکار هستید؟</h2>
        <p class="text-neutral-300 mb-8">با نوبت‌یاب رایگان شروع کنید. تا ۵۰ رزرو در هفته، کاملاً رایگان.</p>
        <button @click="router.push('/register/shop')"
          class="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-600 transition">
          ثبت فروشگاه رایگان
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-neutral-100 py-8 text-center text-sm text-neutral-400">
      <div class="flex justify-center gap-6 mb-3">
        <router-link to="/about" class="hover:text-primary transition">درباره ما</router-link>
        <router-link to="/contact" class="hover:text-primary transition">تماس با ما</router-link>
        <router-link to="/help" class="hover:text-primary transition">راهنما</router-link>
      </div>
      <p>© ۱۴۰۴ نوبت‌یاب. تمام حقوق محفوظ است.</p>
    </footer>
  </div>
</template>
