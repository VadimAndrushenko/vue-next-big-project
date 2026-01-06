<template>
  <div 
    class="relative rounded-[24px] overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    @click="!isBlocked && $emit('click', character)"
  >
    <!-- Background Image -->
    <img 
      :src="character.image" 
      :alt="character.name"
      :class="[
        'w-full object-cover rounded-[24px] ',
        isBlocked ? 'blur-lg' : ''
      ]"
    />
    
    <!-- Badge and heard -->
    <div v-if="$route.name !== 'private'">
      <div 
        v-if="character.badge"
        class="absolute top-4 left-4 z-10 "
      >
        <div 
          class="px-2 py-[7px] rounded-full text-xs font-semibold uppercase text-white flex items-center gap-x-1 bg-[#1B04264D] backdrop-blur-sm border border-white/20"
        >
          <!-- Badge Icon -->
          <SvgIcon class="opacity-60" :name="character.badge === 'PREMIUM' ? 'premium' : 'lightning' " :size="24" fill="#FFFFFF" />
          <span class="leading-[22px] text-[16px]">{{ character.badge }}</span>
        </div>
      </div>
      
      <div @click.stop="isActive = !isActive" class="absolute transition top-4 right-4 z-20">
        <div 
          :class="[
            'w-9 transition aspect-square bg-[#FFFFFF4D] rounded-full flex items-center justify-center',
            isActive ? 'text-[#E02C7D]' : 'text-transparent'
          ]"
        > 
          <SvgIcon name="heart" size="24"/>
        </div>
      </div>

    </div>

    <div v-if="$route.name === 'private'">
      <div class="absolute flex gap-2 transition left-1/2 -translate-x-1/2 top-4 z-20">
        <div class="flex gap-x-1 px-2 pt-[5px] pb-[7px] rounded-full text-xs font-semibold uppercase text-white items-center bg-[#1b04264D] backdrop-blur-sm ">
          <SvgIcon name="camera" :size="24" class="opacity-60" />
          11
        </div>  
        <div class="flex gap-x-1 px-2 pt-[5px] pb-[7px] rounded-full text-xs font-semibold uppercase text-white items-center bg-[#1B04264D] backdrop-blur-sm ">
          <SvgIcon name="photo" :size="24" class="opacity-60" />
          01
        </div>  
      </div>
    </div>
    
    <!-- Bottom Info Block with Gradient Overlay -->
    <div class="absolute bottom-0 left-0 right-0 p-4 z-10 min-h-[30%] flex items-end">
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#11041dbb] via-[#11041da2] "></div>
      
      <!-- Content -->
      <div class="relative z-10 text-primary">

        <div v-if="isBlocked" class="flex items-center justify-between mb-2">          
          <div class="flex items-center space-x-2">
            <img src="/logo.svg" alt="GODDASS.AI" class="sm:w-[36px] max-sm:w-[24px]">
            <span class="text-white">300 coin</span>
          </div>
          <div>
            <span
             :class="[
              'new-badge px-2 py-1 rounded-full font-medium text-nowrap ',
            ]">
            New
            </span>
          </div>
        </div>

        <!-- Name -->
        <h3 v-if="$route.name !== 'private'" class="text-lg font-bold mb-1 truncate">
          {{ character.name }}
        </h3>

        <!-- Age -->
        <p v-if="$route.name !== 'private'" class="text-sm opacity-80 mb-2">
          {{ character.age }} years old
        </p>
        
        <!-- Bio -->
        <p class="text-sm font-normal leading-relaxed line-clamp-2">
          {{ character.bio }}
        </p>

        <PrimaryButton 
          v-if="isBlocked"
          class="mt-4"
        >
          Unlock
          <SvgIcon name="closed" :size="24"/>
        </PrimaryButton>
      </div>
    </div>
    
    <!-- Hover Overlay -->
    <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-[24px]"></div>
    <div v-if="isBlocked" class="absolute left-1/2 bottom-[53%] -translate-x-1/2 max-sm:bottom-[50%]">
      <SvgIcon name="closed" :size="120" class="min-[570px]:max-[1700px]:w-[100px]" />
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const isActive = ref(false)

// const route = useRoute()
// const isClose = ref(false)

// const isBlocked = computed(() => !isClose.value && route.name === 'private')

defineProps({
  character: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      age: 0,
      bio: '',
      image: '',
      badge: null, // 'NEW' or 'PREMIUM'
      isFavorite: false
    })
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click', 'toggle-favorite'])

</script>

<style scoped>
/* Custom line clamp for better text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply fade-in animation on mount */
.relative {
  animation: fadeIn 0.5s ease-out;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, opacity, background-color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
button:focus {
  outline: 2px solid rgba(250, 250, 250, 0.3);
  outline-offset: 2px;
}

/* Prevent text selection during interactions */
.relative {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.new-badge {
  position: relative;
  text-align: center;
  padding-block: 1px;
  padding-inline: 12px;
  border-radius: 9999px;
  background: transparent;
}

.new-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999px;
  padding: 1px;
  background: linear-gradient(180deg, #e02c7d 0%, #5b54c4 100%);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}
</style>

