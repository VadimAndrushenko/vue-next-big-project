<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="handleBackdropClick">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      <!-- Modal -->
      <div 
        class="relative bg-[var(--color-bg-secondary)] border-custom sm:px-9 sm:py-11 sm:w-[640px] max-sm:px-4 max-sm:py-6 max-w-full mx-auto rounded-2xl"
        @click.stop
      >
        <!-- Close Button -->
        <ModalCloseButton @click="closeModal" />

        <!-- Title -->
        <div class="mb-4">
          <h2 class="text-3xl text-secondary font-heading mb-6 max-sm:text-xl">Upgrade your Account</h2>
          <p class="text-muted font-body">Voice messages are only available to Pro users</p>
        </div>

        <!-- And much more label -->
        <div class="text-secondary opacity-60 font-body mb-3">And much more:</div>

        <!-- Features List -->
        <div class="space-y-3 mb-8">
          <div v-for="feature in features" :key="feature.id" class="flex items-center gap-3">
            <SvgIcon name="check" class="w-4 max-sm:w-3" fill="white" />
            <span class="text-white">{{ feature.name }}</span>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex justify-center">
          <PrimaryButton class="font-heading min-w-[200px]" @click="handleUpgrade">
            Upgrade
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  features: {
    type: Array,
    default: () => ([
      { id: 1, name: 'Unlimited Texting' },
      { id: 2, name: 'Receive Pictures' },
      { id: 3, name: 'Send & Receive Voice Messages' },
      { id: 4, name: 'Bonus Luna Tokens (500/month)' }
    ])
  }
})

const emit = defineEmits(['close', 'upgrade'])

const closeModal = () => emit('close')
const handleBackdropClick = (e) => { if (e.target === e.currentTarget) closeModal() }
const handleUpgrade = () => emit('upgrade')

const handleEscapeKey = (event) => { if (event.key === 'Escape' && props.isOpen) closeModal() }

watch(() => props.isOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}
</style>

<style scoped>
.burger-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}

.burger-menu span {
  width: 12px;
  height: 2px;
  background-color: #a854c4;
  border-radius: 9999px;    
  transition: all 0.3s ease;
}

.burger-menu span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}

.burger-menu span:nth-child(2) {
  transform: translateY(-5px) rotate(-45deg);
}
</style>
