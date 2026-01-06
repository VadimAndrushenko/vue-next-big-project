<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="handleBackdropClick">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal -->
      <div 
        class="relative bg-[var(--color-bg-secondary)] border-custom sm:px-9 sm:py-11 sm:w-[600px] max-sm:px-4 max-sm:py-6 max-w-full mx-auto"
        @click.stop
      >
        <!-- Close Button -->
        <ModalCloseButton @click="closeModal" />

        <!-- Auth Form -->
        <AuthForm
          :initial-mode="mode"
          :is-loading="isLoading"
          :inside-modal="true"
          @login="handleLogin"
          @register="handleRegister"
          @recover="handleRecover"
          @social-login="handleSocialLogin"
          @mode-change="handleModeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'login', // 'login' or 'register'
    validator: (value) => ['login', 'register'].includes(value)
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'login', 'register', 'recover', 'social-login'])

// State
const currentMode = ref(props.mode)

// Methods
const closeModal = () => {
  emit('close')
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

const handleLogin = (data) => {
  emit('login', data)
}

const handleRegister = (data) => {
  emit('register', data)
}

const handleRecover = (data) => {
  emit('recover', data)
}

const handleSocialLogin = (provider) => {
  emit('social-login', provider)
}

const handleModeChange = (newMode) => {
  currentMode.value = newMode
}

// Watch for prop changes
watch(() => props.mode, (newMode) => {
  currentMode.value = newMode
})

// Handle escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add/remove escape key listener
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
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

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
