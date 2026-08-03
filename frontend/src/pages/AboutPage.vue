<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue';
import PublicFooter from '@/components/PublicFooter.vue';
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <PublicNavbar />
    <div class="max-w-3xl mx-auto px-4 py-12 flex-1 w-full">
      <h1 class="text-3xl font-bold text-neutral-800 mb-6">درباره نوبت‌یاب</h1>
      <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 space-y-4 text-neutral-600 leading-relaxed">
        <p>نوبت‌یاب یک پلتفرم SaaS چندمستاجره برای رزرو نوبت آنلاین است. هدف ما ساده‌سازی فرآیند رزرو برای کسب‌وکارها و مشتریان است.</p>
        <p>با نوبت‌یاب، هر کسب‌وکاری می‌تواند در چند دقیقه صفحه اختصاصی خود را راه‌اندازی کند و مشتریان بدون تماس تلفنی نوبت رزرو کنند.</p>
        <h2 class="text-xl font-semibold text-neutral-800 mt-6">مزایا</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>رزرو ۲۴/۷ بدون نیاز به پرسنل</li>
          <li>جلوگیری خودکار از تداخل نوبت‌ها</li>
          <li>تقویم هفتگی قابل تنظیم</li>
          <li>پشتیبانی از تقویم شمسی</li>
          <li>تا ۵۰ رزرو در هفته کاملاً رایگان</li>
        </ul>
      </div>
    </div>
    <PublicFooter />
  </div>
</template>
