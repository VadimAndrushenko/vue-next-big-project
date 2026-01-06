<template>


  <div>
    <!-- Main Content -->
    <div class="container mx-auto xl:min-h-[calc(100vh-2rem+40px)] flex flex-col max-xl:min-h-[calc(100vh-80px)] max-md:pt-3 px-8 max-sm:px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 max-md:hidden">
        <h1 class="text-3xl font-medium text-white">Profile Settings</h1>  

          <HeaderActions/>
      </div>

      <!-- Tabs -->
      <div class="gradient-tabs relative flex items-center 2xl:pb-[88px] pt-5 max-2xl:mb-20">
        <div class="border-custom bg-[var(--color-bg-secondary)] flex w-full text-nowrap">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'nav-pill flex-1 space-x-2 md:px-6 md:py-[18px] text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 max-md:h-[44px]',
              activeTab === tab.id
                ? 'is-active text-white'
                : ''
            ]"
          >
            <SvgIcon :name="tab.iconName" :size="24" class="w-6 inline-block align-middle" />
            <span class="max-[1470px]:hidden">{{ tab.name }}</span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div 
        class="space-y-6 flex flex-col flex-1 relative "
        :class="{ 'bottom-10': activeTab !== 'personal-info' }"
      >
        <!-- Personal Info Tab -->
        <div v-if="activeTab === 'personal-info'" class="space-y-6 ">
          <!-- Info Notice -->
          <div class="gradient-tabs-info flex flex-col items-center justify-center overflow-hidden py-4 space-x-3">
            <img class="" src="../public/images/clover.png" alt="">
            <p class=" relative max-w-[1200px] text-white/80 text-sm text-center">
              Changing your user fields will only apply to new chats you start after the change. If you want to update your user fields in an existing chat, go to that chat and edit them directly through the  in the top-right corner.             
            </p>
          </div>

          <div class="flex flex-col gap-y-6 text-gray-500 ">
            <!-- Avatar Upload -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-400">Upload your avatar (jpeg/png/gif up to 4MB)</label>
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center">
                  <div class="w-6 ">
                    <SvgIcon name="user" :size="24" fill="gray" />
                  </div>
                </div>
                <button class="nav-pill w-[132px] border-custom py-[18px] bg-[var(--color-bg-secondary)] text-center hover:text-white">Upload</button>
              </div>
            </div>

            <div class="flex gap-6 max-lg:flex-col">

              <!-- Input -->
              <div class="flex-1 ">
                <!-- Name Input -->
                <div class="mb-6 space-y-2">
                  <label class="block text-sm font-medium">Name</label>
                  <div class="relative">
                    <input
                      v-model="personalInfo.name"
                      type="text"
                      class="w-full px-4 py-3 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                      placeholder="Enter your name"
                    />
                    <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white">
                      <SvgIcon name="edit" :size="24" />
                    </button>
                  </div>
                </div>

                <!-- Gender Dropdown -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium">Gender</label>
                  <div class="relative">
                    <select
                      v-model="personalInfo.gender"
                      class="w-full px-4 py-3 border-custom bg-[var(--color-bg-secondary)] text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none">
                      <SvgIcon name="arrow-down" :size="16" fill="none" stroke="currentColor" />
                    </div>
                  </div>
                </div>

              </div> 

              <!-- Persona Text Area -->
              <div class="flex flex-1 flex-col gap-2 ">
                <label class="block text-sm font-medium">Persona</label>
                <div class="relative h-full">
                  <textarea
                    v-model="personalInfo.persona"
                    rows="4"
                    class="w-full h-full px-4 py-3 border-custom bg-[var(--color-bg-secondary)] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    placeholder="Describe your persona..."
                  ></textarea>

                  <button class="absolute right-3 top-3 text-white/50 hover:text-white">
                    <SvgIcon name="edit" :size="24" />
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Chat Setting Tab -->
        <div v-if="activeTab === 'chat'" class="space-y-6">
          
          <form class="flex gap-6 max-xl:flex-col" role="radiogroup" aria-label="Automatic Picture Detection">
            <!-- Enabled Block -->
            <div class="flex-1 space-y-2">
              <span class="text-gray-400">Automatic Picture Detection</span>

              <input
                id="pic-enabled"
                name="pic"
                type="radio"
                class="sr-only peer"
                value="enabled"
                v-model="selected"
              />

              <label
                for="pic-enabled"
                :class="{ gradientChat: selected === 'enabled' }"
                class="block rounded-2xl p-4 min-h-[102px] bg-[var(--color-bg-secondary)] space-y-3 cursor-pointer"
              >
                <h4 class="text-lg text-gray-400">Enabled</h4>
                <p class="text-sm">
                  Our AI model will automatically decide when you've asked for a picture on the chat.
                </p>
              </label>
            </div>

            <!-- Disabled Block -->
            <div class="flex-1 space-y-2">
              <span class="text-gray-400">Automatic Picture Detection</span>

              <input
                id="pic-disabled"
                name="pic"
                type="radio"
                class="sr-only peer"
                value="disabled"
                v-model="selected"
              />

              <label
                for="pic-disabled"
                :class="{ gradientChat: selected === 'disabled' }"
                class="block rounded-2xl p-4 min-h-[102px] bg-[var(--color-bg-secondary)] space-y-3 cursor-pointer"
              >
                <span class="text-lg text-gray-400">Disabled</span>
                <p class="text-sm">
                  You will only receive pictures when using the 'receive picture' button on the bottom right of the chat.
                </p>
              </label>
            </div>
          </form>

        </div>

        <!-- Authentication Tab -->
        <div v-if="activeTab === 'auth'" class="flex gap-6 text-gray-400 max-lg:flex-col">
          <!-- Email Input -->
          <div class="flex-1">
            <label class="block text-sm font-medium mb-2 ">Email</label>
            <div class="relative">
              <input
                v-model="authInfo.email"
                type="email"
                class="w-full px-4 py-3 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                placeholder="Enter your email"
              />
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white">
                <SvgIcon name="edit" :size="24" />
              </button>
            </div>
          </div>

          <!-- Password Input -->
          <div class="flex-1">
            <label class="block text-sm font-medium mb-2">Password</label>
            <div class="relative ">
              <input
                v-model="authInfo.password"
                type="password"
                class="w-full px-4 py-3 text-white border-custom bg-[var(--color-bg-secondary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                placeholder="Enter your password"
              />
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white">
                <SvgIcon name="edit" :size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Subscription Tab -->
        <div v-if="activeTab === 'subscription'" class="space-y-6 flex flex-col flex-1">
          <div class="flex gap-x-6 max-xl:flex-col max-xl:gap-y-6">
            <!-- Current Plan -->
            <div class="flex flex-col flex-1">
              <span class="text-gray-400">Current Plan</span>
              <div class="border-custom flex flex-col flex-1 gap-y-6 md:p-9 bg-[var(--color-bg-secondary)] max-md:px-4 max-md:py-6 ">
                <div class="flex items-start justify-between gap-x-5 flex-1 max-sm:gap-x-2">
                  <div class="flex flex-col gap-y-4 items-start flex-1">

                    <img src="../public/images/stars.png" alt="" class="max-sm:w-9 ">
                  
                    <h3 class="text-xl text-white">Monthly Plan</h3>
                    <p class="text-2xl text-white">$19.95 <span class="text-gray-400 text-lg ">/month</span></p>
                    <p class="text-white/70 text-sm">Next payment on August 6th 2025</p>

                  </div>
                  
                  <div class="flex-1">
                    <ul class="flex flex-col justify-start md:text-lg text-white/80 max-md:text-xs md:gap-y-4 max-md:gap-y-6">
                      <li class="flex items-center gap-x-2">
                        <SvgIcon name="check" :size="16" class="max-md:w-3 min-w-3" fill="white" />
                        <span>Unlimited Texting</span>
                      </li>
                      <li class="flex items-center gap-x-2">
                        <SvgIcon name="check" :size="16" class="max-md:w-3 min-w-3" fill="white" />
                        <span>Receive Pictures</span>
                      </li>
                      <li class="flex items-center gap-x-2">
                        <SvgIcon name="check" :size="16" class="max-md:w-3 min-w-3" fill="white" />
                        <span>Send & Receive Voice Messages</span>
                      </li>
                      <li class="flex items-center gap-x-2">
                        <SvgIcon name="check" :size="16" class="max-md:w-3 min-w-3" fill="white" />
                        <span>Bonus Luna Tokens (500/month)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <button class="flex justify-center items-center sm:gap-x-4 border border-transparent px-5 h-[76px] w-full rounded-2xl bg-[#1b0426] max-sm:gap-x-2">
                  <div class="flex items-center space-x-2 text-nowrap text-white">
                    <SvgIcon name="refresh" :size="24" fill="none" stroke="currentColor" />
                    <span>Switch to Annual</span>
                  </div>
                  <div class="sale-badge md:w-[132px] max-md:w-[90px]">Save 70%</div>
                </button>
              </div>
            </div>
            <!-- Saved Card -->
            <div class="flex flex-col flex-1">
              <span class="text-gray-400">Current Plan</span>
              <div class="border-custom flex flex-col flex-1 gap-y-6 md:p-9 bg-[var(--color-bg-secondary)] max-md:px-4 max-md:py-6 ">

                <div class="flex justify-between flex-1">
                  <div class="flex flex-col gap-y-3 ">
                    <div class="flex flex-col gap-y-1">
                      <span class="text-white/70">Cart Number</span>
                      <span class="text-white">1111 1111 1111 1111</span>
                    </div>
                    <div class="flex flex-col gap-y-1">
                      <span class="text-white/70">Expire Date</span>
                      <span class="text-white">09/28</span>
                    </div>
                    <div class="flex flex-col gap-y-1">
                      <span class="text-white/70">Cartholder Name</span>
                      <span class="text-white">Dima Ivanov</span>
                    </div>
                  </div>

                  <img class="max-h-9  " src="../public/images/Mastercard.png" alt="">
                </div>
                
                <button class="flex justify-center items-center gap-x-4 border border-transparent h-[76px] w-full rounded-2xl bg-[#1b0426]">
                  <div class="flex items-center space-x-2 text-white">
                    <SvgIcon name="refresh" :size="24" fill="none" stroke="currentColor" />
                    <span>Switch to Annual</span>
                  </div>
                </button>

              </div>
            </div>      
          </div>

          <div class="">
            <span class="text-gray-400">Cancel Plan</span>
            <button class="nav-pill border-custom flex items-center gap-x-3 py-[18px] px-14 transition-colors mt-4 bg-[var(--color-bg-secondary)] text-gray-400 hover:text-white">
              <SvgIcon name="close" :size="24" />
              <span>Cancel Subscription</span>
            </button>
          </div>

        </div>

        <!-- Legal Tab -->
        <div v-if="activeTab === 'legal'" class="space-y-6">
          <div class="border-custom bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Legal Information</h3>
            <div class="space-y-4 text-white/80">
              <div>
                <h4 class="text-lg font-semibold text-white mb-2">Terms & Policies</h4>
                <div class="space-y-2">
                  <a href="/terms-of-service" class="block text-pink-400 hover:text-pink-300 transition-colors">Terms of Service</a>
                  <a href="/privacy-policy" class="block text-pink-400 hover:text-pink-300 transition-colors">Privacy Policy</a>
                  <a href="/cancellation-policy" class="block text-pink-400 hover:text-pink-300 transition-colors">Cancellation Policy</a>
                  <a href="/complaint-policy" class="block text-pink-400 hover:text-pink-300 transition-colors">Complaint Policy</a>
                  <a href="/content-removal-policy" class="block text-pink-400 hover:text-pink-300 transition-colors">Content Removal Policy</a>
                </div>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-2">Company Information</h4>
                <p class="text-sm">GODDASS.AI is committed to providing a safe and secure platform.</p>
                <p class="text-sm mt-2">All content is subject to our terms of service and community guidelines.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Tab -->
        <div v-if="activeTab === 'contact'" class="space-y-6">
          <div class="border-custom bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 text-white border-custom bg-[var(--color-bg-primary)] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  rows="6"
                  class="w-full px-4 py-3 border-custom bg-[var(--color-bg-primary)] rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <div class="flex justify-end">
                <PrimaryButton class="w-full sm:w-auto">Send Message</PrimaryButton>
              </div>
            </div>
          </div>
          
          <div class="border-custom bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Other Ways to Reach Us</h3>
            <div class="space-y-3 text-white/80">
              <p class="flex items-center gap-2">
                <SvgIcon name="mail" :size="20" />
                <span>support@goddass.ai</span>
              </p>
              <p class="text-sm">We typically respond within 24-48 hours.</p>
            </div>
          </div>
        </div>

        <!-- Delete Account Tab -->
        <div v-if="activeTab === 'delete-account'" class="border-custom flex flex-col items-center justify-center flex-1 px-4 bg-[var(--color-bg-secondary)]">

          <img src="../public/images/smail.png" alt="">

          
          <h3 class="text-2xl font-bold text-white mb-4">Delete Account</h3>
          <p class="text-white/70 text-center mb-8">Are you sure you want to delete your account?</p>
          
          <div class="sm:w-[132px]">
            <PrimaryButton>Confirm</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'


