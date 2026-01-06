<template>
  <div class="card p-6">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" :style="{ backgroundColor: feature.color }">
        <span class="text-white text-xl">{{ feature.icon }}</span>
      </div>
      <h3 class="text-xl font-bold text-white">{{ feature.title }}</h3>
    </div>
    <p class="text-purple-200 mb-4">{{ feature.description }}</p>
    <button 
      @click="$emit('action', feature.action)"
      class="bg-gradient-to-r text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
      :style="{ background: feature.buttonGradient }"
    >
      {{ feature.buttonText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true
  }
})

defineEmits(['action'])
</script>
