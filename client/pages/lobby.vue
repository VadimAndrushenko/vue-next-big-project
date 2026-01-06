<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Error State -->
  <ErrorState v-else-if="error" :error="error" />
  
  <!-- Content -->
  <div v-else class="xl:max-w-7xl mx-auto px-8 max-sm:px-4 max-xl:container min-h-screen bg-gradient-to-br from-[#1b0425] via-[#2d1b3d] to-[#1b0425] text-white">
    <!-- Top Section: Character Profile -->
    <section class="py-16">
      <div class="flex flex-col max-lg:items-center lg:flex-row gap-6">
        
        <!-- Left Column: Mini Gallery and Main Portrait -->
        <div class="lg:max-w-[410px]">
          <div class="flex gap-4">
            <!-- Mini Gallery -->
            <div class="w-1/6.5 flex flex-col h-[500px] max-w-[62px]">
              <div 
                v-for="(image, index) in characterImages" 
                :key="index"
                @click="selectImage(index)"
                class="relative cursor-pointer group flex-1"
              >
                <img 
                  :src="image.src" 
                  :alt="`${character.name} - Image ${index + 1}`"
                  class="w-full h-full object-cover rounded-xl border-2 transition-all duration-300"
                  :class="[
                    selectedImageIndex === index 
                      ? 'border-accent shadow-lg shadow-accent/30' 
                      : 'border-white/10 hover:border-white/30'
                  ]"
                />
                <!-- Play button overlay for video thumbnails -->
                <div 
                  v-if="image.isVideo"
                  class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl group-hover:bg-black/30 transition-all duration-300"
                >
                  <div class="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Main Character Portrait -->
            <div class="w-5.5/6.5">
              <img 
                :src="characterImages[selectedImageIndex].src" 
                :alt="character.name"
                class="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <!-- Right Column: Character Details -->
        <div class="flex-1">
          <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between max-lg:gap-y-4 max-sm:p-4">
            <!-- Top Content -->
            <div>
              <!-- Name and Age -->
              <h1 class="text-3xl font-bold text-white mb-4 font-heading">
                {{ character.name }} {{ character.age }}
              </h1>
              
              <!-- Biography -->
              <p class="text-gray-300 text-sm leading-relaxed font-body">
                {{ character.biography }}
              </p>
            </div>
            
            <!-- Character Peculiarities Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="(peculiarity, index) in characterPeculiarities" 
                :key="index"
                @click="selectPeculiarity(peculiarity)"
                class="bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group max-sm:p-3"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">{{ peculiarity.icon }}</span>
                  <span class="text-xs text-accent font-medium">Trait</span>
                </div>
                <p class="text-xs text-gray-300 group-hover:text-white transition-colors">
                  {{ peculiarity.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Middle Divider / Section Title -->
    <section class="py-8">
      <h2 class="text-3xl font-bold text-white text-center font-heading max-sm:text-2xl">
        How to start a dialogue?
      </h2>
    </section>
    
    <!-- Bottom Section: Scenario Examples Grid -->
    <section class="pb-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="(scenario, index) in scenarioExamples" 
          :key="index"
          class="aspect-[3/4] relative rounded-[24px] overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          @click="selectScenarioExample(scenario)"
        >
          <!-- Background Image -->
          <img 
            :src="scenario.image" 
            :alt="scenario.title"
            class="w-full h-full object-cover rounded-[24px]"
          />
          
          <!-- Bottom Info Block with Gradient Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-4 z-10">
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-[24px]"></div>
            
            <!-- Content -->
            <div class="relative z-10 text-primary">
              <!-- Title -->
              <h3 class="text-lg font-bold mb-1 truncate">
                {{ scenario.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-sm font-normal leading-relaxed line-clamp-2 opacity-80">
                {{ scenario.description }}
              </p>
            </div>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-[24px]"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Get character ID from route
const route = useRoute()
const characterId = route.query.id

// Loading states
const loading = ref(true)
const error = ref(null)

// Character data
const character = ref({
  name: 'Catalina',
  age: 19,
  biography: "You've been seeing Rina at the club. Tonight you want to confess that you're in love with her. As you sit at your table, you see her kissing one of the bouncers. She now comes over to your table."
})

// Character images for mini gallery
const characterImages = ref([
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face', isVideo: false },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face', isVideo: false },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face', isVideo: true },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face', isVideo: false },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face', isVideo: false },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face', isVideo: false }
])

// Selected image index
const selectedImageIndex = ref(1) // Second image is selected by default

// Character peculiarities
const characterPeculiarities = ref([
  { id: 1, text: 'Shy & Reserved', icon: '🌸' },
  { id: 2, text: 'Loves Reading', icon: '📚' },
  { id: 3, text: 'Coffee Addict', icon: '☕' },
  { id: 4, text: 'Night Owl', icon: '🌙' },
  { id: 5, text: 'Cat Person', icon: '🐱' },
  { id: 6, text: 'Introvert', icon: '🤫' }
])

// Scenario examples for grid
const scenarioExamples = ref([
  {
    id: 1,
    title: 'Cafe Meeting',
    description: 'You notice Catalina sitting alone at a corner table, reading a book. She looks up and smiles as you approach.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=500&fit=crop'
  },
  {
    id: 2,
    title: 'Park Walk',
    description: 'While jogging in the park, you spot Catalina feeding pigeons. She waves you over to join her.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop'
  },
  {
    id: 3,
    title: 'Street Encounter',
    description: 'You bump into Catalina on a busy street. She drops her shopping bags, and you help her pick them up.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=500&fit=crop'
  },
  {
    id: 4,
    title: 'Gym Session',
    description: 'Catalina is struggling with a heavy weight. You offer to spot her during her workout.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
  },
  {
    id: 5,
    title: 'Bus Ride',
    description: 'You find yourself sitting next to Catalina on a crowded bus. She seems nervous about missing her stop.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=500&fit=crop'
  },
  {
    id: 6,
    title: 'Massage Parlor',
    description: 'Catalina is your massage therapist today. She notices you seem stressed and offers extra care.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=500&fit=crop'
  },
  {
    id: 7,
    title: 'Library Study',
    description: 'You\'re studying when Catalina sits at your table. She\'s researching the same topic as you.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=500&fit=crop'
  },
  {
    id: 8,
    title: 'Shopping Mall',
    description: 'Catalina is working at a boutique. You enter looking for a gift, and she helps you choose.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=500&fit=crop'
  }
])

// Methods
const selectImage = (index) => {
  selectedImageIndex.value = index
}

const selectPeculiarity = (peculiarity) => {
  console.log('Selected peculiarity:', peculiarity)
  // Could trigger character trait exploration or conversation starter
  // For now, just log the selection
}

const selectScenarioExample = (scenario) => {
  console.log('Selected scenario example:', scenario)
  // Navigate to chat page with character ID
  navigateTo(`/chat?id=${characterId}`)
}



// Load character data based on ID
onMounted(async () => {
  loading.value = true
  error.value = null
  
  try {
    if (characterId) {
      console.log('Loading character with ID:', characterId)
      // Simulate API call delay to prevent flash
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // TODO: Replace with actual API call
      // const response = await $fetch(`/api/characters/${characterId}`)
      // character.value = response
      
      console.log('Character loaded successfully')
    } else {
      error.value = 'No character ID provided'
    }
  } catch (err) {
    console.error('Error loading character:', err)
    error.value = 'Failed to load character data'
  } finally {
    loading.value = false
  }
})

// Set page layout
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Hide scrollbar for carousel */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Custom gradient background */
.bg-gradient-to-br {
  background: radial-gradient(ellipse at center, #2d1b3d 0%, #1b0425 50%, #1b0425 100%);
}
</style>
