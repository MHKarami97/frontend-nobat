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
    if (res.role !== 'system_admin') {
      auth.logout();
      error.value = 'دسترسی فقط برای مدیران سیستم';
      return;
    }
    router.push('/admin/dashboard');
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'خطا در ورود';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <span class="text-4xl">⚡</span>
        <h1 class="text-2xl font-bold text-neutral-800 mt-2">پنل مدیریت</h1>
        <p class="text-sm text-neutral-500">ورود اختصاصی مدیران سیستم</p>
      </div>
      <form @submit.prevent="submit" class="space-y-4">
        <BaseInput v-model="form.email" label="ایمیل مدیر" type="email" required :disabled="loading" />
        <BaseInput v-model="form.password" label="رمز عبور" type="password" required :disabled="loading" />
        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>
        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition disabled:opacity-50">
          {{ loading ? 'در حال ورود...' : 'ورود به پنل' }}
        </button>
      </form>
      <p class="text-xs text-center text-neutral-400 mt-4">
        <router-link to="/login" class="hover:underline">بازگشت به صفحه عمومی</router-link>
      </p>
    </div>
  </div>
</template>
