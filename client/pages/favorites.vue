<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Error State -->
  <ErrorState v-else-if="error" :error="error" />
  
  <!-- Content -->
  <div v-else>
    <!-- Page Header -->
    <section class="p-8">
      <div class="max-w-7xl mx-auto">
        <PageHeader title="Favorites" description="Your favorite AI companions and models" />
      </div>
    </section>

    <!-- Favorites Content -->
    <section class="p-8">
      <div class="max-w-7xl mx-auto">
        <div v-if="favorites.length > 0">
          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10 text-center">
              <div class="text-3xl font-bold text-pink-400 mb-2">{{ favorites.length }}</div>
              <div class="text-purple-200">Total Favorites</div>
            </div>
            <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10 text-center">
              <div class="text-3xl font-bold text-purple-400 mb-2">{{ recentFavorites.length }}</div>
              <div class="text-purple-200">Added This Week</div>
            </div>
            <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10 text-center">
              <div class="text-3xl font-bold text-blue-400 mb-2">{{ categories.length }}</div>
              <div class="text-purple-200">Categories</div>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10 mb-8">
            <div class="flex flex-wrap gap-4">
              <button 
                @click="selectedCategory = ''"
                :class="[
                  'px-4 py-2 rounded-xl transition-colors',
                  selectedCategory === '' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                ]"
              >
                All Categories
              </button>
              <button 
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-xl transition-colors',
                  selectedCategory === category 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Favorites Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="model in filteredFavorites" 
              :key="model.id"
              class="aspect-[3/4]"
            >
              <CharacterCard 
                :character="model"
                @click="handleCardClick"
                @toggle-favorite="removeFromFavorites"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
            <span class="text-white text-3xl">❤️</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">No Favorites Yet</h3>
          <p class="text-purple-200 mb-8 max-w-md mx-auto">
            Start exploring our AI models and add your favorites to this collection. Your favorites will appear here for quick access.
          </p>
          <NuxtLink 
            to="/"
            class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Explore Models
          </NuxtLink>
        </div>

        <!-- Recent Activity -->
        <div v-if="recentActivity.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10">
            <div class="space-y-4">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                  <span class="text-white text-sm">{{ activity.icon }}</span>
                </div>
                <div class="flex-1">
                  <p class="text-white font-medium">{{ activity.title }}</p>
                  <p class="text-purple-200 text-sm">{{ activity.description }}</p>
                </div>
                <div class="text-purple-200 text-sm">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import PageHeader from '@/components/PageHeader.vue'

// Use the API data composable
const {
  loading,
  error,
  fetchData,
  aiModels
} = useApiData()

// Favorites state
const selectedCategory = ref('')
const favorites = ref([])
const recentActivity = ref([
  {
    id: 1,
    icon: '❤️',
    title: 'Added Catalina 19 to favorites',
    description: 'You added this model to your favorites',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: '💬',
    title: 'Started chat with Luna',
    description: 'You began a conversation with Luna',
    time: '1 day ago'
  },
  {
    id: 3,
    icon: '⭐',
    title: 'Rated Sofia 5 stars',
    description: 'You gave Sofia a perfect rating',
    time: '3 days ago'
  }
])

// Computed properties
const filteredFavorites = computed(() => {
  if (!selectedCategory.value) return favorites.value
  return favorites.value.filter(model => model.category === selectedCategory.value)
})

const categories = computed(() => {
  const cats = [...new Set(favorites.value.map(model => model.category))]
  return cats.filter(Boolean)
})

const recentFavorites = computed(() => {
  // Simulate recent favorites (added this week)
  return favorites.value.slice(0, 3)
})

// Handle card click
const handleCardClick = (character) => {
  // Navigate to lobby page for the selected character
  navigateTo(`/lobby?id=${character.id}`)
}

// Remove from favorites
const removeFromFavorites = (modelId) => {
  favorites.value = favorites.value.filter(model => model.id !== modelId)
}

// Initialize favorites from AI models
const initializeFavorites = () => {
  favorites.value = aiModels.value.filter(model => model.isFavorite)
}

// Fetch data on mount
onMounted(() => {
  fetchData()
  initializeFavorites()
})

// Set page layout
definePageMeta({
  layout: 'default'
})
</script>
