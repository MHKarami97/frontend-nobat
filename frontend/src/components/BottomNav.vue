<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

defineProps<{ items: Array<{ label: string; icon: string; to: string }> }>();

const router = useRouter();
const route = useRoute();
</script>

<template>
  <nav class="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-neutral-100 px-4 py-2">
    <div class="flex overflow-x-auto scrollbar-hide gap-1 justify-around">
      <button
        v-for="item in items"
        :key="item.to"
        @click="router.push(item.to)"
        :class="['flex flex-col items-center px-3 py-1.5 rounded-full text-xs transition whitespace-nowrap flex-shrink-0',
          route.path.startsWith(item.to) ? 'text-primary bg-primary/10 font-semibold' : 'text-neutral-500']"
      >
        <span class="text-lg mb-0.5">{{ item.icon }}</span>
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>
