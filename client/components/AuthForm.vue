<template>
  <div class="auth-form-container">
    <!-- Logo -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-secondary mb-6 font-heading">
        <NuxtLink to="/" class="hover:opacity-80 transition-opacity inline-block">
          <img src="/full-logo.svg" alt="GODDASS.AI" class="inline" />
        </NuxtLink>
      </h2>
      
      <div v-if="!isRecoveryMode">
        <p class="text-muted font-body text-[28px] mb-4">
          {{ isLoginMode ? 'Sign in to your account' : 'Create your account' }}
        </p>
        <div class="text-xl mb-6">
          Already a member? 
          <button @click="toggleMode" class="text-[#A854C4]">
            {{ isLoginMode ? 'Register' : 'Log in' }}
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-muted font-body text-[28px] mb-4">Reset your password</p>
        <div class="text-xl mb-6">
          <template v-if="insideModal">
            Already know? <button type="button" @click="switchMode('login')" class="text-[#A854C4]">Login here</button>
          </template>
          <template v-else>
            Already know? <NuxtLink to="/auth?tab=signup" class="text-[#A854C4]">Login here</NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <!-- Login Form -->
    <form v-if="isLoginMode" class="" @submit.prevent="handleLogin">
      <!-- Email -->
      <div class="mb-6">
        <label for="login-email" class="block text-sm font-medium text-gray-400 mb-2 font-body">
          Email address
        </label>
        <input
          id="login-email"
          v-model="loginForm.email"
          type="email"
          required
          class="w-full p-4 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Enter your email"
        />
      </div>
      
      <!-- Password -->
      <div class="mb-9 relative">
        <label for="login-password" class="block text-sm font-medium text-gray-400 mb-2 font-body">
          Password
        </label>
        <input
          id="login-password"
          v-model="loginForm.password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="w-full mb-3 p-4 pr-12 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Enter your password"
        />

        <button 
          type="button" 
          @click="showPassword = !showPassword" 
          class="absolute right-[3%] top-[37%] opacity-60 transition hover:opacity-100"
        >
          <SvgIcon
            name="password"
            :size="24"
            fill="currentColor"
          />
        </button>

        <!-- Forgot your password -->
        <template v-if="insideModal">
          <button type="button" @click="switchMode('password-recovery')" class="font-medium text-[#A854C4] font-body">
            Forgot your password?
          </button>
        </template>
        <template v-else>
          <a href="/auth?tab=password-recovery" class="font-medium text-[#A854C4] font-body">
            Forgot your password?
          </a>
        </template>
      </div>
      
      <!-- Submit Button -->
      <div>
        <PrimaryButton
          type="submit"
          class="font-heading w-full"
          :loading="isLoading"
          full-width
        >
          Sign in to your account
        </PrimaryButton>
      </div>
    </form>

    <!-- Registration Form -->
    <form v-else-if="isRegisterMode" class="space-y-6" @submit.prevent="handleRegister">
      <!-- First Name -->
      <div>
        <label for="register-firstName" class="block text-sm font-medium text-secondary mb-2 font-body">
          First Name
        </label>
        <input
          id="register-firstName"
          v-model="registerForm.firstName"
          type="text"
          required
          class="w-full p-4 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Enter your first name"
        />
      </div>
      
      <!-- Email -->
      <div>
        <label for="register-email" class="block text-sm font-medium text-secondary mb-2 font-body">
          Email address
        </label>
        <input
          id="register-email"
          v-model="registerForm.email"
          type="email"
          required
          class="w-full p-4 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Enter your email"
        />
      </div>

      <!-- Password -->
      <div class="mb-3 relative">
        <label for="register-password" class="block text-sm font-medium text-secondary mb-2 font-body">
          Password
        </label>
        <input
          id="register-password"
          v-model="registerForm.password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="w-full mb-3 p-4 pr-12 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Create a password"
        />
        <button 
          type="button" 
          @click="showPassword = !showPassword" 
          class="absolute right-[3%] top-[45%] opacity-60 transition hover:opacity-100"
        >
          <SvgIcon
            name="password"
            :size="24"
            fill="currentColor"
          />
        </button>
      </div>
      
      <!-- Submit Button -->
      <div>
        <PrimaryButton
          type="submit"
          class="font-heading"
          :loading="isLoading"
          full-width
        >
          Create Account
        </PrimaryButton>
      </div>
    </form>

    <!-- Password Recovery Form -->
    <form v-else-if="isRecoveryMode" class="space-y-6" @submit.prevent="handleRecover">
      <!-- Email -->
      <div>
        <label for="recover-email" class="block text-sm font-medium text-secondary mb-2 font-body">
          Email address
        </label>
        <input
          id="recover-email"
          v-model="recoverForm.email"
          type="email"
          required
          class="w-full p-4 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
          placeholder="Enter your email"
        />
      </div>

      <!-- Submit Button -->
      <div>
        <PrimaryButton
          type="submit"
          class="font-heading"
          :loading="isLoading"
          full-width
        >
          Reset password
        </PrimaryButton>
      </div>

      <div class="mt-9 text-center">
        If you're having trouble with the form, please <a href="mailto:support@goddess.com" class="text-[#A854C4]">support@goddess.com</a> and our support team will manually reset your password
      </div>
    </form>
    
    <!-- Divider -->
    <div v-if="!isRecoveryMode" class="mt-6">
      <div class="relative">
        <div class="relative flex justify-center items-center text-sm">
          <span class="line flex-1"></span>
          <span class="px-3 bg-transparent text-muted font-body">Or continue with</span>
          <span class="inverted line flex-1"></span>
        </div>
      </div>
    </div>
    
    <!-- Social Login -->
    <div v-if="!isRecoveryMode" class="mt-6 flex items-center gap-x-[7px]">
      <button
        type="button"
        class="flex-1 inline-flex justify-center sm:py-[18px] border border-secondary rounded-xl shadow-sm bg-[var(--color-primary)] text-sm font-medium text-secondary hover:bg-overlay-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 font-body max-sm:py-[7px]"
        @click="handleSocialLogin('google')"
      >
        <SvgIcon name="google" class="sm:w-6 max-sm:w-4" fill="currentColor" />
        <span class="ml-2">Google</span>
      </button>
      
      <button
        type="button"
        class="flex-1 inline-flex justify-center py-[18px] border border-secondary rounded-xl shadow-sm bg-[var(--color-primary)] text-sm font-medium text-secondary hover:bg-overlay-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 font-body max-sm:py-[7px]"
        @click="handleSocialLogin('telegram')"
      >
        <SvgIcon name="telegram" class="sm:w-6 max-sm:w-4" fill="currentColor" />
        <span class="ml-2">Telegram</span>
      </button>

      <button
        type="button"
        class="flex-1 inline-flex justify-center py-[18px] border border-secondary rounded-xl shadow-sm bg-[var(--color-primary)] text-sm font-medium text-secondary hover:bg-overlay-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 font-body max-sm:py-[7px]"
        @click="handleSocialLogin('apple')"
      >
        <SvgIcon name="apple" class="sm:w-6 max-sm:w-4" fill="currentColor" />
        <span class="ml-2">Apple</span>
      </button>
    </div>

    <!-- Terms (only on signup) -->
    <div v-if="isRegisterMode" class="mt-9 text-center">
      By signing up, you confirm that you have read and accept the 
      <a href="/terms-of-service" class="text-[#A854C4]">Terms of Service</a> and 
      <a href="/privacy-policy" class="text-[#A854C4]">Privacy Policy.</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  initialMode: {
    type: String,
    default: 'login', // 'login' | 'register' | 'password-recovery'
    validator: (value) => ['login', 'register', 'password-recovery'].includes(value)
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  insideModal: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['login', 'register', 'recover', 'social-login', 'mode-change'])

