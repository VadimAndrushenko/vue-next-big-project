<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Empty State when no active chat -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center p-8">
    <div class="text-center max-w-2xl">
      <h1 class="text-2xl md:text-3xl font-bold text-white mb-16">
        You don't have any active chats yet. Select a model to get started.
      </h1>
      <PrimaryButton class="justify-center w-1/2 mb-32" @click="navigateTo('/')">Choose your model</PrimaryButton>
    </div>
  </div>
  
  <!-- Interactive Chat -->
  <div v-else class="lg:min-h-screen max-w-[1920px] flex flex-col px-5 lg:py-4 mx-auto max-sm:px-4 max-lg:container max-xl:min-h-[calc(100vh-95px)] max-lg:pb-0 max-md:py-4">
    <div class="flex-1 flex flex-col lg:flex-row gap-5 min-h-0 max-h-[1024px]">
      <!-- Media Stage -->
      <section
        ref="mediaSectionRef"
        class="relative flex-1 border border-white/10 rounded-3xl overflow-y-scroll bg-transparent max-lg:min-h-[calc(100vh-33px)] max-md:min-h-[calc(100vh-100px)]"
      >
        <TransitionGroup name="slide-fade">
          <img
            v-for="(image, index) in modelImages"
            :key="index"
            v-show="index === currentImageIndex"
            :src="image"
            :alt="selectedCharacter?.name"
            :class="[
              'absolute w-full h-auto rounded-3xl ',
              IsMiniHeight ? '' : 'lg:max-xl:h-full lg:max-xl:object-cover'
            ]"
            loading="lazy"
            :ref="el => imageRefs[index] = el"
            @load="updateMinHeight"
          />
        </TransitionGroup>
        
        <!-- Navigation Arrows -->
        <div class="sticky top-1/2 -translate-y-1/2 left-0 w-full h-0">
        <button 
          @click="previousImage" 
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          aria-label="Previous image"
        >
          ←
        </button>
        <button 
          @click="nextImage" 
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          aria-label="Next image"
        >
          →
        </button>
        
        </div>
        <!-- Image Indicators -->
        <div class="sticky top-[97%] left-0 w-full h-0">
        <div class="absolute  left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(image, index) in modelImages"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            ]"
            :aria-label="`Go to image ${index + 1}`"
          />
        </div>
        </div>
      </section>

      <!-- Chat Panel -->
      <aside class=" w-full lg:w-[440px] xl:w-[480px] bg-[var(--color-bg-secondary)] border border-white/10 rounded-3xl flex flex-col max-lg:min-h-[640px] max-h-[calc(100vh-2rem)]">
        <!-- Chat Header -->
        <div class="p-4 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img :src="avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
              <span class="absolute -right-0 -bottom-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--color-bg-secondary)]"></span>
            </div>
            <div>
              <div class="text-white font-medium">{{ selectedCharacter?.name || 'Character' }}</div>
              <div class="text-white/60 text-sm">In love</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-lg hover:bg-white/10" aria-label="Favorite">❤️</button>
            <button class="p-2 rounded-lg hover:bg-white/10" aria-label="Clear" @click="clearChat">🗑️</button>
            <button class="p-2 rounded-lg hover:bg-white/10" aria-label="More">⋯</button>
          </div>
        </div>

        <!-- Messages area -->
        <div ref="scrollAreaRef" class=" flex-1 overflow-x-none overflow-y-auto h-full max-h-screen p-4 space-y-4">
          <!-- System Card -->
          <div class="rounded-2xl p-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 text-white/80">
            On a sultry summer's night, {{ selectedCharacter?.name || 'your companion' }} invites you to her favorite luxury spa.
          </div>

          <!-- Chat Messages -->
          <ChatMessage v-for="m in messages" :key="m.id" :message="m" :avatar="avatar" />
          <TypingIndicator v-if="isTyping" />
        </div>

        <!-- Composer -->
        <div class="p-4 border-t border-white/10">
          <MessageInput
            v-model="draft"
            :disabled="sending"
            placeholder="Type your message..."
            @send="handleSend"
          />
          <div class="flex justify-end mt-3">
            
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useChat } from '@/composables/useChat'
import PrimaryButton from '@/components/PrimaryButton.vue'

