<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { api } from '@/services/api';
import BaseInput from '@/components/BaseInput.vue';

const router = useRouter();
const auth = useAuthStore();
const categories = ref<Array<{ id: number; name: string }>>([]);
const error = ref('');
const loading = ref(false);

const form = reactive({
  full_name: '', email: '', mobile: '', password: '',
  shop_name: '', slug: '', address: '', description: '',
  category_id: 0, slot_duration_minutes: 30,
});

onMounted(async () => {
  categories.value = await api.get('/api/categories');
});

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    await auth.register({ full_name: form.full_name, email: form.email, mobile: form.mobile, password: form.password, role: 'shop_owner' });
    await api.post('/api/shops', {
      name: form.shop_name, slug: form.slug, address: form.address,
      description: form.description, category_id: Number(form.category_id),
      slot_duration_minutes: Number(form.slot_duration_minutes),
    });
    router.push('/shop-panel/dashboard');
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'خطا در ثبت‌نام';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
      <h1 class="text-2xl font-bold text-neutral-800 text-center mb-2">ثبت فروشگاه</h1>
      <p class="text-sm text-center text-neutral-500 mb-8">تا ۵۰ رزرو در هفته رایگان</p>
      <form @submit.prevent="submit" class="space-y-4">
        <p class="text-xs font-semibold text-neutral-400 uppercase tracking-widest">اطلاعات حساب</p>
        <BaseInput v-model="form.full_name" label="نام و نام‌خانوادگی" required :disabled="loading" />
        <BaseInput v-model="form.email" label="ایمیل" type="email" required :disabled="loading" />
        <BaseInput v-model="form.mobile" label="موبایل" type="tel" required :disabled="loading" />
        <BaseInput v-model="form.password" label="رمز عبور" type="password" required :disabled="loading" />

        <p class="text-xs font-semibold text-neutral-400 uppercase tracking-widest pt-2">اطلاعات فروشگاه</p>
        <BaseInput v-model="form.shop_name" label="نام فروشگاه" required :disabled="loading" />
        <BaseInput v-model="form.slug" label="شناسه URL (فقط a-z 0-9 و -)" placeholder="my-shop" required :disabled="loading" />

        <div class="space-y-1">
          <label class="block text-sm font-medium text-neutral-700">دسته‌بندی <span class="text-red-500">*</span></label>
          <select v-model="form.category_id" required :disabled="loading"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            <option value="0" disabled>انتخاب کنید</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <BaseInput v-model="form.address" label="آدرس" :disabled="loading" />

        <div class="space-y-1">
          <label class="block text-sm font-medium text-neutral-700">مدت هر نوبت (دقیقه)</label>
          <select v-model="form.slot_duration_minutes" :disabled="loading"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            <option :value="15">۱۵ دقیقه</option>
            <option :value="30">۳۰ دقیقه</option>
            <option :value="45">۴۵ دقیقه</option>
            <option :value="60">۶۰ دقیقه</option>
          </select>
        </div>

        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>
        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50">
          {{ loading ? 'در حال ثبت...' : 'ثبت فروشگاه' }}
        </button>
      </form>
    </div>
  </div>
</template>
