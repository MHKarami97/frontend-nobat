<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import BaseInput from '@/components/BaseInput.vue';

const router = useRouter();
const auth = useAuthStore();
const form = reactive({ full_name: '', email: '', mobile: '', password: '' });
const error = ref('');
const loading = ref(false);

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    await auth.register({ ...form, role: 'customer' });
    router.push('/panel');
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'خطا در ثبت‌نام';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
      <h1 class="text-2xl font-bold text-neutral-800 text-center mb-8">ثبت‌نام مشتری</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <BaseInput v-model="form.full_name" label="نام و نام‌خانوادگی" required :disabled="loading" />
        <BaseInput v-model="form.email" label="ایمیل" type="email" required :disabled="loading" />
        <BaseInput v-model="form.mobile" label="شماره موبایل" type="tel" placeholder="09..." required :disabled="loading" />
        <BaseInput v-model="form.password" label="رمز عبور (حداقل ۸ کاراکتر)" type="password" required :disabled="loading" />
        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>
        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50">
          {{ loading ? 'در حال ثبت‌نام...' : 'ایجاد حساب' }}
        </button>
      </form>
      <p class="text-sm text-center text-neutral-500 mt-6">
        حساب دارید؟ <router-link to="/login" class="text-primary font-medium hover:underline">وارد شوید</router-link>
      </p>
      <p class="text-sm text-center text-neutral-500 mt-2">
        صاحب کسب‌وکارید؟ <router-link to="/register/shop" class="text-primary font-medium hover:underline">فروشگاه ثبت کنید</router-link>
      </p>
    </div>
  </div>
</template>
