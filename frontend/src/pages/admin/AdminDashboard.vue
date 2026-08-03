<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';

const stats = ref<{ users: number; shops: number; appointments: number; pendingShops: number } | null>(null);
const loading = ref(true);

onMounted(async () => {
  stats.value = await api.get('/api/admin/stats', undefined, 60 * 1000);
  loading.value = false;
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">داشبورد مدیریت</h1>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="h-28 shimmer rounded-2xl"></div>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="item in [
        { label: 'کاربران', value: stats?.users, icon: '👥', color: 'bg-blue-50 text-blue-700' },
        { label: 'فروشگاه‌ها', value: stats?.shops, icon: '🏪', color: 'bg-green-50 text-green-700' },
        { label: 'کل رزروها', value: stats?.appointments, icon: '📅', color: 'bg-purple-50 text-purple-700' },
        { label: 'در انتظار تایید', value: stats?.pendingShops, icon: '⏳', color: 'bg-yellow-50 text-yellow-700' },
      ]" :key="item.label"
        :class="['rounded-2xl p-5 border border-neutral-100 shadow-sm', item.color.split(' ')[0]]">
        <div class="text-3xl mb-2">{{ item.icon }}</div>
        <div class="text-3xl font-bold" :class="item.color.split(' ')[1]">{{ item.value }}</div>
        <div class="text-sm mt-1 text-neutral-500">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
