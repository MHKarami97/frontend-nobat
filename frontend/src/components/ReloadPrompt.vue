<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
</script>

<template>
  <Transition name="slide-up">
    <div v-if="needRefresh"
      class="fixed bottom-20 left-4 right-4 z-50 bg-primary-700 text-white rounded-2xl shadow-xl p-4 flex items-center justify-between">
      <span class="text-sm font-medium">نسخه جدید در دسترس است</span>
      <button
        @click="updateServiceWorker()"
        class="text-xs bg-white text-primary-700 px-3 py-1.5 rounded-full font-semibold hover:bg-primary-50 transition">
        به‌روزرسانی
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
