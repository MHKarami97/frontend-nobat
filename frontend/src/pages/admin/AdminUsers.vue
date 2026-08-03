<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import SkeletonCard from '@/components/SkeletonCard.vue';

const users = ref<any[]>([]);
const loading = ref(true);
const actionId = ref<number | null>(null);

onMounted(async () => {
  users.value = await api.get('/api/admin/users', undefined, 0);
  loading.value = false;
});

async function toggle(id: number) {
  actionId.value = id;
  await api.patch(`/api/admin/users/${id}/toggle`, {});
  api.clearCache('/api/admin/users');
  users.value = await api.get('/api/admin/users', undefined, 0);
  actionId.value = null;
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">مدیریت کاربران</h1>

    <SkeletonCard v-if="loading" :count="5" />

    <div v-else class="space-y-3">
      <div v-for="user in users" :key="user.id"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p class="font-medium text-neutral-800">{{ user.full_name }}</p>
          <p class="text-sm text-neutral-500">{{ user.email }}</p>
          <p class="text-xs text-neutral-400">{{ user.mobile }}</p>
        </div>
        <button @click="toggle(user.id)" :disabled="actionId === user.id"
          :class="['px-3 py-1.5 text-xs rounded-lg transition disabled:opacity-50 font-medium',
            user.is_active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100']">
          {{ user.is_active ? 'غیرفعال کردن' : 'فعال کردن' }}
        </button>
      </div>
      <div v-if="users.length === 0" class="text-center text-neutral-400 py-12">کاربری یافت نشد</div>
    </div>
  </div>
</template>