// Get route parameters
const route = useRoute()
const characterId = route.query.id

// Chat state via shared composable
const { messages, loading, error, isTyping, initialize, send, clear } = useChat()
const selectedCharacter = ref(null)
const draft = ref('')
const sending = ref(false)
const scrollAreaRef = ref(null)
const avatar = '/logo.svg'

// Slideshow state
const modelImages = [
  '/images/character/1.png',
  '/images/character/2.png',
]
const currentImageIndex = ref(0)
let slideshowInterval = null

// Character data (mocked - in real app this would come from API)
const characterData = {
  id: 1,
  name: 'Catalina',
  age: 25,
  avatar: '👩',
  status: 'Online',
  biography: 'A shy and reserved girl who loves reading and coffee. She\'s a night owl and prefers quiet evenings with her cat.',
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop'
}

// Initialize character and start chat
const initializeChat = async () => {
  try {
    loading.value = true
    selectedCharacter.value = characterData
    await initialize(characterData)
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load character data'
    loading.value = false
    console.error('Error initializing chat:', err)
  }
}

// Scroll to bottom
const scrollToBottom = async () => {
  await nextTick()
  const el = scrollAreaRef.value
  if (el) el.scrollTop = el.scrollHeight
}

// Handle message send
const handleSend = async () => {
  const text = draft.value.trim()
  if (!text || !selectedCharacter.value) return
  
  draft.value = ''
  sending.value = true
  await send(text)
  sending.value = false
  scrollToBottom()
}

// Clear chat
const clearChat = () => {
  clear()
}

// Slideshow controls
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % modelImages.length
}

const previousImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + modelImages.length) % modelImages.length
}

const startSlideshow = () => {
  slideshowInterval = setInterval(() => {
    nextImage()
  }, 10000) // Change image every 10 seconds
}

const stopSlideshow = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
    slideshowInterval = null
  }
}

// Initialize chat on mount
onMounted(() => {
  if (characterId) {
    initializeChat()
  } else {
    error.value = 'No character selected'
    loading.value = false
  }
  
  // Start automatic slideshow
  startSlideshow()
})

// Cleanup on unmount
onBeforeUnmount(() => {
  stopSlideshow()
})

// Set page layout
definePageMeta({
  layout: 'headless'
})

const IsMiniHeight = ref(false)

const checkHeightMini = () => {
  IsMiniHeight.value = window.innerHeight <= 700
}

onMounted(() => {
  checkHeightMini()
  window.addEventListener('resize', checkHeightMini)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkHeightMini)
})

const mediaSectionRef = ref(null)
const imageRefs = ref([]) 

const updateMinHeight = async () => {
  await nextTick()
  const sectionEl = mediaSectionRef.value
  const img = imageRefs.value[currentImageIndex.value]

  if (!sectionEl || !img) return

  let imgHeight = img.getBoundingClientRect().height
  if ((!imgHeight || imgHeight === 0) && img.naturalWidth) {
    imgHeight = img.clientWidth * (img.naturalHeight / img.naturalWidth)
  }

  const hasVerticalScroll = sectionEl.scrollHeight > sectionEl.clientHeight + 1 
  if (!hasVerticalScroll && imgHeight) {
    sectionEl.style.minHeight = `${Math.ceil(imgHeight)}px`
  } else {
    sectionEl.style.minHeight = ''
  }
}

onMounted(() => {
  updateMinHeight()
  window.addEventListener('resize', updateMinHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMinHeight)
})

watch(currentImageIndex, () => {
  nextTick().then(updateMinHeight)
})

watch([() => messages.length, () => loading.value], () => {
  nextTick().then(updateMinHeight)
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: opacity 1.2s ease-in-out;
}

.slide-fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 0px;

}

</style>