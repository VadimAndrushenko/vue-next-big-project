<template>
  <div :class="[
    'p-8 rounded-2xl transition-all duration-300 transform hover:scale-105',
    isPopular 
      ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-pink-400 relative scale-105 shadow-2xl shadow-pink-500/25' 
      : 'card card-hover'
  ]">
    <!-- Popular Badge -->
    <div v-if="isPopular" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
      <span class="bg-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
    </div>
    
    <!-- Plan Header -->
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
      <div class="text-4xl font-bold mb-2" :class="isPopular ? 'text-white' : 'text-pink-400'">
        ${{ plan.price }}
      </div>
      <div :class="isPopular ? 'text-pink-100' : 'text-purple-200'">per month</div>
    </div>
    
    <!-- Features List -->
    <ul class="space-y-3 mb-8">
      <li 
        v-for="feature in plan.features" 
        :key="feature"
        class="flex items-center"
        :class="isPopular ? 'text-white' : 'text-purple-200'"
      >
        <span :class="isPopular ? 'text-green-300' : 'text-green-400'" class="mr-3">✓</span>
        {{ feature }}
      </li>
    </ul>
    
    <!-- Action Button -->
    <button 
      @click="$emit('select-plan', plan.id)"
      :class="[
        'w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
        isPopular 
          ? 'bg-white text-purple-600 hover:bg-gray-100' 
          : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
      ]"
    >
      Choose {{ plan.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  plan: {
    type: Object,
    required: true
  },
  isPopular: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select-plan'])
</script>
