<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-8 max-sm:px-4 max-md:pt-9 max-sm:text-sm">
      
        <!-- Article Header -->
        <div class="mb-8">
          <h1 class="text-[40px] max-xl:text-center text-white mb-6 max-sm:text-2xl">{{ article.title }}</h1>
          <!-- Author Block -->
          <div class="flex items-center space-x-3 mb-6">
            <img 
              :src="article.authorImage" 
              :alt="article.author"
              class="w-[60px] rounded-full object-cover max-sm:w-11"
            >
            <div>
              <div class="text-white font-medium mb-1">{{ article.author }}</div>
              <div class="text-white/60 text-sm">{{ article.date }} - {{ article.readTime }}</div>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div class="prose prose-invert max-w-none mb-[60px]">
          <div v-for="(section, index) in article.content" :key="index" class="mb-6">
            <h2 v-if="section.type === 'subheading'" class="text-[28px] font-semibold text-white mb-4 max-sm:text-xl">
              {{ section.text }}
            </h2>
            <p v-else-if="section.type === 'paragraph'" class="leading-[22px] mb-4 ">
              {{ section.text }}
            </p>
            <ul v-else-if="section.type === 'list'" class="space-y-2 mb-6">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="relative pl-5">
                <span class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#A854C4]"></span>
                {{ item }}
              </li>
            </ul>

            
            
            <div v-else-if="section.type === 'image'" class="my-8">

              <h2 class="text-[28px] font-semibold text-white mb-4 max-sm:text-xl">
                How to tell if you are in a Situationship
              </h2>

              <p class="leading-[22px] mb-4 ">
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
              </p>

              <img 
                :src="article.authorImage" 
                :alt="section.alt"
                class="w-full rounded-3xl"
              >
              <p class="opacity-60 text-sm mt-2 mb-6">
                {{ section.caption }}
              </p>

              <div class="bg-[var(--color-bg-secondary)] rounded-3xl border border-[#3A2B41] sm:p-6 max-sm:p-4"> 
                <p class="text-xl leading-relaxed max-sm:text-sm">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,</p>
              </div>

            </div>
          </div>
        </div>

        <!-- Related Posts -->
        <div class="max-md:hidden">
          <div class="grid grid-cols-3 gap-6">
            <NuxtLink 
              :to="`/news/${relatedPost.id}`"
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.id"
              class="block overflow-hidden transition-all"
            >
              <img 
                :src="relatedPost.image" 
                :alt="relatedPost.title"
                class="w-full object-cover rounded-2xl "
              >
              <div class="pt-4">
                <h3 class="text-lg font-semibold text-white mb-2">{{ relatedPost.title }}</h3>
                <p class="text-white/70 text-sm mb-3">{{ relatedPost.summary }}</p>
                <div class="text-white/60 text-xs">
                  {{ relatedPost.date }} - {{ relatedPost.readTime }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'headless',
  headerTitle: 'News'
})

// Get route params (reactive)
const route = useRoute()
const articleId = computed(() => route.params.articleId)

