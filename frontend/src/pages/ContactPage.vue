<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';

const form = reactive({ name: '', email: '', message: '' });
const sent = ref(false);

function submit() { sent.value = true; }
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-neutral-800 mb-6">تماس با ما</h1>
    <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
      <div v-if="sent" class="text-center py-8">
        <div class="text-4xl mb-3">✅</div>
        <p class="text-neutral-700 font-medium">پیام شما ارسال شد. به زودی پاسخ می‌دهیم.</p>
      </div>
      <form v-else @submit.prevent="submit" class="space-y-4">
        <BaseInput v-model="form.name" label="نام شما" required />
        <BaseInput v-model="form.email" label="ایمیل" type="email" required />
        <div class="space-y-1">
          <label class="block text-sm font-medium text-neutral-700">پیام <span class="text-red-500">*</span></label>
          <textarea v-model="form.message" required rows="5" placeholder="پیام خود را بنویسید..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"></textarea>
        </div>
        <button type="submit" class="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition">ارسال پیام</button>
      </form>
      <div class="mt-8 pt-6 border-t border-neutral-100 text-sm text-neutral-500 space-y-2">
        <p>📧 support@nobat-yab.ir</p>
        <p>📞 ۰۲۱-۱۲۳۴۵۶۷۸</p>
      </div>
    </div>
  </div>
</template>
