<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import BaseInput from '@/components/BaseInput.vue';

const router = useRouter();
const auth = useAuthStore();
const form = reactive({ email: '', password: '' });
const error = ref('');
const loading = ref(false);

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    const res = await auth.login(form.email, form.password);
    if (res.role === 'system_admin') router.push('/admin/dashboard');
    else if (res.role === 'shop_owner') router.push('/shop-panel');
    else router.push('/panel');
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'خطا در ورود';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-neutral-800">ورود به نوبت‌یاب</h1>
        <p class="text-sm text-neutral-500 mt-1">خوش برگشتید!</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <BaseInput v-model="form.email" label="ایمیل" type="email" placeholder="example@mail.com" required :disabled="loading" />
        <BaseInput v-model="form.password" label="رمز عبور" type="password" placeholder="••••••••" required :disabled="loading" />

        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'در حال ورود...' : 'ورود' }}
        </button>
      </form>

      <p class="text-sm text-center text-neutral-500 mt-6">
        حساب ندارید؟
        <router-link to="/register" class="text-primary font-medium hover:underline">ثبت‌نام کنید</router-link>
      </p>
      <p class="text-xs text-center text-neutral-400 mt-2">
        <router-link to="/admin/login" class="hover:underline">ورود مدیران سیستم</router-link>
      </p>
    </div>
  </div>
</template>