// Articles data mapping (in real app, this would be fetched from API)
const articlesData = {
  1: {
    id: 1,
    title: 'How to Be Dominant in Bed: Complete Guide',
    author: 'Editorial Team',
    authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face',
    date: 'Feb 19, 2025',
    readTime: '4 min read',
    content: [
      { type: 'paragraph', text: 'To be dominant in bed is not an adjective so much as it is a lifestyle. Doms exist in the wider umbrella of BDSM behavior. They are typically, though not exclusively, women, and their role is to shape the narrative of the encounter within predefined limits set by both parties.' },
      { type: 'subheading', text: 'Understanding Dominance' },
      { type: 'paragraph', text: 'Dominance in the bedroom is about confidence, communication, and consent. It\'s not about being aggressive or controlling in a negative way, but rather about taking the lead in a mutually satisfying experience.' },
      { type: 'list', items: [
        'Establish clear boundaries and safe words',
        'Communicate openly about desires and limits',
        'Build trust through consistent behavior',
        'Focus on your partner\'s pleasure and comfort'
      ]}
    ]
  },
  2: {
    id: 2,
    title: 'The Rise of Situationships and How to Navigate Them',
    author: 'James Preece',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
    date: 'Apr 10, 2025',
    readTime: '4 min read',
    content: [
      { type: 'paragraph', text: 'Modern dating has introduced a new relationship dynamic that falls somewhere between casual dating and committed relationships. Understanding how to navigate these situationships can help you make informed decisions about your romantic life.' },
      { type: 'subheading', text: 'How to tell if you are in a Situationship' },
      { type: 'paragraph', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      { type: 'list', items: [
        'There\'s never any conversations about where the relationship is heading',
        'You only see each other when it\'s convenient',
        'Future plans are always vague and undefined',
        'You feel uncertain about introducing them to friends and family'
      ]},
      { type: 'image', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop', alt: 'Woman looking thoughtful', caption: 'Discript' },
    ]
  },
  3: {
    id: 3,
    title: 'AI Companions: The Future of Emotional Support',
    author: 'Tech Team',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
    date: 'Apr 8, 2025',
    readTime: '5 min read',
    content: [
      { type: 'subheading', text: 'Understanding AI Companions' },
      { type: 'paragraph', text: 'As artificial intelligence continues to evolve, AI companions are becoming increasingly sophisticated in providing emotional support and companionship. This article explores the benefits and considerations of AI relationships.' }
    ]
  },
  4: {
    id: 4,
    title: 'Building Trust in Digital Relationships',
    author: 'Relationship Experts',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
    date: 'Apr 5, 2025',
    readTime: '4 min read',
    content: [
      { type: 'subheading', text: 'Foundations of Trust' },
      { type: 'paragraph', text: 'Trust is the foundation of any meaningful relationship, whether it\'s with a human or an AI companion. Learn how to build and maintain trust in the digital age.' }
    ]
  },
  5: {
    id: 5,
    title: 'Communication Patterns That Strengthen Bonds',
    author: 'Communication Specialists',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
    date: 'Apr 3, 2025',
    readTime: '3 min read',
    content: [
      { type: 'subheading', text: 'Communicating Effectively' },
      { type: 'paragraph', text: 'Effective communication is key to building strong relationships. Discover the patterns and techniques that can help you connect more deeply with your partner or AI companion.' }
    ]
  },
  6: {
    id: 6,
    title: 'The Psychology Behind AI Attachment',
    author: 'Psychology Team',
    authorImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=48&h=48&fit=crop&crop=face',
    date: 'Apr 1, 2025',
    readTime: '6 min read',
    content: [
      { type: 'subheading', text: 'Why We Attach' },
      { type: 'paragraph', text: 'Why do people form emotional attachments to AI companions? This article delves into the psychological mechanisms that drive human-AI relationships.' }
    ]
  }
}

// Get article data based on ID
const article = computed(() => {
  const id = Number(articleId.value)
  return articlesData[id] || {
    title: 'Article Not Found',
    author: 'Unknown',
    authorImage: '',
    date: '',
    readTime: '',
    content: [
      { type: 'paragraph', text: 'The article you are looking for could not be found.' }
    ]
  }
})

// Related posts data
const relatedPosts = ref([
  { id: 1, title: 'How to Be Dominant in Bed: Complete Guide', summary: 'There\'s never any conversations about where the relationship is heading...', date: 'Apr 10, 2025', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop' },
  { id: 2, title: 'The Rise of Situationships and How to Navigate Them', summary: 'Modern dating has introduced a new relationship dynamic...', date: 'Apr 5, 2025', readTime: '3 min read', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop' },
  { id: 3, title: 'AI Companions: The Future of Emotional Support', summary: 'As artificial intelligence continues to evolve...', date: 'Apr 3, 2025', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face' }
])

// Set page title (reactive to article changes)
useHead(() => ({
  title: `${article.value.title} - GODDASS.AI`,
  meta: [
    { name: 'description', content: 'Read the latest article on GODDASS.AI' }
  ]
}))
</script>


