<script setup lang="ts">
defineProps<{ count?: number }>();
</script>

<template>
  <div v-for="i in (count ?? 3)" :key="i" class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-3">
    <div class="h-5 shimmer rounded-lg w-3/4"></div>
    <div class="h-4 shimmer rounded-lg w-1/2"></div>
    <div class="h-4 shimmer rounded-lg w-full"></div>
    <div class="h-4 shimmer rounded-lg w-2/3"></div>
  </div>
</template>
