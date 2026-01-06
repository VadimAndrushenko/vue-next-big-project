<template>
  <div>

    <div class="bg-[var(--color-bg-secondary)] border border-[#3A2B41] rounded-3xl px-11 py-[60px] max-md:px-7 max-sm:px-4 max-sm:py-7">
      <h2 class="text-[40px] font-medium text-secondary mb-9 font-heading max-md:text-3xl max-sm:text-2xl">Frequently <span class="bg-gradient-to-l from-[#E02C7D] to-[#5B54C4] bg-clip-text text-transparent">Asked Questions</span></h2>
      <div class="space-y-4">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="py-5 px-6 border border-[#3A2B41] rounded-2xl max-sm:p-3"
        >
          <button
            @click="toggleItem(index)"
            class="w-full text-left flex items-center justify-between"
          >
            <h3 class="flex-1 text-[28px] font-medium text-white pr-4 max-sm:text-lg max-lg:text-2xl max-md:text-[19px]">{{ item.question }}</h3>
            <span 
              :class="[
                'w-8 aspect-square bg-[var(--color-bg-primary)] inline-flex items-center justify-center rounded-full border border-[#3A2B41] text-white/70 transition-transform',
                openItems.includes(index) ? 'rotate-45' : ''
              ]"
            >
              <span class="text-[#A854C4]">+</span>
            </span>
          </button>
          <transition name="fade">
            <div v-show="openItems.includes(index)" class="pt-3 text-white/70 leading-relaxed">
              {{ item.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  faq: {
    type: Object,
    default: () => ({})
  }
})

const openItems = ref([])

// Use FAQ data from props or fallback to defaults
const faqItems = computed(() => {
  return props.faq?.items || [
    {
      question: "How does a virtual AI girlfriend work?",
      answer: "Our AI companions use advanced language models to create realistic conversations. They learn from your interactions and adapt their personality to match your preferences, creating a personalized experience that feels natural and engaging."
    },
    {
      question: "Can I customize my AI gf's appearance?",
      answer: "Yes! You can fully customize your AI companion's appearance, including hair color, style, clothing, and even personality traits. Our platform offers extensive customization options to create your perfect match."
    },
    {
      question: "Can I teach my AI girlfriend new things?",
      answer: "Absolutely! Your AI companion learns from every conversation. You can teach them about your interests, preferences, and even create shared memories that they'll remember in future interactions."
    },
    {
      question: "Can I have multiple AI girlfriends at once?",
      answer: "Yes, you can create and interact with multiple AI companions simultaneously. Each will have their own unique personality and conversation history, allowing you to explore different types of relationships."
    },
    {
      question: "Can she send pictures?",
      answer: "Premium users can receive personalized images from their AI companions. These images are generated based on your conversations and preferences, creating a more immersive experience."
    },
    {
      question: "Are my conversations private?",
      answer: "Your privacy is our top priority. All conversations are encrypted and stored securely. We never share your personal information or conversation content with third parties."
    }
  ]
})

const toggleItem = (index) => {
  const itemIndex = openItems.value.indexOf(index)
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1)
  } else {
    openItems.value.push(index)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
