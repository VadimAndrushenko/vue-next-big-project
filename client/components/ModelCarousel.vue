<template>
  <div class="slider-container">
    <!-- Left Arrow -->
    <div class="left-arrow left-0" @click="leftScroll" :class="{ 'disabled': isArrowLocked }">
      <span class="border border-[#3A2B41] w-[60px] aspect-square relative rounded-full bg-[var(--color-bg-secondary)] max-sm:w-9 hover:bg-[#ec489933] transition-colors">
        <span aria-hidden="true"
          class="pointer-events-none absolute left-[45%] top-1/2 -translate-y-1/2 w-3 aspect-square border-l-[3px] border-b-[3px] border-[#A854C4] rotate-45 max-sm:border-l-2 max-sm:border-b-2 max-sm:w-2" >
        </span>
      </span>
    </div>
    
    <!-- Slider Content -->
    <div class="slider-content" ref="sliderContent">
      <div 
        v-for="(model, index) in models" 
        :key="model.id"
        class="slide"
        :class="getSlideClass(index)"
        @click="handleCardClick(model)"
      >
        <div class="media">
          <img :src="model.image" :alt="model.name">
        </div>
        <div class="card-sections">
          <div class="lower-section">
            <h3 class="card-caption">
              {{ model.name }}
            </h3>
          </div>
        </div>
      </div>
      <div class="slider-content-background"></div>
    </div>
    
    <!-- Right Arrow -->
    <div class="right-arrow right-0" @click="rightScroll" :class="{ 'disabled': isArrowLocked }">
      <span class="border border-[#3A2B41] w-[60px] aspect-square relative rounded-full bg-[var(--color-bg-secondary)] max-sm:w-9 hover:bg-[#ec489933] transition-colors">
        <span aria-hidden="true"
          class="pointer-events-none absolute right-[45%] top-1/2 -translate-y-1/2 w-3 aspect-square border-t-[3px] border-r-[3px] border-[#A854C4] rotate-45 max-sm:border-t-2 max-sm:border-r-2 max-sm:w-2" >
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  models: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['card-click', 'toggle-favorite'])

// Slider state
const sliderContent = ref(null)
const center = ref(Math.floor(props.models.length / 2))
const leftEndBack = ref(center.value - 3 >= 0 ? center.value - 3 : undefined)
const leftEnd = ref(center.value - 2 >= 0 ? center.value - 2 : undefined)
const leftMid = ref(center.value - 1 >= 0 ? center.value - 1 : undefined)
const rightMid = ref(center.value + 1 < props.models.length ? center.value + 1 : undefined)
const rightEnd = ref(center.value + 2 < props.models.length ? center.value + 2 : undefined)
const rightEndBack = ref(center.value + 3 < props.models.length ? center.value + 3 : undefined)

// Touch/swipe variables
let touchStartX = 0
let touchEndX = 0

// Arrow lock mechanism
const isArrowLocked = ref(false)
const arrowLockDuration = 500 // Match the CSS transition duration

// Get slide class based on position
const getSlideClass = (index) => {
  if (leftEndBack.value !== undefined && index === leftEndBack.value) return 'position-none'
  if (leftEnd.value !== undefined && index === leftEnd.value) return 'position-1'
  if (leftMid.value !== undefined && index === leftMid.value) return 'position-2'
  if (center.value !== undefined && index === center.value) return 'position-3'
  if (rightMid.value !== undefined && index === rightMid.value) return 'position-4'
  if (rightEnd.value !== undefined && index === rightEnd.value) return 'position-5'
  if (rightEndBack.value !== undefined && index === rightEndBack.value) return 'position-none'
  return 'position-none'
}

