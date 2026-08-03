<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const auth = useAuthStore();
const mobileOpen = ref(false);

const navLinks = [
  { label: 'خانه', to: '/' },
  { label: 'فروشگاه‌ها', to: '/shops' },
  { label: 'درباره ما', to: '/about' },
  { label: 'راهنما', to: '/help' },
  { label: 'تماس با ما', to: '/contact' },
];

function goToPanel() {
  if (auth.isAdmin) router.push('/admin/dashboard');
  else if (auth.isShopOwner) router.push('/shop-panel/dashboard');
  else router.push('/panel/appointments');
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
    <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="text-lg font-bold text-primary flex items-center gap-1.5">
        <span class="text-xl">📅</span> دور‌گردون
      </router-link>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-6">
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
          class="text-sm font-medium text-neutral-600 hover:text-primary transition">
          {{ link.label }}
        </router-link>
      </div>

      <!-- Desktop actions -->
      <div class="hidden md:flex items-center gap-3">
        <template v-if="auth.isLoggedIn">
          <button @click="goToPanel"
            class="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary-600 transition">
            پنل کاربری
          </button>
        </template>
        <template v-else>
          <router-link to="/login"
            class="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary transition">
            ورود
          </router-link>
          <router-link to="/register"
            class="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary-600 transition shadow-sm">
            ثبت‌نام کاربر
          </router-link>
          <router-link to="/register/shop"
            class="px-5 py-2 text-sm font-semibold border border-primary text-primary rounded-full hover:bg-primary/5 transition">
            ثبت فروشگاه
          </router-link>
        </template>
      </div>

      <!-- Mobile toggle -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-neutral-700">
        <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-1">
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to" @click="mobileOpen = false"
          class="block px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition">
          {{ link.label }}
        </router-link>
        <div class="pt-3 border-t border-neutral-100 mt-2 space-y-2">
          <template v-if="auth.isLoggedIn">
            <button @click="goToPanel(); mobileOpen = false"
              class="w-full py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-600 transition">
              پنل کاربری
            </button>
          </template>
          <template v-else>
            <router-link to="/login" @click="mobileOpen = false"
              class="block w-full text-center py-2.5 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition">
              ورود
            </router-link>
            <router-link to="/register" @click="mobileOpen = false"
              class="block w-full text-center py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-600 transition">
              ثبت‌نام مشتری
            </router-link>
            <router-link to="/register/shop" @click="mobileOpen = false"
              class="block w-full text-center py-2.5 text-sm font-semibold border border-primary text-primary rounded-xl hover:bg-primary/5 transition">
              ثبت فروشگاه
            </router-link>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
