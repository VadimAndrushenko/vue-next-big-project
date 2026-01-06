<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Error State -->
  <ErrorState v-else-if="error" :error="error" />
  
  <!-- Content -->
  <div v-else>
    <!-- Premium Access Check -->
    <div v-if="!isPremium" class="h-full flex items-center justify-center p-8">
      <div class="text-center max-w-2xl">
        <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Premium Access Required
        </h1>
        <p class="text-white/70 mb-8">
          You need a premium subscription to access private content. Upgrade now to unlock exclusive AI companions and premium features.
        </p>
        <div class="flex gap-4 justify-center">
          <button 
            @click="navigateTo('/subscribe')"
            class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Upgrade to Premium
          </button>
          <button 
            @click="navigateTo('/')"
            class="px-8 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>

    <!-- Premium Content -->
    <div v-else class="max-w-7xl mx-auto px-8 max-sm:px-4 max-xl:container max-md:pt-6">      
      <!-- All Models Section -->
      
      <section>
        <div>
          <h1 class="text-[40px] font-medium mb-9 max-sm:text-3xl"><span class="bg-gradient-to-l from-[#E02C7D] to-[#5B54C4] bg-clip-text text-transparent text-nowrap">Private</span> Content</h1>
          
          <div class="grid  grid-cols-4 max-[1500px]:grid-cols-3 max-lg:grid-cols-2 max-[570px]:grid-cols-1 gap-6">
            <div 
              v-for="model in aiModels" 
              :key="model.id"
              class="aspect-[3/4]"
            >
              <CharacterCard 
                :character="model"
                :isBlocked="true"
                @click="handleCardClick"
                @toggle-favorite="handleToggleFavorite"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex relative pb-20 py-[60px] px-11 w-full border border-[#3A2B41] overflow-hidden bg-[var(--color-bg-secondary)] rounded-3xl mt-[60px] max-[1390px]:flex-col max-[1390px]:pb-0 max-[1390px]:items-center max-[1390px]:gap-y-11 max-md:px-7 max-sm:px-4 max-sm:pt-9">
          <div class="flex flex-col min-[1390px]:w-[50%] max-[1390px]:items-center">
            <h1 class="text-[38px] mb-2 max-[1390px]:text-center max-md:text-3xl max-sm:text-2xl">Create your own <span class="bg-gradient-to-r from-[#E02C7D] to-[#5B54C4] bg-clip-text text-transparent">AI Girlfriend</span></h1>
            <p class="mb-9 max-[1390px]:text-center max-md:text-sm" >Your virtual AI girlfriend is waiting to meet you. Looks, personality, quirks... she's yours to create. One click, and your AI gf is here to make your fantasies come true.</p>
            <PrimaryButton
              class="sm:max-w-[274px] max-md:text-sm">
              <img class="max-sm:w-6" src="../public/images/stars-mini.png" alt="">
              Name button
            </PrimaryButton>
          </div>
          <div class="min-[1390px]:w-[50%]">
            <img class="min-[1390px]:absolute relative bottom-0 z-10" src="../public/images/girl-choice.png" alt="">
            <div class="nav-pill w-[40%] h-[40%] absolute opacity-70 bottom-0 right-[8.5%] transform max-[1390px]:left-1/2 max-[1390px]:-translate-x-1/2  max-[1390px]:h-[25%] max-lg:w-[55%]"></div>
          </div>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'

// Get user state
const user = useState('user', () => null)
const isPremium = computed(() => user.value?.isPremium || false)

// Use the API data composable
const {
  loading,
  error,
  fetchData,
  aiModels
} = useApiData()

// Handle card click
const handleCardClick = (character) => {
  // Navigate to lobby page for the selected character
  navigateTo(`/lobby?id=${character.id}`)
}

// Handle favorite toggle
const handleToggleFavorite = (characterId) => {
  // Toggle favorite status
  console.log('Toggle favorite:', characterId)
}

// Fetch data on mount
onMounted(() => {
  fetchData()
})

// Set page layout
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const isClose = ref(false)

const isBlocked = computed(() => !isClose.value && route.name === 'private')
</script>

<style scoped>
.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(360deg, #5B54C4 25%, #E02C7D 30%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(100px);
  z-index: -10;
}
</style>