<template>
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
      {{ title }}
    </h1>
    <p class="text-xl text-purple-200 max-w-2xl mx-auto">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