// Get route to access query parameters
const route = useRoute()

// Active tab state
const activeTab = ref('personal-info')

// Form data
const personalInfo = ref({
  name: 'Dima',
  gender: 'male',
  persona: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
})

const authInfo = ref({
  email: 'hanzohasashi@gmail.com',
  password: '........'
})

// Tab configuration
const tabs = [
  {
    id: 'personal-info',
    name: 'Personal info',
    iconName: 'user'
  },
  {
    id: 'chat',
    name: 'Chat setting',
    iconName: 'chat'
  },
  {
    id: 'auth',
    name: 'Authentication',
    iconName: 'shield'
  },
  {
    id: 'subscription',
    name: 'Subscription',
    iconName: 'crown'
  },
  {
    id: 'legal',
    name: 'Legal',
    iconName: 'shield'
  },
  {
    id: 'contact',
    name: 'Contact',
    iconName: 'mail'
  },
  {
    id: 'delete-account',
    name: 'Delete account',
    iconName: 'trash'
  }
]

// Set initial tab based on query parameter
onMounted(() => {
  const tabParam = route.query.tab
  if (tabParam && tabs.find(tab => tab.id === tabParam)) {
    activeTab.value = tabParam
  }
})

// Watch for route changes
watch(() => route.query.tab, (newTab) => {
  if (newTab && tabs.find(tab => tab.id === newTab)) {
    activeTab.value = newTab
  }
})

