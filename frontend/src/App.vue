<template>
  <div>
    <router-view />
    <ReloadPrompt />
  </div>
</template>

<script setup lang="ts">
import ReloadPrompt from './components/ReloadPrompt.vue';
</script>
