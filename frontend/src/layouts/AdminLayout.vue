<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import BottomNav from '@/components/BottomNav.vue';

const auth = useAuthStore();
const router = useRouter();
const navItems = [
  { label: 'داشبورد', icon: '📊', to: '/admin/dashboard' },
  { label: 'فروشگاه‌ها', icon: '🏪', to: '/admin/shops' },
  { label: 'کاربران', icon: '👥', to: '/admin/users' },
  { label: 'اشتراک‌ها', icon: '👑', to: '/admin/subscriptions' },
];
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex">
    <!-- Sidebar desktop -->
    <aside class="hidden md:flex flex-col w-64 bg-white border-l border-neutral-100 shadow-sm p-6 gap-2">
      <div class="text-xl font-bold text-primary mb-6">⚡ مدیریت سیستم</div>
      <router-link v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition"
        :class="$route.path.startsWith(item.to) ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-600 hover:bg-neutral-50'">
        <span>{{ item.icon }}</span> {{ item.label }}
      </router-link>
      <button @click="auth.logout(); router.push('/admin/login')"
        class="mt-auto flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition">
        🚪 خروج
      </button>
    </aside>

    <main class="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-auto">
      <router-view />
    </main>
    <BottomNav :items="navItems" />
  </div>
</template>
