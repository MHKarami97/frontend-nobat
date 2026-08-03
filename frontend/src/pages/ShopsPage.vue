<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';
import SkeletonCard from '@/components/SkeletonCard.vue';
import { resolveImageUrl } from '@/utils/image';

const route = useRoute();
const router = useRouter();
const shops = ref<any[]>([]);
const categories = ref<any[]>([]);
const selectedCategory = ref(route.query.category as string ?? '');
const loading = ref(true);

async function fetchShops() {
  loading.value = true;
  try {
    const params: Record<string, string> = {};
    if (selectedCategory.value) params['category'] = selectedCategory.value;
    shops.value = await api.get('/api/shops', params);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  categories.value = await api.get('/api/categories');
  await fetchShops();
});

watch(selectedCategory, async (val) => {
  router.replace({ query: val ? { category: val } : {} });
  await fetchShops();
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">فروشگاه‌ها</h1>

    <!-- Filter -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
      <button @click="selectedCategory = ''"
        :class="['px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0',
          selectedCategory === '' ? 'bg-primary text-white' : 'bg-white border border-neutral-200 text-neutral-600']">
        همه
      </button>
      <button v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat.slug"
        :class="['px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0',
          selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-white border border-neutral-200 text-neutral-600']">
        {{ cat.icon }} {{ cat.name }}
      </button>
    </div>

    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-if="loading">
        <SkeletonCard :count="6" />
      </template>
      <router-link v-else v-for="shop in shops" :key="shop.id" :to="`/shops/${shop.slug}`"
        class="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md transition group">
        <div class="h-36 bg-neutral-100 overflow-hidden">
          <img :src="resolveImageUrl(shop.logo_key)" :alt="shop.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-neutral-800">{{ shop.name }}</h3>
          <p class="text-xs text-neutral-500 mt-1">{{ shop.category_name }}</p>
          <p v-if="shop.address" class="text-xs text-neutral-400 mt-1 truncate">📍 {{ shop.address }}</p>
        </div>
      </router-link>
      <div v-if="!loading && shops.length === 0" class="col-span-3 text-center text-neutral-400 py-16">
        هیچ فروشگاهی یافت نشد
      </div>
    </div>
  </div>
</template>
