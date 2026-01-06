<template>
  <!-- Loading State -->
  <LoadingState v-if="loading" />
  
  <!-- Error State -->
  <ErrorState v-else-if="error" :error="error" />
  
  <!-- Content -->
  <div v-else>
    <!-- Main Content -->
    <div class="container mx-auto flex flex-col px-8 max-sm:px-4 max-md:pt-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 max-md:hidden">
        <h1 class="text-3xl font-medium text-white">Affiliate Program</h1>  

        <HeaderActions/>
      </div>

      <!-- Content -->
      <div class="space-y-6 flex flex-col flex-1 relative">
        <!-- Stats Overview -->
        <div class="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-pink-400 mb-2">$2,450</div>
            <div class="text-gray-400">Total Earnings</div>
          </div>
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-purple-400 mb-2">156</div>
            <div class="text-gray-400">Referrals</div>
          </div>
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-blue-400 mb-2">23%</div>
            <div class="text-gray-400">Conversion Rate</div>
          </div>
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-green-400 mb-2">$15.70</div>
            <div class="text-gray-400">Avg. Commission</div>
          </div>
        </div>

        <!-- Program Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- How It Works -->
            <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 max-sm:p-4">
              <h2 class="text-xl font-bold text-white mb-4">How It Works</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm ">1</div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white mb-1">Sign Up</h3>
                    <p class="text-gray-400">Create your affiliate account and get your unique referral link</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white mb-1">Share</h3>
                    <p class="text-gray-400">Share your link with your audience through social media, blogs, or videos</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white mb-1">Earn</h3>
                    <p class="text-gray-400">Earn 30% commission on every subscription from your referrals</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commission Structure -->
            <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 max-sm:p-4">
              <h2 class="text-xl font-bold text-white mb-4">Commission Structure</h2>
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 border-custom rounded-lg">
                  <div>
                    <h3 class="text-white font-semibold">Basic Plan</h3>
                    <p class="text-gray-400 text-sm">$9.99/month</p>
                  </div>
                  <div class="text-pink-400 font-bold">$3.00</div>
                </div>
                <div class="flex justify-between items-center p-3 border-custom rounded-lg">
                  <div>
                    <h3 class="text-white font-semibold">Premium Plan</h3>
                    <p class="text-gray-400 text-sm">$19.99/month</p>
                  </div>
                  <div class="text-pink-400 font-bold">$6.00</div>
                </div>
                <div class="flex justify-between items-center p-3 border-custom rounded-lg">
                  <div>
                    <h3 class="text-white font-semibold">Ultimate Plan</h3>
                    <p class="text-gray-400 text-sm">$39.99/month</p>
                  </div>
                  <div class="text-pink-400 font-bold">$12.00</div>
                </div>
              </div>
              <div class="mt-4 p-3 bg-pink-500/20 border-custom rounded-lg">
                <p class="text-pink-300 text-sm">
                  <strong>Note:</strong> Commissions are paid monthly for active subscriptions
                </p>
              </div>
            </div>
          </div>

          <!-- Marketing Materials -->
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 max-sm:p-4">
            <h2 class="text-2xl font-bold text-center text-white mb-6">Marketing Materials</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-2xl">🔗</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">Referral Link</h3>
                <p class="text-gray-400 text-sm mb-4">Your unique affiliate link to share</p>
                <div class="border-custom bg-[var(--color-bg-secondary)] rounded-lg p-3">
                  <code class="text-pink-300 text-sm break-all">https://goddass.ai/ref/your-unique-id</code>
                </div>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-2xl">🖼️</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">Banners</h3>
                <p class="text-gray-400 text-sm mb-4">High-quality promotional banners</p>
                <button class="nav-pill border-custom bg-[var(--color-bg-secondary)] px-4 py-2 rounded-lg text-sm hover:text-white transition-colors">
                  Download Banners
                </button>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-2xl">📝</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">Content</h3>
                <p class="text-gray-400 text-sm mb-4">Pre-written content and copy</p>
                <button class="nav-pill border-custom bg-[var(--color-bg-secondary)] px-4 py-2 rounded-lg text-sm hover:text-white transition-colors">
                  Get Content
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Referrals -->
          <div class="border-custom bg-[var(--color-bg-secondary)] backdrop-blur-sm rounded-xl p-6 max-sm:p-4">
            <h2 class="text-xl font-bold text-white mb-4">Recent Referrals</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between gap-x-5 p-4 border-custom rounded-lg max-sm:p-3">
                <div class="flex items-center sm:space-x-4 flex-1">
                  <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center max-sm:hidden">
                    <span class="text-white text-sm">JD</span>
                  </div>
                  <div class="flex-1 ">
                    <div class="flex items-center gap-x-2 max-sm:mb-2">
                      <div class="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center sm:hidden">
                        <span class="text-white text-sm">JD</span>
                      </div>
                      <h3 class="text-white font-semibold max-sm:text-sm">John Doe</h3>
                    </div>
                    <p class="text-gray-400 text-sm  max-sm:text-xs">Premium Plan - $19.99/month</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-pink-400 font-bold max-sm:text-sm">$6.00</div>
                  <div class="text-gray-400 text-sm max-sm:text-xs">2 days ago</div>
                </div>
              </div>
              <div class="flex items-center justify-between gap-x-5 p-4 border-custom rounded-lg max-sm:p-3">
                <div class="flex items-center sm:space-x-4">
                  <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center max-sm:hidden">
                    <span class="text-white text-sm">JS</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex gap-x-2 max-sm:mb-2 items-center">
                      <div class="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center sm:hidden">
                        <span class="text-white text-sm">JS</span>
                      </div>
                      <h3 class="text-white font-semibold max-sm:text-sm"> Jane Smith</h3>
                    </div>
                    <p class="text-gray-400 text-sm max-sm:text-xs">Basic Plan - $9.99/month</p>
                  </div>
                </div>
                <div class="text-right flex-1 max-w-">
                  <div class="text-pink-400 font-bold max-sm:text-sm">$3.00</div>
                  <div class="text-gray-400 text-sm max-sm:text-xs">5 days ago</div>
                </div>
              </div>
              <div class="flex items-center justify-between gap-x-5 p-4 border-custom rounded-lg max-sm:p-3">
                <div class="flex items-center sm:space-x-4">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center max-sm:hidden">
                    <span class="text-white text-sm">MJ</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex gap-x-2 max-sm:mb-2 items-center">
                      <div class="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center sm:hidden">
                        <span class="text-white text-sm">MJ</span>
                      </div>
                      <h3 class="text-white font-semibold max-sm:text-sm">Mike Johnson</h3>
                    </div>
                    <p class="text-gray-400 text-sm max-sm:text-xs">Ultimate Plan - $39.99/month</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-pink-400 font-bold max-sm:text-sm">$12.00</div>
                  <div class="text-gray-400 text-sm max-sm:text-xs">1 week ago</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Use the API data composable
