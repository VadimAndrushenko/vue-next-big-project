<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-white text-xl">{{ message || 'Loading...' }}</div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>