// State
const currentMode = ref(props.initialMode)
const isLoginMode = computed(() => currentMode.value === 'login')
const isRegisterMode = computed(() => currentMode.value === 'register')
const isRecoveryMode = computed(() => currentMode.value === 'password-recovery')
const showPassword = ref(false)

// Form data
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const recoverForm = ref({
  email: ''
})

// Methods
const toggleMode = () => {
  // Toggle only between login and register
  currentMode.value = isLoginMode.value ? 'register' : 'login'
  emit('mode-change', currentMode.value)
}

const switchMode = (mode) => {
  if (['login', 'register', 'password-recovery'].includes(mode)) {
    currentMode.value = mode
    emit('mode-change', currentMode.value)
  }
}

const handleLogin = async () => {
  emit('login', {
    email: loginForm.value.email,
    password: loginForm.value.password,
    rememberMe: loginForm.value.rememberMe
  })
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  
  emit('register', {
    firstName: registerForm.value.firstName,
    lastName: registerForm.value.lastName,
    email: registerForm.value.email,
    password: registerForm.value.password,
    acceptTerms: registerForm.value.acceptTerms
  })
}

const handleRecover = async () => {
  emit('recover', {
    email: recoverForm.value.email
  })
}

const handleSocialLogin = (provider) => {
  emit('social-login', provider)
}

// Watch for prop changes
watch(() => props.initialMode, (newMode) => {
  currentMode.value = newMode
})
</script>

<style scoped>
.auth-form-container {
  width: 100%;
}

.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.line {
  height: 1px;
  border-radius: 9999px;  
  opacity: 0.3;
  background: linear-gradient(270deg, #946FA7 0%, transparent 100%);  
}

.line.inverted {
  background: linear-gradient(90deg, #946FA7 0%, transparent 100%);  
}
</style>
