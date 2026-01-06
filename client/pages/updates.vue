<template>
  <div class="min-h-screen">
    
    <div class="mx-auto px-8 max-sm:px-4 container max-md:pt-6" >
      <!-- Page Title -->
      <div class="mb-9 flex justify-between items-center">
        <h1 class="text-3xl font-medium">Updates</h1>

        <div class="max-md:hidden"> 
          <HeaderActions/>
        </div>
      </div>

      <!-- Updates List -->
      <div class="space-y-3 relative">
        <div class="nav-pill absolute h-[150px] w-full -top-[5%] -z-10 max-2xl:hidden"></div>
        <div 
          v-for="update in updates" 
          :key="update.id"
          class="bg-[var(--color-bg-secondary)] rounded-3xl border border-[#3A2B41] transition-all sm:p-6 max-sm:p-4"
        >
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="sm:text-xl font-semibold text-white max-sm:text-sm">{{ update.title }}</h2>
            <span class="text-gray-400 max-sm:text-xs">{{ update.date }}</span>
          </div>
          
          <!-- Description -->
          <p class="text-white/80 mb-6 leading-relaxed max-sm:text-sm">{{ update.description }}</p>
          
          <!-- CTA Button -->
          <div class="flex">
          <button class="lg:w-[300px] px-6 py-2 bg-[var(--color-bg-primary)] text-white rounded-lg hover:bg-white/20 transition-all border border-white/10 max-lg:flex-1">
              Give Feedback
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderActions from '~/components/HeaderActions.vue';

// Set page meta
definePageMeta({
  layout: 'headless',
  headerTitle: 'Updates'
})

// Updates data
const updates = ref([
  {
    id: 1,
    title: 'Voice Change Notice',
    description: 'Kai (the anime character) has a new voice! We\'ve also retired the French voice. In its place, we\'ve introduced a new American voice to keep the experience fresh and immersive.',
    date: 'April 17th 2025'
  },
  {
    id: 2,
    title: 'New Character Added',
    description: 'Meet Sarah, our newest AI girlfriend character. She brings a unique personality and conversation style to the platform. Try chatting with her today!',
    date: 'April 15th 2025'
  },
  {
    id: 3,
    title: 'Performance Improvements',
    description: 'We\'ve optimized the chat system for faster response times and better message handling. Your conversations should now feel more natural and responsive.',
    date: 'April 12th 2025'
  },
  {
    id: 4,
    title: 'Mobile App Update',
    description: 'The mobile experience has been completely redesigned with better navigation, improved chat interface, and enhanced image generation capabilities.',
    date: 'April 10th 2025'
  }
])
</script>

<style scoped>

.nav-pill > * {
  position: relative;
  z-index: 10;
}

.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background: 
    linear-gradient(180deg, #E02C7D 0%, #5B54C4 90%) no-repeat;    
  transition: opacity 200ms ease-in-out;
  filter: blur(100px);
  z-index: 1;
}

.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
}
</style>