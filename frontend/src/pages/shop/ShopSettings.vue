<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { api } from '@/services/api';
import { useShopStore } from '@/stores/shop.store';
import BaseInput from '@/components/BaseInput.vue';
import { resolveImageUrl } from '@/utils/image';
import { compressImage, formatFileSize } from '@/utils/imageCompress';

const shopStore = useShopStore();
const saving = ref(false);
const uploadingLogo = ref(false);
const logoError = ref('');
const MAX_RAW_SIZE_BYTES = 8 * 1024 * 1024; // 8MB pre-compression cap
const success = ref(false);
const error = ref('');

const form = reactive({ name: '', address: '', description: '', slot_duration_minutes: 30 });

onMounted(async () => {
  await shopStore.fetchMyShop();
  if (shopStore.myShop) {
    form.name = shopStore.myShop.name as string;
    form.address = shopStore.myShop.address as string ?? '';
    form.description = shopStore.myShop.description as string ?? '';
    form.slot_duration_minutes = shopStore.myShop.slot_duration_minutes as number;
  }
});

async function save() {
  saving.value = true;
  success.value = false;
  error.value = '';
  try {
    await api.patch('/api/shops/my', form);
    api.clearCache('/api/shops');
    shopStore.clearShop();
    await shopStore.fetchMyShop();
    success.value = true;
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'خطا';
  } finally {
    saving.value = false;
  }
}

async function uploadLogo(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.[0]) return;
  const rawFile = input.files[0];

  logoError.value = '';

  if (rawFile.size > MAX_RAW_SIZE_BYTES) {
    logoError.value = `حجم فایل باید کمتر از ${formatFileSize(MAX_RAW_SIZE_BYTES)} باشد`;
    input.value = '';
    return;
  }

  uploadingLogo.value = true;
  try {
    const compressed = await compressImage(rawFile, { maxWidth: 512, maxHeight: 512, quality: 0.8 });

    const fd = new FormData();
    fd.append('file', compressed);

    await api.upload('/api/upload/logo', fd);
    api.clearCache('/api/shops');
    shopStore.clearShop();
    await shopStore.fetchMyShop();
  } catch (e: any) {
    logoError.value = e?.response?.data?.error ?? e?.message ?? 'خطا در آپلود لوگو';
  } finally {
    uploadingLogo.value = false;
    input.value = '';
  }
}
</script>

<template>
  <div class="max-w-lg">
    <h1 class="text-2xl font-bold text-neutral-800 mb-6">تنظیمات فروشگاه</h1>

    <!-- Logo -->
    <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 mb-6">
      <h2 class="font-semibold text-neutral-700 mb-4">لوگو فروشگاه</h2>
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100">
          <img v-if="shopStore.myShop?.logo_key" :src="resolveImageUrl(shopStore.myShop.logo_key as string)" class="w-full h-full object-cover" />
        </div>
        <label class="cursor-pointer px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-xl transition font-medium text-neutral-700">
          {{ uploadingLogo ? 'در حال فشرده‌سازی و آپلود...' : 'تغییر لوگو' }}
          <input type="file" accept="image/*" class="hidden" @change="uploadLogo" :disabled="uploadingLogo" />
        </label>
      </div>
      <p v-if="logoError" class="text-sm text-red-500 mt-3">{{ logoError }}</p>
      <p class="text-xs text-neutral-400 mt-3">تصاویر قبل از آپلود به‌صورت خودکار فشرده می‌شوند (حداکثر ۵۱۲×۵۱۲ پیکسل).</p>
    </div>

    <form @submit.prevent="save" class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 space-y-4">
      <BaseInput v-model="form.name" label="نام فروشگاه" required :disabled="saving" />
      <BaseInput v-model="form.address" label="آدرس" :disabled="saving" />

      <div class="space-y-1">
        <label class="block text-sm font-medium text-neutral-700">توضیحات</label>
        <textarea v-model="form.description" rows="3"
          class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"></textarea>
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-neutral-700">مدت هر نوبت (دقیقه)</label>
        <select v-model="form.slot_duration_minutes" :disabled="saving"
          class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
          <option :value="15">۱۵</option>
          <option :value="30">۳۰</option>
          <option :value="45">۴۵</option>
          <option :value="60">۶۰</option>
        </select>
      </div>

      <div v-if="success" class="text-sm text-green-600 text-center">✅ تغییرات ذخیره شد</div>
      <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

      <button type="submit" :disabled="saving"
        class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50">
        {{ saving ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
      </button>
    </form>
  </div>
</template>