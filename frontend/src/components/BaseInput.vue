<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}>();
defineEmits<{ 'update:modelValue': [string] }>();
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-neutral-700">
      {{ label }}
      <span v-if="required" class="text-red-500 mr-0.5">*</span>
    </label>
    <input
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800
             focus:ring-2 focus:ring-primary/20 focus:border-primary transition
             disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
