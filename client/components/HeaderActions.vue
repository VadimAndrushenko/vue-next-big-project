<template>
  <!-- Actions -->
  <div class="flex items-center space-x-4">
    <!-- Balance Control (when authenticated) -->
    <div v-if="isAuthenticated" class="flex items-center">
      <!-- Balance Display -->
      <div class="flex items-center gap-md bg-overlay backdrop-blur-sm rounded-[30px] p-[5px] border border-secondary">
        <!-- Balance Icon -->
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/logo.svg" alt="GODDASS.AI" class="w-8 h-8" />
        </div>
        
        <!-- Balance Number -->
        <span class="text-secondary font-semibold text-xl font-body">{{ userBalance || 0 }}</span>
        
        <!-- Add Button -->
        <button 
          @click="handleAddBalance"
          class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-overlay-20 transition-colors"
          aria-label="Add balance"
        >
          <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Auth Buttons (when not authenticated) -->
    <div v-else class="flex items-center space-x-4 max-sm:space-x-2">
      <NuxtLink to="/auth">
        <DefaultButton class="">Login</DefaultButton>
      </NuxtLink>
      <NuxtLink to="/auth?tab=signup">
        <DefaultButton>Sign Up</DefaultButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
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
