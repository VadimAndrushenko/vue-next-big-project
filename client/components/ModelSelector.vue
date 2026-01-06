<template>
  <!-- Model Selector -->
  <div class="px-8 md:max-2xl:px-5">
    <div 
      ref="containerRef"
      @click="showMenuStep"
      @mouseleave="handleMouseLeave"
      class="selector-container"
      :style="{ height: containerHeight + 'px' }"
    >
      <transition 
        name="content-fade" 
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <!-- Step 0: Current Selection Display -->
        <div 
          v-if="menuStep === 0"
          :key="'selection'"
          class="selector-display px-4 py-[14px] md:max-2xl:p-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="icon-wrapper">
                <SvgIcon name="Girlfriend" :fill="while" :size="20" class="text-pink-400" />
              </div>
              <div>
                <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  <span class="md:max-2xl:hidden">Your Selection</span>
                </div>
                <div class="text-sm font-semibold gradient-text">
                  <span class="md:max-2xl:hidden">{{ currentSelectionLabel }}</span>
                </div>
              </div>
            </div>
            <SvgIcon name="chevron-down" :size="18" class="text-gray-500 md:max-2xl:hidden" />
          </div>
        </div>

        <!-- Step 1: Gender Selection -->
        <div 
          v-else-if="menuStep === 1"
          :key="'gender'"
          class="selector-menu"
        >
          <div class="menu-header text-center">
            <span>Choose Gender</span>
          </div>
          <div class="button-grid">
            <button
              v-for="gender in genderOptions"
              :key="gender.id"
              @click="handleGenderSelect(gender.id)"
              :class="[
                'selector-button',
                selectedGender === gender.id ? 'active' : ''
              ]"
            >
              <SvgIcon :name="gender.icon" :size="22" />
              <span>{{ gender.name }}</span>
            </button>
          </div>
        </div>

        <!-- Step 2: Style Selection -->
        <div 
          v-else-if="menuStep === 2"
          :key="'style'"
          class="selector-menu"
        >
          <div class="menu-header text-center">
            <span>Choose Style</span>
          </div>
          <div class="button-grid">
            <button
              v-for="style in styleOptions"
              :key="style.id"
              @click="handleStyleSelect(style.id)"
              :class="[
                'selector-button',
                selectedStyle === style.id ? 'active' : ''
              ]"
            >
              <SvgIcon :name="style.icon" :size="22" />
              <span>{{ style.name }}</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// Get current route to read query parameters
const route = useRoute()

// Initialize state from query parameters immediately
const initGender = () => {
  if (route.query.gender) {
    const validGenders = ['female', 'male']
    if (validGenders.includes(route.query.gender)) {
      return route.query.gender
    }
  }
  return 'female'
}

const initStyle = () => {
  if (route.query.style) {
    const validStyles = ['natural', '3d', 'fantasy', 'anime']
    if (validStyles.includes(route.query.style)) {
      return route.query.style
    }
  }
  return 'natural'
}

// Gender and Style selectors state (initialized from query params)
const selectedGender = ref(initGender())
const selectedStyle = ref(initStyle())

// Menu step state (0: closed, 1: gender, 2: style)
const menuStep = ref(0)

// Flag to prevent closing during transitions
const isTransitioning = ref(false)

// Flag to track if selection is complete
const selectionComplete = ref(false)

// Timeout for mouse leave delay
let mouseLeaveTimeout = null

// Container ref and height
const containerRef = ref(null)
const containerHeight = ref('auto')

// Gender options
const genderOptions = [
  { id: 'female', name: 'Female', icon: 'female' },
  { id: 'male', name: 'Male', icon: 'male' }
]

// Style options
const styleOptions = [
  { id: 'natural', name: 'Natural', icon: 'natural' },
  { id: '3d', name: '3D', icon: '3d' },
  { id: 'fantasy', name: 'Fantasy', icon: 'fantasy' },
  { id: 'anime', name: 'Anime', icon: 'anime' }
]

// Computed label for current selection
const currentSelectionLabel = computed(() => {
  const gender = genderOptions.find(g => g.id === selectedGender.value)
  const style = styleOptions.find(s => s.id === selectedStyle.value)
  return `${gender?.name || 'Female'} ${style?.name || 'Natural'}`
})

// Handle gender selection
const handleGenderSelect = (genderId) => {
  selectedGender.value = genderId
  isTransitioning.value = true
  // Directly go to step 2 (style selection)
  menuStep.value = 2
  // Clear transitioning flag after animation
  setTimeout(() => {
    isTransitioning.value = false
  }, 350)
}

