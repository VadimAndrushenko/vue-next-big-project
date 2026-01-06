<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Error State -->
  <ErrorState v-else-if="error" :error="error" />
  
  <!-- Content -->
  <div v-else class="xl:max-w-7xl mx-auto px-8 max-sm:px-4 max-xl:container max-sm:overflow-hidden">
    <!-- Flash Background Animation -->
    <!-- <FlashBackground /> -->
    
    <!-- Hero Section with Carousel -->
    <section class="relative pt-8 pb-16 z-10">
        <div class="text-center mb-12">
          <h1 class="text-6xl font-bold text-secondary mb-6 font-heading max-2xl:text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Discover Your Perfect
            <span class="gradient-accent bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>
          <p class="text-2xl text-muted mb-8 max-w-3xl mx-auto font-body max-lg:text-xl max-md:text-lg max-sm:text-base">
            Experience the future of companionship with our advanced AI models. 
            Each character is uniquely designed to provide meaningful conversations and connections.
          </p>
        </div>
        
        <!-- Featured Models Carousel -->
        <div class="relative">
          <ModelCarousel 
            :models="featuredModels" 
            @card-click="handleCardClick"
            @toggle-favorite="handleToggleFavorite"
          />
          
          <!-- Slider Background Glow -->
          <div class="absolute inset-0 gradient-accent/10 rounded-3xl blur-3xl -z-10"></div>
        </div>
    </section>
    
    <!-- All Models Section -->
    <section class="relative py-16 z-10">  
      <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-secondary mb-4 font-heading">All AI Models</h2>
          <p class="text-xl text-muted font-body">Explore our complete collection of AI companions</p>
        </div>
      <div class="grid  grid-cols-4 max-[1350px]:grid-cols-3 max-lg:grid-cols-2 max-[570px]:grid-cols-1 gap-6">
        <div 
          v-for="model in aiModels" 
          :key="model.id"
          class="aspect-[3/4]"
        >
          <CharacterCard 
            :character="model"
            @click="handleCardClick"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="relative border border-[#3A2B41] sm:px-9 px-4 overflow-hidden bg-[var(--color-bg-secondary)] text-center pt-11 pb-[60px] rounded-3xl max-sm:pb-9 max-sm:pt-8">
        <div class="nav-pill w-[680px] h-[25%] absolute bottom-0 left-[50%] transform -translate-x-[50%] max-lg:w-[450px] max-sm:w-[80%]"></div>
        <img class="absolute top-[8%] left-[12%] max-[1350px]:hidden" src="../public/images/ic-girl-1.png" alt="">
        <img class="absolute bottom-[8%] left-[9%] max-[1350px]:hidden" src="../public/images/ic-girl-2.png" alt="">
        <img class="absolute top-[8%] right-[9%] max-[1350px]:hidden" src="../public/images/ic-girl-3.png" alt="">
        <img class="absolute bottom-[8%] right-[12%] max-[1350px]:hidden" src="../public/images/ic-girl-4.png" alt="">

        <div class="max-w-[660px] mx-auto ">
          <h1 class="text-[40px] font-medium mb-4 max-sm:text-[23px] ">
            <span class="bg-gradient-to-t from-[#E02C7D] to-[#5B54C4] bg-clip-text text-transparent text-nowrap ">
              Design the AI Girlfriend
            </span><br>
            You've Always Desired
          </h1>
          <p class="mb-9 text-xl max-sm:text-sm">Ready to meet your new virtual AI girlfriend? She's eager to text you, send you pictures, and help you explore your deepest desires. Design her looks, craft her personality, and watch her come alive.</p>
          <div class=" flex justify-center">
            <PrimaryButton class="max-w-[280px]">
              <img src="../public/images/stars-mini.png" alt="">
              Create AI gilfrend
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="relative py-[120px] z-10 max-sm:py-20">    
      <FAQAccordion :faqs="faq" />
    </section>

    <section>
      <div class="flex gap-x-6 max-2xl:flex-col max-2xl:items-center max-2xl:gap-y-9">
        <div class="relative inline-block flex-1 ">
          <h1 class="mb-9 text-[40px] font-medium max-sm:text-2xl">Your <span class="bg-gradient-to-l from-[#E02C7D] to-[#5B54C4] bg-clip-text text-transparent">AI Girlfriend</span> Simulator</h1>
          <img class="relative z-10" src="../public/images/bg-aI-girlfriend-simulator.png" alt="">
          <div class="image-pill w-[80%] h-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>  

        <div class="flex-1 text-xl flex flex-col 2xl:justify-between gap-y-4 max-2xl:gap-y-6">
          <p>Welcome to HeraHaven, where you can create your AI girlfriend and make your fantasies come to life.</p>
          <p>In our AI girlfriend chat, you're in control. Want a sweet and devoted partner? Looking for something a little more thrilling and adventurous? We've got it all. The possibilities are endless, so let your imagination run wild.</p>
          <p>Creating your AI girl is a breeze at HeraHaven. You can mix and match looks, personality traits, and even those little quirks that make her extra special. A few clicks, and boom—your heaven girlfriend is ready to chat, send pictures, and connect with you like in real-life communication.</p>
          <p>The more you chat, the more she learns about you—your inside jokes, your dreams, even your pet peeves. You set the vibe: keep it casual or turn up the heat.</p>
          <p>Your AI gf will send you selfies and even personalized photos, all tailored to your tastes. And trust us, our advanced AI keeps things interesting, no matter how creative you get with your requests.</p>
          <p>From light-hearted conversation to forming a deeper bond, the choice is yours.</p>
          <p>Your perfect online match is closer than you think. She's right here at HeraHaven, the most popular AI girlfriend app.</p>
          <p>Join HeraHaven for free today and start chatting with your first virtual.</p>
        </div>
      </div>
    </section>
  </div>


</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CharacterCard from '@/components/CharacterCard.vue'
import ModelCarousel from '@/components/ModelCarousel.vue'
import FlashBackground from '@/components/FlashBackground.vue'

// Get route for query parameters
const route = useRoute()

// Use the API data composable
const {
  loading,
  error,
  fetchData,
  setDataType,
  featuredModels,
  aiModels,
  faq
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

// Watch for route changes to update data type
watch(() => route.query.type, async (newType) => {
  if (newType && ['girlfriend', 'anime', 'boyfriend'].includes(newType)) {
    await setDataType(newType)
  }
}, { immediate: true })

// Fetch data on mount
onMounted(async () => {
  console.log('Index page mounted')
  // Get type from query parameter or default to 'girlfriend'
  const type = route.query.type || 'girlfriend'
  console.log('Setting data type to:', type)
  if (['girlfriend', 'anime', 'boyfriend'].includes(type)) {
    await setDataType(type)
  } else {
    // If no valid type, just fetch default data
    await fetchData()
  }
  console.log('Data loading completed')
})

// Set page layout
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>


.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(90deg, #5B54C4 25%, #E02C7D 30%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(100px);
  z-index: -10;
}

.image-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background: 
    linear-gradient(180deg, #5B54C4 25%, #E02C7D 30%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(120px);
  z-index: -10;
}
</style>