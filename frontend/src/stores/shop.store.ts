import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/api';

export const useShopStore = defineStore('shop', () => {
  const myShop = ref<Record<string, unknown> | null>(null);
  const loading = ref(false);

  async function fetchMyShop() {
    loading.value = true;
    try {
      myShop.value = await api.get('/api/shops/my/info', undefined, 5 * 60 * 1000);
    } finally {
      loading.value = false;
    }
  }

  function clearShop() { myShop.value = null; }

  return { myShop, loading, fetchMyShop, clearShop };
});
