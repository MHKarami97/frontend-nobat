<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import PublicNavbar from '@/components/PublicNavbar.vue';
import PublicFooter from '@/components/PublicFooter.vue';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqrrpwd';

const form = reactive({ name: '', email: '', phone: '', message: '' });
const sent = ref(false);
const sending = ref(false);
const error = ref('');

async function submit() {
  error.value = '';
  sending.value = true;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      }),
    });

    if (!res.ok) throw new Error('submit_failed');

    sent.value = true;
  } catch (e) {
    error.value = 'ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید یا مستقیماً ایمیل بزنید.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <PublicNavbar />
    <div class="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
      <h1 class="text-3xl font-bold text-neutral-800 mb-6">تماس با ما</h1>
      <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
        <div v-if="sent" class="text-center py-8">
          <div class="text-4xl mb-3">✅</div>
          <p class="text-neutral-700 font-medium">پیام شما ارسال شد. به زودی پاسخ می‌دهیم.</p>
        </div>
        <form v-else @submit.prevent="submit" class="space-y-4">
          <BaseInput v-model="form.name" label="نام شما" required :disabled="sending" />
          <BaseInput v-model="form.email" label="ایمیل" type="email" required :disabled="sending" />
          <BaseInput v-model="form.phone" label="موبایل" type="tel" required :disabled="sending" />
          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700">پیام <span class="text-red-500">*</span></label>
            <textarea v-model="form.message" required rows="5" placeholder="پیام خود را بنویسید..." :disabled="sending"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none disabled:opacity-50"></textarea>
          </div>

          <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

          <button type="submit" :disabled="sending"
            class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition disabled:opacity-50">
            {{ sending ? 'در حال ارسال...' : 'ارسال پیام' }}
          </button>
        </form>
        <div class="mt-8 pt-6 border-t border-neutral-100 text-sm text-neutral-500 space-y-2">
          <p>📧 mhkarami97@gmail.com</p>
          <p>📞 ۰۲۱-۱۲۳۴۵۶۷۸</p>
        </div>
      </div>
    </div>
    <PublicFooter />
  </div>
</template>