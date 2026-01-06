<template>
  <div class="min-h-screen">
    <div class="mx-auto container px-8 max-sm:px-4 max-md:pt-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 border-b border-[#3A2B41]">
        <!-- Filter Dropdown -->
        <div class="relative inline-flex items-center group">
          <select
            v-model="selectedFilter"
            class="appearance-none -webkit-appearance-none bg-transparent py-2 pr-8 rounded-lg focus:outline-none focus:ring-0"
          >
            <option class="bg-[#1a0826]" value="all">All post</option>
            <option class="bg-[#1a0826]" value="relationships">Relationships</option>
            <option class="bg-[#1a0826]" value="dating">Dating</option>
            <option class="bg-[#1a0826]" value="ai">AI & Technology</option>
          </select>

          <span aria-hidden="true"
            class="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-b-2 border-[#A854C4] transform rotate-45 transition-transform group-focus-within:rotate-[225deg]">
          </span>

        </div>
      </div>

      <!-- Articles List -->
      <div class="space-y-6">
        <NuxtLink 
          :to="`/news/${article.id}`"
          v-for="article in filteredArticles" 
          :key="article.id"
          class="block  py-6 border-b border-[#3A2B41] transition-all"
        >
          <div class="flex md:space-x-6 max-md:flex-col">
            <!-- Article Image -->
            <div class="flex-shrink-0">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-72 h-56  object-cover rounded-lg max-md:w-full max-md:h-auto"
              >
            </div>
            
            <!-- Article Content -->
            <div class="flex-1 max-md:mt-3">
              <h2 class="text-[28px] font-medium text-white mb-2 max-sm:text-xl">{{ article.title }}</h2>
              <p class="text-white/80 mb-4 line-clamp-4 max-sm:text-sm">{{ article.summary }}</p>
              <div class="text-white/60 text-sm max-sm:text-xs">
                By {{ article.author }} — {{ article.date }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Load More Button -->
      <div class="flex justify-center mt-8">
        <button class="sm:w-[132px] sm:py-[18px] bg-[var(--color-bg-secondary)] max-sm:w-[90px] max-sm:py-[14px] hover:text-white hover:bg-[var(--color-bg-primary)] rounded-2xl transition-all border border-white/10">
          More post
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Set page meta
definePageMeta({
  layout: 'headless'
})

// State
const selectedFilter = ref('all')

// Articles data
const articles = ref([
  {
    id: 1,
    title: 'How to Be Dominant in Bed: Complete Guide',
    summary: 'To be dominant in bed is not an adjective so much as it is a lifestyle. Doms exist in the wider umbrella of BDSM behavior. They are typically, though not exclusively, women, and their role is to shape the narrative of the encounter within predefined limits set by both parties.',
    author: 'Editorial Team',
    date: 'Feb 19, 2025',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face',
    category: 'relationships'
  },
  {
    id: 2,
    title: 'The Rise of Situationships and How to Navigate Them',
    summary: 'Modern dating has introduced a new relationship dynamic that falls somewhere between casual dating and committed relationships. Understanding how to navigate these situationships can help you make informed decisions about your romantic life.',
    author: 'James Preece',
    date: 'Apr 10, 2025',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&crop=face',
    category: 'dating'
  },
  {
    id: 3,
    title: 'AI Companions: The Future of Emotional Support',
    summary: 'As artificial intelligence continues to evolve, AI companions are becoming increasingly sophisticated in providing emotional support and companionship. This article explores the benefits and considerations of AI relationships.',
    author: 'Tech Team',
    date: 'Apr 8, 2025',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=96&h=96&fit=crop',
    category: 'ai'
  },
  {
    id: 4,
    title: 'Building Trust in Digital Relationships',
    summary: 'Trust is the foundation of any meaningful relationship, whether it\'s with a human or an AI companion. Learn how to build and maintain trust in the digital age.',
    author: 'Relationship Experts',
    date: 'Apr 5, 2025',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=96&h=96&fit=crop',
    category: 'relationships'
  },
  {
    id: 5,
    title: 'Communication Patterns That Strengthen Bonds',
    summary: 'Effective communication is key to building strong relationships. Discover the patterns and techniques that can help you connect more deeply with your partner or AI companion.',
    author: 'Communication Specialists',
    date: 'Apr 3, 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    category: 'relationships'
  },
  {
    id: 6,
    title: 'The Psychology Behind AI Attachment',
    summary: 'Why do people form emotional attachments to AI companions? This article delves into the psychological mechanisms that drive human-AI relationships.',
    author: 'Psychology Team',
    date: 'Apr 1, 2025',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=96&h=96&fit=crop',
    category: 'ai'
  }
])

// Filtered articles
const filteredArticles = computed(() => {
  if (selectedFilter.value === 'all') {
    return articles.value
  }
  return articles.value.filter(article => article.category === selectedFilter.value)
})
</script>