// Left scroll function
const leftScroll = () => {
  if (isArrowLocked.value) return
  
  // Lock the arrows
  isArrowLocked.value = true
  
  if (leftEndBack.value !== undefined) {
    leftEndBack.value = leftEndBack.value - 1
    if (leftEndBack.value === -1) leftEndBack.value = props.models.length - 1
  }
  
  if (leftEnd.value !== undefined) {
    leftEnd.value = leftEnd.value - 1
    if (leftEnd.value === -1) leftEnd.value = props.models.length - 1
  }
  
  if (leftMid.value !== undefined) {
    leftMid.value = leftMid.value - 1
    if (leftMid.value === -1) leftMid.value = props.models.length - 1
  }
  
  if (center.value !== undefined) {
    center.value = center.value - 1
    if (center.value === -1) center.value = props.models.length - 1
  }
  
  if (rightMid.value !== undefined) {
    rightMid.value = rightMid.value - 1
    if (rightMid.value === -1) rightMid.value = props.models.length - 1
  }
  
  if (rightEnd.value !== undefined) {
    rightEnd.value = rightEnd.value - 1
    if (rightEnd.value === -1) rightEnd.value = props.models.length - 1
  }
  
  if (rightEndBack.value !== undefined) {
    rightEndBack.value = rightEndBack.value - 1
    if (rightEndBack.value === -1) rightEndBack.value = props.models.length - 1
  }
  
  // Unlock after animation duration
  setTimeout(() => {
    isArrowLocked.value = false
  }, arrowLockDuration)
}

// Right scroll function
const rightScroll = () => {
  if (isArrowLocked.value) return
  
  // Lock the arrows
  isArrowLocked.value = true
  
  if (leftEndBack.value !== undefined) {
    leftEndBack.value = leftEndBack.value + 1
    if (leftEndBack.value === props.models.length) leftEndBack.value = 0
  }
  
  if (leftEnd.value !== undefined) {
    leftEnd.value = leftEnd.value + 1
    if (leftEnd.value === props.models.length) leftEnd.value = 0
  }
  
  if (leftMid.value !== undefined) {
    leftMid.value = leftMid.value + 1
    if (leftMid.value === props.models.length) leftMid.value = 0
  }
  
  if (center.value !== undefined) {
    center.value = center.value + 1
    if (center.value === props.models.length) center.value = 0
  }
  
  if (rightMid.value !== undefined) {
    rightMid.value = rightMid.value + 1
    if (rightMid.value === props.models.length) rightMid.value = 0
  }
  
  if (rightEnd.value !== undefined) {
    rightEnd.value = rightEnd.value + 1
    if (rightEnd.value === props.models.length) rightEnd.value = 0
  }
  
  if (rightEndBack.value !== undefined) {
    rightEndBack.value = rightEndBack.value + 1
    if (rightEndBack.value === props.models.length) rightEndBack.value = 0
  }
  
  // Unlock after animation duration
  setTimeout(() => {
    isArrowLocked.value = false
  }, arrowLockDuration)
}

// Touch handlers
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX - touchEndX
  const threshold = 50
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      rightScroll() // Swipe left
    } else {
      leftScroll() // Swipe right
    }
  }
}

// Event handlers
const handleCardClick = (model) => {
  emit('card-click', model)
}

const toggleFavorite = (model) => {
  emit('toggle-favorite', model.id)
}

// Lifecycle
onMounted(() => {
  if (sliderContent.value) {
    sliderContent.value.addEventListener('touchstart', handleTouchStart)
    sliderContent.value.addEventListener('touchmove', handleTouchMove)
    sliderContent.value.addEventListener('touchend', handleTouchEnd)
  }
})

