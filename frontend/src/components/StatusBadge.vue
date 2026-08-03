<script setup lang="ts">
import { computed } from 'vue';
import { getStatusBadge } from '@/utils/mapper';

const props = defineProps<{ status: string }>();
const badge = computed(() => getStatusBadge(props.status));
</script>

<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', badge.classes]">
    {{ badge.label }}
  </span>
</template>
