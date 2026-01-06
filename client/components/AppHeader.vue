<template>
  <header class="sticky top-0 z-40">
    <div class="xl:max-w-7xl mx-auto px-8 max-sm:px-4 max-xl:container ">
      <div class="flex items-center justify-end pt-2">
        <!-- Left Side: Title -->
        <!-- <div class="flex items-center">
          <div v-if="headerTitle" class="flex flex-col">
            <h1 class="text-3xl font-medium text-white">{{ headerTitle }}</h1>
            <p v-if="headerSubtitle" class="text-white/70">{{ headerSubtitle }}</p>
          </div>
        </div> -->

        <!-- Actions -->
        <div class="">
          <HeaderActions/>
        </div>
        
      
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  navigation: {
    type: Object,
    default: () => ({})
  },
  hideNav: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
})
const route = useRoute()
const headerTitle = computed(() => props.title || route.meta?.headerTitle || '')
const headerSubtitle = computed(() => props.subtitle || route.meta?.headerSubtitle || '')

// Access injected properties from the auth plugin with fallbacks
const nuxtApp = useNuxtApp()
const isAuthenticated = computed(() => nuxtApp.$isAuthenticated?.value || false)
const auth = computed(() => nuxtApp.$auth || null)

// User balance (you can connect this to your actual balance system)
const userBalance = ref(0)

// Handle logout
const handleLogout = async () => {
  try {
    await auth.logout()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Handle add balance
const handleAddBalance = () => {
  // Navigate to buy-tokens page
  navigateTo('/buy-tokens')
}
</script>