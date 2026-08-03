<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import StatusBadge from '@/components/StatusBadge.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';

const shops = ref<any[]>([]);
const loading = ref(true);
const filter = ref('');
const actionId = ref<number | null>(null);

onMounted(async () => {
  await load();
});

async function load() {
  loading.value = true;
  shops.value = await api.get('/api/admin/shops', filter.value ? { status: filter.value } : undefined, 0);
  loading.value = false;
}

async function setStatus(id: number, status: string) {
  actionId.value = id;
  await api.patch(`/api/admin/shops/${id}/status`, { status });
  api.clearCache('/api/admin');
  await load();
  actionId.value = null;
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h1 class="text-2xl font-bold text-neutral-800">مدیریت فروشگاه‌ها</h1>
      <div class="flex gap-2">
        <button v-for="s in ['', 'pending', 'approved', 'banned']" :key="s"
          @click="filter = s; load()"
          :class="['px-3 py-1.5 rounded-full text-xs font-medium transition',
            filter === s ? 'bg-primary text-white' : 'bg-white border border-neutral-200 text-neutral-600']">
          {{ { '': 'همه', pending: 'در انتظار', approved: 'تایید', banned: 'مسدود' }[s] }}
        </button>
      </div>
    </div>

    <SkeletonCard v-if="loading" :count="5" />

    <div v-else class="space-y-3">
      <div v-for="shop in shops" :key="shop.id"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
        <div class="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p class="font-semibold text-neutral-800">{{ shop.name }}</p>
            <p class="text-xs text-neutral-500">مالک: {{ shop.owner_name }} – {{ shop.email }}</p>
            <p class="text-xs text-neutral-400 mt-1">{{ shop.created_at?.slice(0,10) }}</p>
          </div>
          <StatusBadge :status="shop.status" />
        </div>
        <div class="flex gap-2 mt-3 flex-wrap">
          <button v-if="shop.status !== 'approved'" @click="setStatus(shop.id, 'approved')" :disabled="actionId === shop.id"
            class="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50">✅ تایید</button>
          <button v-if="shop.status !== 'banned'" @click="setStatus(shop.id, 'banned')" :disabled="actionId === shop.id"
            class="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50">🚫 مسدود</button>
          <button v-if="shop.status === 'banned'" @click="setStatus(shop.id, 'pending')" :disabled="actionId === shop.id"
            class="px-3 py-1.5 text-xs bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition disabled:opacity-50">رفع مسدودیت</button>
        </div>
      </div>
      <div v-if="shops.length === 0" class="text-center text-neutral-400 py-12">هیچ موردی یافت نشد</div>
    </div>
  </div>
</template>
