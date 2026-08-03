<script setup lang="ts"></script>

<template>
  <footer class="bg-neutral-900 text-neutral-300 pt-12 pb-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-1.5 text-white font-bold text-lg mb-3">
            <span>📅</span> نوبت‌یاب
          </div>
          <p class="text-sm text-neutral-400 leading-relaxed">
            پلتفرم رزرو نوبت آنلاین برای کسب‌وکارها و مشتریان، ساده، سریع و امن.
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">لینک‌های سریع</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/shops" class="hover:text-primary transition">جستجوی فروشگاه‌ها</router-link></li>
            <li><router-link to="/about" class="hover:text-primary transition">درباره ما</router-link></li>
            <li><router-link to="/help" class="hover:text-primary transition">راهنما</router-link></li>
            <li><router-link to="/contact" class="hover:text-primary transition">تماس با ما</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">برای کسب‌وکارها</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/register/shop" class="hover:text-primary transition">ثبت فروشگاه رایگان</router-link></li>
            <li><router-link to="/login" class="hover:text-primary transition">ورود فروشگاه</router-link></li>
            <li><router-link to="/admin/login" class="hover:text-primary transition">ورود مدیران سیستم</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3 text-sm">ارتباط با ما</h4>
          <ul class="space-y-2 text-sm text-neutral-400">
            <li>📧 support@nobat-yab.ir</li>
            <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
        © ۱۴۰۴ نوبت‌یاب. تمام حقوق محفوظ است.
      </div>
    </div>
  </footer>
</template>
