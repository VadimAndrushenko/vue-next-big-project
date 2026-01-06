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
        <PageHeader 
          title="AI Generator" 
          description="Create and customize your own AI companions with our advanced generator" 
        />
      </div>
    </section>

    <!-- Generator Content -->
    <section class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Generator Form -->
          <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-8 border border-white/10">
            <h2 class="text-2xl font-bold text-white mb-6">Create Your AI Companion</h2>
            
            <form @submit.prevent="generateAI" class="space-y-6">
              <!-- Basic Info -->
              <div>
                <label class="block text-sm font-medium text-white mb-2">Name</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter AI companion name"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white mb-2">Personality Type</label>
                <select 
                  v-model="form.personality"
                  class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select personality</option>
                  <option value="friendly">Friendly & Supportive</option>
                  <option value="romantic">Romantic & Passionate</option>
                  <option value="intellectual">Intellectual & Wise</option>
                  <option value="playful">Playful & Fun</option>
                  <option value="mysterious">Mysterious & Enigmatic</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white mb-2">Description</label>
                <textarea 
                  v-model="form.description"
                  rows="4"
                  class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Describe your AI companion's characteristics..."
                ></textarea>
              </div>
              
              <!-- Appearance -->
              <div>
                <label class="block text-sm font-medium text-white mb-2">Appearance Style</label>
                <div class="grid grid-cols-2 gap-4">
                  <label class="flex items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 border border-white/10">
                    <input type="radio" v-model="form.appearance" value="realistic" class="mr-3">
                    <span class="text-white">Realistic</span>
                  </label>
                  <label class="flex items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 border border-white/10">
                    <input type="radio" v-model="form.appearance" value="anime" class="mr-3">
                    <span class="text-white">Anime</span>
                  </label>
                  <label class="flex items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 border border-white/10">
                    <input type="radio" v-model="form.appearance" value="artistic" class="mr-3">
                    <span class="text-white">Artistic</span>
                  </label>
                  <label class="flex items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 border border-white/10">
                    <input type="radio" v-model="form.appearance" value="fantasy" class="mr-3">
                    <span class="text-white">Fantasy</span>
                  </label>
                </div>
              </div>
              
              <PrimaryButton 
                type="submit"
                :disabled="isGenerating"
                class="w-full justify-center"
              >
                {{ isGenerating ? 'Generating...' : 'Generate AI Companion' }}
              </PrimaryButton>
            </form>
          </div>
          
          <!-- Preview -->
          <div class="bg-[var(--color-bg-secondary)] rounded-2xl p-8 border border-white/10 lg:sticky lg:top-6 h-fit">
            <h2 class="text-2xl font-bold text-white mb-6">Preview</h2>
            
            <div v-if="preview" class="text-center">
              <div class="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center border border-white/10">
                <span class="text-white text-6xl">👩</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">{{ preview.name }}</h3>
              <p class="text-purple-200 mb-4">{{ preview.description }}</p>
              <div class="flex justify-center space-x-2">
                <span class="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">{{ preview.personality }}</span>
                <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{{ preview.appearance }}</span>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center border border-white/10">
                <span class="text-white text-3xl">✨</span>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">No Preview Yet</h3>
              <p class="text-purple-200">Fill out the form to see a preview of your AI companion</p>
            </div>
          </div>
        </div>
        
        <!-- Generated Results -->
        <div v-if="generatedAIs.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold text-white mb-6">Your Generated AI Companions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="ai in generatedAIs" 
              :key="ai.id"
              class="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-white/10"
            >
              <div class="text-center mb-4">
                <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center border border-white/10">
                  <span class="text-white text-2xl">👩</span>
                </div>
                <h3 class="text-lg font-bold text-white mt-2">{{ ai.name }}</h3>
                <p class="text-purple-200 text-sm">{{ ai.description }}</p>
              </div>
              <div class="flex justify-center space-x-2 mb-4">
                <span class="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">{{ ai.personality }}</span>
                <span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">{{ ai.appearance }}</span>
              </div>
              <div class="flex space-x-2">
                <button class="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm transition-colors">
                  Start Chat
                </button>
                <button class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors border border-white/10">
                  Edit
                </button>
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
import PageHeader from '@/components/PageHeader.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

// Use the API data composable
const {
  loading,
  error,
  fetchData
} = useApiData()

// Form state
const form = ref({
  name: '',
  personality: '',
  description: '',
  appearance: ''
})

// Generation state
const isGenerating = ref(false)
const generatedAIs = ref([])
const options = ref({ isPublic: false, saveToFavorites: true, enableNSFW: false })

// Computed preview
const preview = computed(() => {
  if (!form.value.name && !form.value.description) return null
  
  return {
    name: form.value.name || 'Your AI Companion',
    description: form.value.description || 'A unique AI companion created just for you',
    personality: form.value.personality || 'Custom',
    appearance: form.value.appearance || 'Realistic'
  }
})

// Generate AI companion
const generateAI = async () => {
  if (!form.value.name || !form.value.personality || !form.value.description || !form.value.appearance) {
    alert('Please fill in all fields')
    return
  }
  
  isGenerating.value = true
  
  // Simulate generation process
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const newAI = {
    id: Date.now(),
    name: form.value.name,
    personality: form.value.personality,
    description: form.value.description,
    appearance: form.value.appearance,
    createdAt: new Date()
  }
  
  generatedAIs.value.unshift(newAI)
  
  // Reset form
  form.value = {
    name: '',
    personality: '',
    description: '',
    appearance: ''
  }
  
  isGenerating.value = false
}

// Fetch data on mount
onMounted(() => {
  fetchData()
})

// Set page layout
definePageMeta({
  layout: 'default'
})
</script>
