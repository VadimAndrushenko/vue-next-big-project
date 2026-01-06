<template>
  <div class="flex flex-col md:flex-row gap-4 mb-8">
    <div class="flex-1">
      <input 
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text" 
        placeholder="Search models..."
        class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
    </div>
    <div class="flex gap-2">
      <select 
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All Categories</option>
        <option value="girlfriend">Girlfriend</option>
        <option value="anime">Anime</option>
        <option value="boyfriend">Boyfriend</option>
      </select>
      <button 
        @click="$emit('toggle-favorites')"
        :class="[
          'px-4 py-3 rounded-lg transition-colors duration-200',
          favoritesOnly 
            ? 'bg-pink-500 text-white' 
            : 'bg-white/10 text-white hover:bg-white/20'
        ]"
      >
        Favorites Only
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  favoritesOnly: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:searchQuery', 'update:selectedCategory', 'toggle-favorites'])
</script>
