<template>
  <div class=" min-h-screen flex items-center justify-center sm:py-12 px-4 sm:px-6 lg:px-8 max-sm:py-4 relative">
    <!-- Auth Form Container -->
    <div class="border-custom bg-[var(--color-bg-secondary)] sm:px-9 sm:py-11 sm:w-[600px] max-sm:px-4 max-sm:py-6">
      <!-- Use AuthForm Component -->
      <AuthForm
        :initial-mode="initialMode"
        :is-loading="isLoading"
        @login="handleLogin"
        @register="handleRegister"
        @recover="handleRecover"
        @social-login="handleSocialLogin"
        @mode-change="handleModeChange"
      />
    </div>
    <div class="nav-pill absolute h-[100px] w-full bottom-0 -z-10 max-md:hidden"></div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Get the route to access query parameters
const route = useRoute()

// State
const initialMode = ref('login')
const isLoading = ref(false)

// Set initial tab based on query parameter
onMounted(() => {
  if (route.query.tab === 'signup') {
    initialMode.value = 'register'
  } else if (route.query.tab === 'password-recovery') {
    initialMode.value = 'password-recovery'
  }
})

// Handle login form submission
const handleLogin = async (loginData) => {
  isLoading.value = true
  console.log('Login form submitted:', loginData)
  
  try {
    const { $auth } = useNuxtApp()
    
    if (!$auth) {
      console.error('Auth plugin not available')
      return
    }
    
    const result = await $auth.login({
      email: loginData.email,
      password: loginData.password,
      rememberMe: loginData.rememberMe
    })
    
    if (result.success) {
      console.log('Login successful:', result.user)
      // Redirect to home page or dashboard
      await navigateTo('/')
    } else {
      console.error('Login failed:', result.error)
      alert('Login failed: ' + result.error)
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle registration form submission
const handleRegister = async (registerData) => {
  isLoading.value = true
  console.log('Registration form submitted:', registerData)
  
  try {
    const { $auth } = useNuxtApp()
    
    if (!$auth) {
      console.error('Auth plugin not available')
      return
    }
    
    const result = await $auth.register({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password
    })
    
    if (result.success) {
      console.log('Registration successful:', result.user)
      // Redirect to home page or dashboard
      await navigateTo('/')
    } else {
      console.error('Registration failed:', result.error)
      alert('Registration failed: ' + result.error)
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registration failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle password recovery submission
const handleRecover = async (recoverData) => {
  isLoading.value = true
  console.log('Password recovery submitted:', recoverData)
  try {
    const { $auth } = useNuxtApp()
    if (!$auth) {
      console.error('Auth plugin not available')
      return
    }
    if ($auth.recoverPassword) {
      const result = await $auth.recoverPassword({ email: recoverData.email })
      if (result?.success) {
        alert('Check your email for password reset instructions.')
        await navigateTo('/auth')
      } else {
        alert('Could not start password recovery. Please try again.')
      }
    } else {
      // Fallback placeholder
      alert('Check your email for password reset instructions.')
      await navigateTo('/auth')
    }
  } catch (error) {
    console.error('Recovery error:', error)
    alert('Password recovery failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle social login
const handleSocialLogin = async (provider) => {
  isLoading.value = true
  console.log('Social login:', provider)
  
  try {
    const { $auth } = useNuxtApp()
    
    if (!$auth) {
      console.error('Auth plugin not available')
      return
    }
    
    const result = await $auth.socialLogin(provider)
    
    if (result.success) {
      console.log('Social login successful:', result.user)
      // Redirect to home page or dashboard
      await navigateTo('/')
    } else {
      console.error('Social login failed:', result.error)
      alert('Social login failed: ' + result.error)
    }
  } catch (error) {
    console.error('Social login error:', error)
    alert('Social login failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle mode change
const handleModeChange = (newMode) => {
  initialMode.value = newMode
}

// Set page layout
definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>
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

.nav-pill > * {
  position: relative;
  z-index: 10;
}

.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.4;
  border-radius: 8px;
  border: 1px solid transparent;
  background: 
    radial-gradient(circle at left 50% bottom 0, #E02C7D 70%, #5B54C4 90%, transparent 95%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(100px);
}
</style>