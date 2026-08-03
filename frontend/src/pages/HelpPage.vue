<script setup lang="ts">
const faqs = [
  { q: 'چطور نوبت رزرو کنم؟', a: 'پس از ثبت‌نام، وارد صفحه فروشگاه شوید، تاریخ و ساعت دلخواه را انتخاب کنید و دکمه رزرو را بزنید.' },
  { q: 'آیا می‌توانم نوبتم را لغو کنم؟', a: 'بله. از پنل مشتری، بخش «نوبت‌های من»، می‌توانید نوبت‌های آینده را لغو کنید.' },
  { q: 'پلن رایگان چه محدودیتی دارد؟', a: 'در پلن رایگان، هر فروشگاه می‌تواند تا ۵۰ رزرو فعال در هفته داشته باشد. برای بیشتر، اشتراک Pro را تهیه کنید.' },
  { q: 'چطور فروشگاهم را ثبت کنم؟', a: 'روی «ثبت فروشگاه» کلیک کنید، اطلاعات حساب و فروشگاه را وارد کنید. پس از تایید مدیر، فروشگاه شما فعال می‌شود.' },
  { q: 'تقویم شمسی پشتیبانی می‌شود؟', a: 'بله. تمام تاریخ‌ها در رابط کاربری به صورت شمسی نمایش داده می‌شوند.' },
];
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-neutral-800 mb-8">راهنما و سوالات متداول</h1>
    <div class="space-y-3">
      <details v-for="faq in faqs" :key="faq.q"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 cursor-pointer group">
        <summary class="font-medium text-neutral-800 list-none flex items-center justify-between">
          {{ faq.q }}
          <span class="text-neutral-400 group-open:rotate-180 transition">▼</span>
        </summary>
        <p class="text-sm text-neutral-600 mt-3 leading-relaxed">{{ faq.a }}</p>
      </details>
    </div>
  </div>
</template>
