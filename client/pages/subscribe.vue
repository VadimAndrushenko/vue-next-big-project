<template>
  <div class="min-h-screen max-w-[920px] mx-auto px-5 max-lg:container">
    <!-- Header -->
    <div class="flex justify-between items-center py-6 mb-5">
      <!-- Sidebar -->
      <div class="md:hidden">
        <AppSidebar/>
      </div>
      <div class="max-md:hidden">
        <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
          <img src="/full-logo.svg" alt="GODDASS.AI"/>
        </NuxtLink>
      </div>
      <!-- Back Button -->
      <button @click="$router.back()" class="flex items-center border border-[#3A2B41] space-x-2 px-8 py-4 bg-[var(--color-bg-secondary)] text-white rounded-lg hover:bg-white/20 transition-all">
        <span class="relative w-4 h-4">
          <span class="absolute top-1/2 left-0 w-4 h-0.5 bg-white transform -translate-y-1/2"></span>
          <span class="absolute top-1/2 left-0 w-3 h-3 border-l-2 border-b-2 border-white transform -translate-y-1/2 rotate-45"></span>
        </span>        
        <span>Back</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="nav-pill max-w-7xl mx-auto sm:px-11 py-11 pb-16 bg-[var(--color-bg-secondary)] border border-[#3A2B41] rounded-3xl max-sm:px-4  max-sm:py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Section -->
        <div class="space-y-6">
          <!-- Title -->
          <h1 class="sm:text-[40px] text-white max-sm:text-2xl">Goddass <span class="text-[#E02C7D]">pro</span></h1>
          <!-- Features List -->
          <div class="space-y-4">
            <div v-for="feature in features" :key="feature.id" class="flex items-center space-x-3">
              <SvgIcon name="check" :size="16"  fill="white" />
              <span class="text-white sm:text-lg max-sm:text-sm">{{ feature.name }}</span>
            </div>
          </div>

        </div>
        
        <!-- Right Section -->
        <div class="space-y-9">
          <!-- Plan Selection -->
          <div class="flex lg:flex-col gap-y-4 max-lg:gap-x-4 max-md:flex-col">
            
            <!-- Annual Plan -->
            <div 
              @click="selectPlan('annual')"
              :class="[
                'rounded-xl p-6 border cursor-pointer transition-all bg-[var(--color-bg-secondary)] hover:bg-white/10 relative flex-1',
                selectedPlan === 'annual' 
                  ? 'gradientSubscribe' 
                  : 'border-[#3A2B41]'
              ]"
            >
              <!-- Selection Indicator -->
              <div class="absolute top-4 right-4">
                <div :class="[
                  'w-9 h-9 rounded-full border border-[#3A2B41] transition-all',
                  selectedPlan === 'annual' 
                    ? '' 
                    : ' bg-[var(--color-bg-primary)]'
                ]">
                  <div v-if="selectedPlan === 'annual'" class="w-full h-full  rounded-full flex items-center justify-center">
                    <div class="w-4 h-4 bg-gradient-to-b from-[#FFFFFF] to-[#A854C4] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                  
                <div class="flex-1 space-y-4">
                  <img src="../public/images/stars.png" alt="" class="max-sm:w-9 ">
                  <div>
                    <div class="flex items-center space-x-3 mb-2">
                      <h3 class="text-lg text-white">Annual Plan</h3>
                      <span class="sale-badge">Save 70%</span>
                    </div>
                    <div class="text-3xl font-bold text-white">$6.65 <span class="text-white/70 font-normal text-base">/month</span> <span class="text-white/50 font-normal text-xl line-through">$19.95</span></div>
                  </div>
                  <div class="text-white/70 text-sm">Billed Annually as $79.80</div>
                </div>
              </div>
            </div>
            
            <!-- Monthly Plan -->
            <div 
              @click="selectPlan('monthly')"
              :class="[
                ' rounded-xl p-6 border cursor-pointer transition-all bg-[var(--color-bg-secondary)] hover:bg-white/10 relative flex-1',
                selectedPlan === 'monthly' 
                  ? 'gradientSubscribe' 
                  : 'border-[#3A2B41]'
              ]"
            >
              <!-- Selection Indicator -->
              <div class="absolute top-4 right-4">
                <div :class="[
                  'w-9 h-9 rounded-full border border-[#3A2B41] transition-all',
                  selectedPlan === 'monthly' 
                    ? '' 
                    : ' bg-[var(--color-bg-primary)]'
                ]">
                  <div v-if="selectedPlan === 'monthly'" class="w-full h-full  rounded-full flex items-center justify-center">
                    <div class="w-4 h-4 bg-gradient-to-b from-[#FFFFFF] to-[#A854C4] rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start">
                

                <div class="flex-1 space-y-4">
                  <img src="../public/images/stars.png" alt="" class="max-sm:w-9 ">
                  <div>
                    <h3 class="text-lg text-white mb-2">Monthly Plan</h3>
                    <div class="text-3xl font-bold text-white">$19.95 <span class="text-white/70 text-base font-normal">/month</span></div>
                  </div>
                  <div class="text-white/70 text-sm">Billed Monthly as $19.95</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Payment Buttons / Card Entry State -->
          <div v-if="step === 1" class="flex lg:flex-col gap-y-4 max-lg:gap-x-4 max-md:flex-col">
            <PrimaryButton 
              :disabled="!selectedPlan"
              @click="goToCard"
              class="flex-1"
            >
              <span class="inline-flex items-center gap-2">
                <SvgIcon name="PayCard" :size="24"/>
                Pay with card
              </span>
            </PrimaryButton>
            
            <button 
              @click="payWithCrypto"
              class="flex-1 flex items-center justify-center space-x-2 px-4 py-4 border border-[#3A2B41] bg-[var(--color-bg-primary)] text-white rounded-xl hover:bg-white/20 transition-all"
            >
              <SvgIcon name="PayCrypto" :size="24"/>
              <span>Pay with crypto</span>
            </button>
          </div>

          <!-- Card Details Form -->
          <div v-else class="space-y-6">
            <h3 class="text-xl text-white">Saved Card</h3>
            <div class="space-y-3">
              <label class="block text-white/70 text-sm">Card Number</label>
              <div class="relative">
                <input v-model="card.number" type="text" placeholder="**** **** **** 7698" class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[#3A2B41] rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img src="../public/images/Mastercard.png" class="h-6" alt="" />
                </div>
              </div>
              <p v-if="errors.number" class="text-red-400 text-sm">{{ errors.number }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-white/70 text-sm mb-2">Name on card</label>
                <input v-model="card.name" type="text" placeholder="John Doe" class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[#3A2B41] rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-white/70 text-sm mb-2">Expiry</label>
                <input v-model="card.expiry" type="text" placeholder="MM/YY" class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[#3A2B41] rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <p v-if="errors.expiry" class="text-red-400 text-sm mt-1">{{ errors.expiry }}</p>
              </div>
              <div>
                <label class="block text-white/70 text-sm mb-2">CVC</label>
                <input v-model="card.cvc" type="password" placeholder="***" class="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[#3A2B41] rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <p v-if="errors.cvc" class="text-red-400 text-sm mt-1">{{ errors.cvc }}</p>
              </div>
            </div>

            <div class="flex lg:flex-col gap-y-4 max-lg:gap-x-4 max-md:flex-col">
              <PrimaryButton class="flex-1" @click="confirmCard">
                <span class="inline-flex items-center gap-2">
                  <SvgIcon name="PayCard" :size="24"/>
                  Upgrade with card
                </span>
              </PrimaryButton>
              <button 
                @click="step = 1"
                class="flex-1 flex items-center justify-center space-x-2 px-4 py-4 border border-[#3A2B41] bg-[var(--color-bg-primary)] text-white rounded-2xl hover:bg-white/20 transition-all"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="mt-12 py-6">
      <div class="max-w-7xl mx-auto ">

        <div class="flex gap-x-6 justify-center items-center mb-6 text-gray-400 max-sm:flex-col max-sm:items-center max-sm:gap-y-4">
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
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// State
const selectedPlan = ref('annual') // Default to annual plan
const step = ref(1) // 1: plans, 2: card details
const card = ref({ number: '', name: '', expiry: '', cvc: '' })
const errors = ref({ number: '', name: '', expiry: '', cvc: '' })

// Features data
const features = [
  {
    id: 1,
    name: 'Unlimited Texting'
  },
  {
    id: 2,
    name: 'Receive Pictures'
  },
  {
    id: 3,
    name: 'Send & Receive Voice Messages'
  },
  {
    id: 4,
    name: 'Bonus Luna Tokens (500/month)'
  }
]

// Plan data
const plans = {
  annual: {
    name: 'Annual Plan',
    price: '6.65',
    originalPrice: '19.95',
    billing: 'Billed Annually as $79.80',
    savings: 'Save 70%'
  },
  monthly: {
    name: 'Monthly Plan',
    price: '19.95',
    originalPrice: null,
    billing: 'Billed Monthly as $19.95',
    savings: null
  }
}

// Methods
const selectPlan = (plan) => {
  selectedPlan.value = plan
}

const goToCard = () => {
  if (!selectedPlan.value) return
  step.value = 2
}

// Luhn check for card number
const luhnCheck = (num) => {
  const clean = (num || '').replace(/\D/g, '')
  let sum = 0
  let shouldDouble = false
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean[i])
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return clean.length >= 12 && (sum % 10 === 0)
}

const validateCard = () => {
  const e = { number: '', name: '', expiry: '', cvc: '' }
  const num = (card.value.number || '').replace(/\s+/g, '')
  if (!luhnCheck(num)) e.number = 'Enter a valid card number'
  if (!card.value.name || card.value.name.trim().length < 2) e.name = 'Enter the cardholder name'
  const exp = (card.value.expiry || '').trim()
  const match = exp.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!match) {
    e.expiry = 'Use MM/YY format'
  } else {
    const month = parseInt(match[1])
    const year = 2000 + parseInt(match[2])
    const now = new Date()
    const expDate = new Date(year, month)
    if (expDate <= now) e.expiry = 'Card is expired'
  }
  const cvc = (card.value.cvc || '').trim()
  if (!/^\d{3,4}$/.test(cvc)) e.cvc = 'CVC must be 3–4 digits'
  errors.value = e
  return !e.number && !e.name && !e.expiry && !e.cvc
}

const confirmCard = async () => {
  if (!validateCard()) return
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Get auth instance
    const { $auth } = useNuxtApp()
    
    // Upgrade user to premium with 1000 tokens
    const result = await $auth.upgradeToPremium(1000)
    
    if (result.success) {
      // Show success message
      alert('Payment successful! You now have 1000 tokens and PREMIUM status!')
      
      // Redirect to private content page
      await navigateTo('/private')
    } else {
      alert('Payment failed. Please try again.')
    }
  } catch (error) {
    console.error('Payment error:', error)
    alert('Payment failed. Please try again.')
  }
}

const payWithCrypto = () => {
  if (selectedPlan.value) {
    console.log('Processing crypto payment for:', selectedPlan.value)
    // Handle crypto payment logic
  }
}
</script>

<style scoped>
.sale-badge {
  text-align: center;
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 22px;
  background: linear-gradient(180deg, #e02c7d 0%, #5b54c4 100%) ;
  font-size: 0.75rem ;
  line-height: 1rem ;
}

.gradientSubscribe {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box, 
    linear-gradient( #ffffff, #A854C4) border-box; 
  transition: all 300ms ease-in-out;
}

.nav-pill {
  position: relative;
  overflow: hidden
}

.nav-pill > * {
  position: relative;
  z-index: 10;
}

.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.6;
  border-radius: 8px;
  border: 1px solid transparent;
  background: 
    radial-gradient(circle at left 26% bottom -5%, #E02C7D 17%, #5B54C4 20%, transparent 25%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(120px);
  
}

.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.burger-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1;
  justify-content: space-between;
  padding: 20px 16px;
  cursor: pointer;
}

.burger-menu span {
  width: 24px;
  height: 2px;
  background-color: #a854c4;
  border-radius: 9999px;    
  transition: all 0.3s ease;
}

.burger-menu.accent span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.burger-menu.accent span:nth-child(2) {
  transform: translateY(-8px) rotate(-45deg);
}


@media (max-width: 1024px) {
  .nav-pill::before {
    background: 
      radial-gradient(circle at left 50% bottom -5%, #E02C7D 0%, #5B54C4 25%, transparent 30%) no-repeat; 
  }
}

</style>