onUnmounted(() => {
  if (sliderContent.value) {
    sliderContent.value.removeEventListener('touchstart', handleTouchStart)
    sliderContent.value.removeEventListener('touchmove', handleTouchMove)
    sliderContent.value.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style scoped>
.slider-container {
  height: 35rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;
  margin: 2rem auto;
}



.left-arrow,
.right-arrow {
  position: absolute;
  height: 100%;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
}

.left-arrow.disabled,
.right-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.slider-content {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* overflow: hidden; */
  position: relative;
  perspective: 100px;
}

.slider-content-background {
  height: 100%;
  width: 102%;
  position: absolute;
  top: 0;
  left: -1%;
  background: linear-gradient(
    to left,
    transparent,
    transparent,
    transparent,
    transparent,
    transparent
  );
  z-index: 3;
}

.slider-content .slide {
  position: absolute;
  left: 50%;
  height: 31.2rem;  
  max-height: 520px;
  width: 18.2rem;
  min-width: 351px;
  border-radius: 25px;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, 0) rotateY(0deg) scale(1,1);
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out, left 0.5s ease-in-out,
    z-index 0s 0.25s ease-in-out, box-shadow 0.5s ease-in-out, filter 0.5s ease-in-out;
}

.slide.position-1 {
  left: 20% !important;
  z-index: 1 !important;
  transform: translate(-50%, 0) rotateY(-2deg) scale(0.8, 0.8) !important;
  opacity: 1 !important;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0.1) !important;
  filter: blur(5px);
}

.slide.position-2 {
  left: 35% !important;
  z-index: 2 !important;
  transform: translate(-50%, 0) rotateY(-1deg) scale(0.9, 0.9) !important;
  opacity: 1 !important;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0.3) !important;
  filter: blur(2px);
}

.slide.position-3 {
  left: 50% !important;
  z-index: 4 !important;
  transform: translate(-50%, 0) rotateY(0deg) scale(1, 1) !important;
  opacity: 1 !important;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0.5) !important;
  cursor: pointer;
  filter: blur(0px);
}

.slide.position-3:hover {
  box-shadow: 0px 0rem 1.8rem rgba(0, 0, 0, 0.7) !important;
  transform: translate(-50%, 0) rotateY(0deg) scale(1.05, 1.05) !important;
}

.slide.position-4 {
  left: 65% !important;
  z-index: 2 !important;
  transform: translate(-50%, 0) rotateY(1deg) scale(0.9, 0.9) !important;
  opacity: 1 !important;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0.3) !important;
  filter: blur(2px);
}

.slide.position-5 {
  left: 80% !important;
  z-index: 1 !important;
  transform: translate(-50%, 0) rotateY(2deg) scale(0.8, 0.8) !important;
  opacity: 1 !important;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0.1) !important;
  filter: blur(5px);
}

.slide.position-none {
  left: 50%;
  z-index: 0;
  transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7);
  opacity: 1;
  box-shadow: 0px 0.4rem 1.6rem rgba(0, 0, 0, 0);
}

.slider-container svg {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.slider-container .left-arrow:hover svg, 
.slider-container .right-arrow:hover svg {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
}



.slide > * {
  color: white;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.001em;
}

.card-caption {
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.media, .card-sections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
}

.media {
  display: flex;
  align-items: center;
  justify-content: center;
}

.media img {
  position: absolute;
  height: 100%;
  width: 100%;
}

.card-sections {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
}

.lower-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}





@media screen and (max-width: 620px) {
  .slide.position-1, .slide.position-5 {
    opacity: 0.5 !important;
  }
  .slide.position-2, .slide.position-4 {
    opacity: 0.95 !important;
  }
}

@media screen and (max-width: 445px) {
  .slide.position-1, .slide.position-5 {
    opacity: 0 !important;
  }
  .slide.position-2, .slide.position-4 {
    opacity: 0.5 !important;
  }
}

@media screen and (max-width: 415px) {
  .slide {
    opacity: 0 !important;
    box-shadow: none !important;
  }
  .slide.position-3 {
    box-shadow: none !important;
    opacity: 1 !important;
  }
  .slide.position-1, .slide.position-2 {
    left: -50% !important;
    transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7) !important;
  }
  .slide.position-4, .slide.position-5 {
    left: 150% !important;
    transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7) !important;
  }
}

@media (max-width: 370px) {
  .slider-content .slide {
    min-width: 312px;
    height: 454px;
  }
}
</style>
