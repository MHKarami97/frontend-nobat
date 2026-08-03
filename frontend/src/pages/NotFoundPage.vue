<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <PublicNavbar />
    <div class="flex-1 flex items-center justify-center text-center px-4">
      <div>
        <div class="text-8xl mb-4">🔍</div>
        <h1 class="text-4xl font-bold text-neutral-800 mb-2">۴۰۴</h1>
        <p class="text-neutral-500 mb-6">صفحه مورد نظر یافت نشد</p>
        <router-link to="/" class="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition">
          بازگشت به خانه
        </router-link>
      </div>
    </div>
  </div>
</template>
