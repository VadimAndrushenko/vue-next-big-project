<template>
  <div class="flex items-center p-4 bg-white/5 rounded-lg">
    <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-4">
      <span class="text-white text-sm">{{ activity.icon }}</span>
    </div>
    <div class="flex-1">
      <p class="text-white font-medium">{{ activity.title }}</p>
      <p class="text-purple-200 text-sm">{{ activity.description }}</p>
    </div>
    <span class="text-purple-300 text-sm">{{ activity.time }}</span>
  </div>
</template>

<script setup>
defineProps({
  activity: {
    type: Object,
    required: true
  }
})
</script>
