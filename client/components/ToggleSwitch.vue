<template>
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      <p class="text-purple-200 text-sm">{{ description }}</p>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
      <input 
        :checked="modelValue" 
        @change="$emit('update:modelValue', $event.target.checked)"
        type="checkbox" 
        class="sr-only peer"
      >
      <div class="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
    </label>
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
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