// Update URL when tab changes
watch(activeTab, (newTab) => {
  navigateTo({
    query: { ...route.query, tab: newTab }
  }, { replace: true })
})

// Set page layout
definePageMeta({
  layout: 'headless',
})

const handleAddBalance = () => {
  // Navigate to buy-tokens page
  navigateTo('/buy-tokens')
}

const selected = ref('enabled') 
</script>

<style scoped>
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
  background: 
    radial-gradient(at center bottom, #d9136c 0%, var(--color-bg-secondary) 54% , #11041d00 56%) padding-box no-repeat;
  opacity: 0;
  transition: 200ms ease-in-out; 
  box-shadow: 0 0 0px rgba(217, 19, 108, 0.5);
  z-index: -1;
}

.is-active.nav-pill::before {
  opacity: 0.5;
}

.nav-pill:not(.is-active):hover::before  {
  opacity: 0.3;
}

.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.sale-badge {
  text-align: center;
  padding-block: 10px;
  height: 44px;
  border-radius: 22px;
  background: radial-gradient(297.76% 215.23% at 55.00000000000001% -32%,rgba(224, 44, 125, 1),rgba(91, 84, 196, 1) 100%) ;
}

.gradientChat {
  border-radius: 16px;
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box, 
    linear-gradient( #ffffff, #A854C4) border-box; 
  transition: all 300ms ease-in-out;
}

.gradient-tabs {
  position: relative;
  border-radius: 56px;
  background: transparent;
  z-index: 0; 
}

.gradient-tabs::before {
  content: "";
  position: absolute;
  top: 0px;    
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(180deg, #e02c7d 0%, #5b54c4 100%);
  opacity: 0.6;
  filter: blur(200px);
  z-index: 0;
}

.gradient-tabs > * {
  position: relative;
  z-index: 10;

}

.gradient-tabs-info {
  border-radius: 16px;
  position: relative;
  z-index: 10;
}

.gradient-tabs-info::before {
  content: "";
  position: absolute;
  opacity: 0.4;
  filter: blur(160px);
  top: 0px;    
  left: 0px;
  right: 0px;
  bottom: 0px;
 background: linear-gradient(180deg, #e02c7d 25%, #5b54c4 100%);
}

@media (max-width: 1536px) {
  .gradient-tabs::before {
    opacity: 0;
  }
}

</style>