const {
  loading,
  error,
  fetchData
} = useApiData()

// Access injected properties from the auth plugin with fallbacks
const nuxtApp = useNuxtApp()
const isAuthenticated = computed(() => nuxtApp.$isAuthenticated?.value || false)
const auth = computed(() => nuxtApp.$auth || null)

// User balance (you can connect this to your actual balance system)
const userBalance = ref(0)

// Handle add balance
const handleAddBalance = () => {
  // Navigate to buy-tokens page
  navigateTo('/buy-tokens')
}

// Fetch data on mount
onMounted(() => {
  fetchData()
})

// Set page layout
definePageMeta({
  layout: 'headless'
})
</script>

<style scoped>
.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.nav-pill {
  position: relative;
}

.nav-pill > * {
  position: relative;
}

.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  border: 1px solid transparent;
  background: 
    radial-gradient(at center bottom, #d9136c 0%, var(--color-bg-secondary) 90%) padding-box no-repeat,
    linear-gradient(135deg, #ffffff99 , var(--color-bg-secondary) ) border-box;    
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  box-shadow: 0 0 50px rgba(217, 19, 108, 0.5);
  z-index: -10;
}

.is-active.nav-pill::before {
  opacity: 0.7;
}

.nav-pill:not(.is-active):hover::before  {
  opacity: 0.3;
}

</style>
