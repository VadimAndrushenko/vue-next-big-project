<template>
  <div class="min-h-screen pb-14 max-w-[1920px] mx-auto px-8 max-sm:px-4 max-2xl:container">
    <!-- Header -->
    <div class="flex justify-between items-center py-6 mb-5">
      <!-- Logo -->
      <div class="md:hidden">
        <AppSidebar/>
      </div>
      <div class="max-md:hidden">
        <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
          <img src="/full-logo.svg" alt="GODDASS.AI"/>
        </NuxtLink>
      </div>
      
      <!-- Back Button -->
      <button @click="$router.back()" class="flex items-center space-x-2 px-8 py-4 bg-[var(--color-bg-secondary)] text-white rounded-lg hover:bg-white/20 transition-all border border-[#3A2B41]">
        <span class="relative w-4 h-4">
            <span class="absolute top-1/2 left-0 w-4 h-0.5 bg-white transform -translate-y-1/2"></span>
            <span class="absolute top-1/2 left-0 w-3 h-3 border-l-2 border-b-2 border-white transform -translate-y-1/2 rotate-45"></span>
        </span>        
        <span>Back</span>
      </button>
    </div>

    <!-- Main Content -->
    <div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <!-- Left Section -->
        <div class="space-y-6 ">
          <!-- Title -->
          <div class="flex flex-col justify-between min-h-[calc(100vh-170px)] gap-y-7 sm:p-11 border border-[#3A2B41] rounded-xl bg-[var(--color-bg-secondary)] max-sm:px-4 max-sm:py-6">
            <div>
              <h1 class="text-3xl text-white mb-6">{{ currentStep === 2 ? 'Selected Package' : 'Buy Luna' }}</h1>
              <!-- Step 2: Selected Package -->
              <div v-if="currentStep === 2" class="bg-[var(--color-bg-secondary)] rounded-2xl mb-6 p-3 border border-[#3A2B41]">
                <div class="flex sm:items-center justify-between max-sm:items-end">
                  <div class="flex sm:items-center sm:space-x-3 max-sm:flex-col max-sm:gap-y-2 max-sm:justify-start">
                    <div class="flex items-center gap-x-4">
                      <img src="../public/images/stars.png" class="w-[60px] max-sm:w-9" alt="">
                      <div class="text-white font-medium">Name packet coin</div>
                    </div>  
                    <div class="flex items-center sm:gap-x-7 max-sm:gap-x-3">
                      <div class="flex items-center space-x-2">
                        <img src="/logo.svg" alt="GODDASS.AI" class="sm:w-[44px] max-sm:w-[24px]">
                        <span class="text-white">{{ selectedPackage?.tokens || 200 }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="flex items-center space-x-2">
                      <span class="text-2xl font-bold text-white max-sm:text-xl">${{ selectedPackage?.price || '19.95' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Costs Block -->
              <h2 class="text-lg text-white mb-4">Costs</h2>
              <div class="rounded-xl border border-[#3A2B41]">
                
                <div class="space-y-3">
                  <div v-for="cost in costs" :key="cost.id" class="flex items-center justify-between px-6 py-4 border-b border-[#3A2B41] last:border-b-0">
                    <div class="flex items-center space-x-3">
                      <SvgIcon :name="cost.icon" class="w-6 max-sm:w-5" />
                      <span class="text-white max-sm:text-sm">{{ cost.name }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                     
                      <img src="/logo.svg" alt="GODDASS.AI" class="w-[36px]">
                      <span class="text-white font-semibold">{{ cost.price }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          
            <div class="flex flex-col space-y-9 ">
              <!-- Payment Logos -->
              <div class="flex items-center justify-center gap-x-4">
                <a href=""><img src="../public/images/visa.png"  alt=""></a>
                <a href=""><img src="../public/images/Mastercard.png" class="h-6" alt=""></a>
              </div>
              <!-- Company Info -->
              <div class="text-center ">
                <p class="text-white/70 text-sm">Hedonism Games LTD</p>
                <p class="text-white/70 text-sm">Apostolou Pavlou Ave 10, Paphos 8046</p>
              </div>

              <!-- Legal Links -->
              <div class="flex justify-center border border-[#3A2B41] rounded-2xl sm:space-x-9 my-9 py-4 bg-[var(--color-bg-secondary)] max-sm:flex-col max-sm:items-center max-sm:gap-y-2">
                <a href="/terms-of-service" class="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="/privacy-policy" class="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="/cancellation-policy" class="text-white/70 hover:text-white text-sm transition-colors">Cancellation Policy</a>
              </div>
            </div>

          </div>  
        

        </div>
        
        <!-- Right Section -->
        <div class="space-y-6">
          <!-- Step 1: Token Packages -->
          <div v-if="currentStep === 1">
            <div class="space-y-3">
              <div 
                v-for="pkg in tokenPackages" 
                :key="pkg.id"
                @click="selectPackage(pkg)"
                :class="[
                  'bg-[var(--color-bg-secondary)] rounded-2xl p-3 border cursor-pointer transition-all hover:bg-white/10',
                  selectedPackage?.id === pkg.id 
                    ? 'gradientPacket' 
                    : 'border-[#3A2B41]'
                ]"
              >
                <div class="flex sm:items-center justify-between max-sm:items-end">

                  <div class="flex sm:items-center sm:space-x-3 max-sm:flex-col max-sm:gap-y-2 max-sm:justify-start">
                    <div class="flex items-center gap-x-4">
                      <img src="../public/images/stars.png" class="w-[60px] max-sm:w-9" alt="">
                      <div class="text-white font-medium">{{ pkg.name }}</div>
                    </div>  

                    <div class="flex items-center sm:gap-x-7 max-sm:gap-x-3">
                      
                      <div class="flex items-center space-x-2">
                        <img src="/logo.svg" alt="GODDASS.AI" class="sm:w-[36px] max-sm:w-[24px]">
                        <span class="text-white">{{ pkg.tokens }}</span>
                      </div>
                      <div v-if="pkg.tag" class="">
                        <span :class="[
                          'px-2 py-1 rounded-full text-xs font-medium text-nowrap',
                          pkg.tag === 'Popular' ? 'popular' : 'sale-badge'
                        ]">
                          {{ pkg.tag }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="flex items-center space-x-2">
                      <span v-if="pkg.oldPrice" class="text-white/50 line-through text-sm">${{ pkg.oldPrice }}</span>
                      <span class="text-2xl font-bold text-white max-sm:text-xl">${{ pkg.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Proceed Button -->
            <div class="mt-9">
              <PrimaryButton 
                :disabled="!selectedPackage"
                @click="proceedToCheckout"
              >
                <span class="inline-flex items-center gap-2">
                  <SvgIcon name="wand" :size="24"/>
                  Proceed
                </span>
              </PrimaryButton>

              <div class="flex gap-x-6 justify-center items-center mt-6 text-gray-400 max-sm:flex-col max-sm:items-center max-sm:gap-y-4">
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="DocCheck" :size="24"/>
                  Privacy in bank Statent
                </a>
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="BookAward" :size="24"/>
                  Antivirus Secured
                </a>
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="watch" :size="24"/>
                  Cancel Anytime
                </a>
              </div>
              
            </div>
          </div>
          
          <!-- Step 2: Checkout -->
          <div v-if="currentStep === 2">
            <h2 class="text-2xl font-semibold text-white mb-4">Saved Cart</h2>
            
            <!-- Card Number Input -->
            <div class="space-y-2 mb-6">
              <label class="block text-gray-400">Cart number</label>
              <div class="relative">
                <input
                  v-model="cardNumber"
                  type="text"
                  class="w-full px-4 py-3  bg-[var(--color-bg-secondary)] border border-[#3A2B41] rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="1111 1111 1111 1111"
                />
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src="../public/images/Mastercard.png" class="w-10" alt="">
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-4 max-md:flex-col">
              <PrimaryButton class="flex-1">
                <span class="inline-flex items-center gap-2">
                  <SvgIcon name="wand" :size="24"/>
                  Buy Luna
                </span>
              </PrimaryButton>
              
              <button 
                @click="payWithCrypto"
                class="flex-1 flex items-center justify-center space-x-2 px-4 py-4 border border-[#3A2B41] bg-[var(--color-bg-primary)] text-white rounded-xl hover:bg-white/20 transition-all"
              >
                <SvgIcon name="refresh" :size="24" fill="none" stroke="currentColor" />
                <span>Pay with crypto</span>
              </button>
            </div>
            
            <!-- Trust Elements -->
            <div class="flex gap-x-6 justify-center items-center mt-6 text-gray-400 max-sm:flex-col max-sm:items-center max-sm:gap-y-4">
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="DocCheck" :size="24"/>
                  Privacy in bank Statent
                </a>
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="BookAward" :size="24"/>
                  Antivirus Secured
                </a>
                <a class="flex gap-x-2 hover:text-white transition-colors">
                  <SvgIcon name="watch" :size="24"/>
                  Cancel Anytime
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// State
const currentStep = ref(1)
const selectedPackage = ref(null)
const cardNumber = ref('1111 1111 1111 1111')

// Costs data
const costs = [
  {
    id: 1,
    name: 'Voice Message',
    price: 1,
    icon: 'voice'
  },
  {
    id: 2,
    name: 'Generate Picture',
    price: 7,
    icon: 'picture'
  },
  {
    id: 3,
    name: 'Create Character',
    price: 15,
    icon: 'character'
  }
]

// Token packages data
const tokenPackages = [
  {
    id: 1,
    name: 'Name packet coin',
    tokens: 200,
    price: '19.95',
    oldPrice: null,
    tag: null
  },
  {
    id: 2,
    name: 'Name packet coin',
    tokens: 500,
    price: '19.95',
    oldPrice: '19.95',
    tag: null
  },
  {
    id: 3,
    name: 'Name packet coin',
    tokens: 1000,
    price: '19.95',
    oldPrice: '19.95',
    tag: 'Popular'
  },
  {
    id: 4,
    name: 'Name packet coin',
    tokens: 2000,
    price: '19.95',
    oldPrice: '19.95',
    tag: 'Save 70%'
  }
]


// Methods
const selectPackage = (pkg) => {
  selectedPackage.value = pkg
}

const proceedToCheckout = () => {
  if (selectedPackage.value) {
    currentStep.value = 2
  }
}
const payWithCrypto = () => {
  console.log('Processing crypto payment')
  // Handle crypto payment logic
}
</script>

<style scoped>
.sale-badge {
  text-align: center;
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 22px;
  background: linear-gradient(180deg, #e02c7d 0%, #5b54c4 100%) no-repeat;
  font-size: 0.75rem ;
  line-height: 1rem ;
}

.popular {
  text-align: center;
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 22px;
  border: 1px solid transparent;
  background: 
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box,
    linear-gradient(180deg, #e02c7d 0%, #5b54c4 100%) border-box ;
  font-size: 0.75rem ;
  line-height: 1rem ;
}

.gradientPacket {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box, 
    linear-gradient( #ffffff, #A854C4) border-box; 
  transition: all 300ms ease-in-out;
}

</style>