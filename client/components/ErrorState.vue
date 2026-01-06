<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-red-400 text-xl">Error: {{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true
  }
})
</script>