// Handle style selection
const handleStyleSelect = (styleId) => {
  selectedStyle.value = styleId
  // Mark selection as complete
  selectionComplete.value = true
  // Show updated selection (step 0)
  menuStep.value = 0
  
  // Navigate to home with filters
  const query = {}
  if (selectedGender.value) query.gender = selectedGender.value
  if (selectedStyle.value) query.style = selectedStyle.value
  navigateTo({ path: '/', query })
}

// Keep menu open when hovering
const keepMenuOpen = () => {
  // Clear any pending mouse leave timeout
  if (mouseLeaveTimeout) {
    clearTimeout(mouseLeaveTimeout)
    mouseLeaveTimeout = null
  }
}

// Show menu on hover
const showMenuStep = () => {
  // Don't show menu if selection is complete
  if (selectionComplete.value) {
    return
  }
  
  // Clear any pending mouse leave timeout
  if (mouseLeaveTimeout) {
    clearTimeout(mouseLeaveTimeout)
    mouseLeaveTimeout = null
  }
  
  if (menuStep.value === 0) {
    menuStep.value = 1
  }
}

// Handle mouse leave
const handleMouseLeave = () => {
  // Clear any existing timeout
  if (mouseLeaveTimeout) {
    clearTimeout(mouseLeaveTimeout)
  }
  
  // Don't close if transitioning between menus
  if (isTransitioning.value) {
    return
  }
  
  // Set timeout for 300ms delay
  mouseLeaveTimeout = setTimeout(() => {
    menuStep.value = 0
    // Reset selection complete flag to allow menu to show again
    selectionComplete.value = false
    mouseLeaveTimeout = null
  }, 300)
}

// Transition hooks for smooth height animation
const beforeEnter = (el) => {
  // Measure the incoming element's height
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.display = 'block'
}

const enter = async (el, done) => {
  // Get the height of the new content
  await nextTick()
  const newHeight = el.scrollHeight
  
  // Reset styles
  el.style.position = ''
  el.style.visibility = ''
  el.style.display = ''
  
  // Set the container height to animate
  containerHeight.value = newHeight
  
  done()
}

const afterEnter = () => {
  // Animation complete
}

// Set initial container height on mount
onMounted(() => {
  // Set initial container height
  if (containerRef.value) {
    containerHeight.value = containerRef.value.scrollHeight
  }
})
</script>

<style scoped>
/* Container */
.selector-container {
  position: relative;
  width: 100%;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Content fade transitions */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.6, 1);
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.content-fade-enter-to,
.content-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Selection Display (Step 0) */
.selector-display {
  background: linear-gradient(135deg, rgba(217, 19, 108, 0.08) 0%, rgba(91, 84, 196, 0.08) 100%);
  border: 1px solid rgba(217, 19, 108, 0.2);
  border-radius: 12px;
  /* padding: 14px 16px; */
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.selector-display:hover {
  border-color: rgba(217, 19, 108, 0.4);
  background: linear-gradient(135deg, rgba(217, 19, 108, 0.12) 0%, rgba(91, 84, 196, 0.12) 100%);
  box-shadow: 0 4px 20px rgba(217, 19, 108, 0.15);
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(217, 19, 108, 0.15) 0%, rgba(91, 84, 196, 0.15) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(217, 19, 108, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #D946EF 0%, #6366F1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Menu Display (Steps 1 & 2) */
.selector-menu {
  width: 100%;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9CA3AF;
  margin-bottom: 12px;
  font-weight: 600;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

/* Selector Buttons */
.selector-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #9CA3AF;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.selector-button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(217, 19, 108, 0.15) 0%, rgba(91, 84, 196, 0.15) 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: -1;
}

.selector-button:hover {
  border-color: rgba(217, 19, 108, 0.3);
  color: #FFFFFF;
  transform: translateY(-1px);
}

.selector-button:hover::before {
  opacity: 1;
}

.selector-button.active {
  border-color: rgba(217, 19, 108, 0.5);
  color: #FFFFFF;
  background: linear-gradient(135deg, rgba(217, 19, 108, 0.2) 0%, rgba(91, 84, 196, 0.2) 100%);
  box-shadow: 0 0 20px rgba(217, 19, 108, 0.3), inset 0 0 20px rgba(217, 19, 108, 0.1);
}

.selector-button.active::before {
  opacity: 0.5;
}
</style>

