<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import BottomNav from '@/components/BottomNav.vue';

const auth = useAuthStore();
const router = useRouter();
const navItems = [
  { label: 'نوبت‌های من', icon: '📅', to: '/panel/appointments' },
  { label: 'جستجوی فروشگاه', icon: '🔍', to: '/shops' },
];
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="text-lg font-bold text-primary">نوبت‌یاب</router-link>
      <div class="flex items-center gap-3">
        <span class="text-sm text-neutral-600 hidden sm:block">{{ auth.fullName }}</span>
        <button @click="auth.logout(); router.push('/')" class="text-sm text-red-500 hover:underline">خروج</button>
      </div>
    </header>
    <main class="max-w-3xl mx-auto p-4 pb-24">
      <router-view />
    </main>
    <BottomNav :items="navItems" />
  </div>
</template>
