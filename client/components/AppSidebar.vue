<template>
  
  <aside 
  :class="[
    'fixed left-4 top-4 h-[calc(100vh-2rem)] max-md:h-full text-[0.8rem] text-white z-50 bg-[#1b0426] transition-all max-md:-translate-x-[1000px] max-md:px-20  md:max-2xl:w-[104px] max-[450px]:px-10',
    isSidebarActive ? 'active' : '',
  ]"
  >
    <div :class="[
     ' h-full  max-w-[700px] max-md:mx-auto',
     IsMiniHeight ? 'max-md:pt-2 max-md:pb-6 max-md:max-h-[calc(100vh-45px)]' : 'max-md:py-6 max-md:max-h-[calc(100vh-80px)]'
    ]">
    <!-- Logo -->
      <div 
      :class="[
        'flex justify-between md:hidden',
        IsMiniHeight ? 'mb-4' : 'mb-7'
      ]">

        <div class="flex items-center justify-center w-[186px]">
          <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
            <img src="/full-logo.svg" alt="GODDASS.AI" />
          </NuxtLink>
        </div>

        <button 
        @click="toggleSidebarOf"
        :class="[
          'burger-menu border-custom bg-[var(--color-bg-secondary)] accent',
          IsMiniHeight ? 'mini-burger' : ''
        ]">
          
          <span></span>
          <span></span>
        </button>

      </div>
 
      <div :class="[
        'flex flex-col justify-between rounded-3xl h-full  border border-secondary backdrop-blur-xl bg-[var(--color-bg-secondary)] ',
        IsMiniHeight ? 'max-md:py-3' : 'max-md:py-6'
      ]" >
        
        <div :class="[
          'p-6 flex justify-center max-md:hidden',
          IsMiniHeight ? 'py-4' : ''
        ]">
          <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
            <img src="/full-logo.svg" alt="GODDASS.AI" class="max-2xl:hidden" />
            <img src="/logo.svg" alt="GODDASS.AI" class="2xl:hidden w-[50px]" />
          </NuxtLink>
        </div>

        <!-- Model Selector Component -->
        <ModelSelector :class="[
          IsMiniHeight ? 'mb-2' : 'mb-6'
        ]"/>

        <!-- Main Navigation -->
        <nav class="flex-1 ">
          <ul class="px-8 space-y-2 md:max-2xl:px-6">
            <li v-for="item in navigationItems" :key="item.id">
              <button
                @click="handleNavClick(item)"
                :class="[
                  'nav-pill arrow flex items-center gap-x-2 px-4 h-[43px] transition-all duration-200  text-gray-400 hover:text-white group w-full text-left',
                  item.active 
                    ? 'is-active text-white' 
                    : 'text-primary'  
                ]"
              >
                <SvgIcon :name="item.iconName" :size="24" class="w-6 inline-block align-middle" />
                <span class="md:max-2xl:hidden">{{ item.name }}</span>
              </button>
            </li>
            
            <!-- Spacer for Premium Button -->
            <li v-if="!IsMiniHeight" class="h-2"></li>
            
            <!-- Premium Button (after Private content) -->
            <li>
              <button 
                @click="handlePremiumClick" 
                aria-label="Premium" 
                class="block w-full"
              >
                <PrimaryButton fullWidth :height="42" class="glow-small ">
                  <SvgIcon name="premium" :size="24" fill="#FFFFFF" />
                  <span class="md:max-2xl:hidden">Premium</span>
                </PrimaryButton>
              </button>
            </li>
          </ul>
        </nav>
        <!-- Bottom Section with Frame -->
        <div :class="[
          'p-4 flex flex-col justify-end h-full max-md:pb-0',
        ]">
          <!-- Bottom Links and Logout -->
          <div 
          :class="[
            'md:relative space-y-3',
            isSmallHeight ? 'md:max-2xl:px-[8px]' : ''
          ]">
            <!-- Internal Frame for Affiliate Program Links -->
            <div :class="[
              isSmallHeight ? 'md:max-2xl:flex md:max-2xl:items-center' : ''
            ]">
              <div :class="[
                'flex transition-all',
                isSmallHeight ? 'gap-x-3 md:max-2xl:absolute md:max-2xl:left-[130%] ' : 'internal-frame flex-col gap-y-1',
                !isActivePopupMenu && isSmallHeight ? 'md:max-2xl:translate-y-[1000%]' : '',
              ]">
                <!-- Affiliate Program Links -->
                <NuxtLink
                  v-for="link in secondaryLinks" :key="link.id"
                  :to="link.href"
                  @click="[toggleSidebarOf,isActivePopupMenu = !isActivePopupMenu]"
                  :class="[
                    'nav-pill flex items-center relative 2xl:px-4 h-[43px] transition-all duration-200 group text-gray-400 hover:text-white md:max-2xl:justify-center max-md:px-4',
                    isSmallHeight ? 'border-custom justify-center flex-1 md:w-[54px] bg-[var(--color-bg-secondary)]' : 'arrow gap-x-2',
                    link.active 
                      ? 'is-active text-white' 
                      : ''
                  ]"
                > 
                  <SvgIcon :name="link.iconName" :size="24" class="w-6 inline-block align-middle" />
                  <span :class="['md:max-2xl:hidden',isSmallHeight ? 'hidden' : '']">{{ link.name }}</span>
                  <span v-if="link.id === 'updates'" 
                    class="w-6 h-6 px-2 py-[2px] bg-[#e02c7d] rounded-full text-white md:max-2xl:hidden"
                    :class="isSmallHeight ? 'hidden' : ''"
                  >
                    {{ link.badgeNumber }}
                  </span>
                </NuxtLink>
              </div>

              <button v-if="isSmallHeight" 
                class="border-custom nav-pill items-center relative 2xl:px-4 h-[43px] transition-all duration-200 group text-3xl text-gray-400 hover:text-white max-2xl:justify-center 2xl:hidden justify-center flex-1 max-md:hidden"
                @click="isActivePopupMenu = !isActivePopupMenu"
              >
                <span class="absolute -top-[17%] ">...</span>
              </button>
              
            </div>
            <!-- Logout Button (Outside the frame) -->
            <div v-if="isAuthenticated ">
              <div class="border-custom">
                <button 
                  @click="handleExit"
                  class="nav-pill w-full flex items-center justify-center gap-x-2 py-[10px] text-sm text-muted transition-colors duration-200 text-gray-400 hover:text-white"
                >
                  <SvgIcon name="logout" :size="24" fill="currentColor" />
                  <span class="md:max-2xl:hidden">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
  

  <!-- Burger Button -->
  <aside :class="[' md:hidden container mx-auto flex items-center max-md:justify-between',
    showHeaderActions ? ' px-8 max-sm:px-4' : ''
  ]">
  
    <div class="flex items-center gap-x-3">

      <button 
        @click="toggleSidebar"
        class="burger-menu border-custom  bg-[var(--color-bg-secondary)]"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    
      <div class="">
        <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
          <img src="/full-logo.svg" alt="GODDASS.AI" class="max-sm:hidden"/>
          <img src="/logo.svg" alt="GODDASS.AI" class="h-[44px] sm:hidden">
        </NuxtLink>
      </div>
      
    </div>

    <div v-if="showHeaderActions">
      <HeaderActions/>
    </div>

  </aside>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import ModelSelector from '@/components/ModelSelector.vue'
import { useAuthNavigation } from '@/composables/useAuthNavigation'
import HeaderActions from './HeaderActions.vue'

const props = defineProps({
  sidebar: {
    type: Object,
    default: () => ({})
  }
})

// Access injected properties from the auth plugin with fallbacks
const nuxtApp = useNuxtApp()
const isAuthenticated = computed(() => nuxtApp.$isAuthenticated?.value || false)
const auth = computed(() => nuxtApp.$auth || null)

// Get current user
const user = useState('user', () => null)

// Get current route
const route = useRoute()

// Use auth navigation composable
const { handleNavClick: handleNavClickBase, handlePremiumClick: handlePremiumClickBase } = useAuthNavigation()

// Use sidebar data from props or fallback to defaults
const navigationItems = computed(() => {
  const items = props.sidebar?.navigationItems || [
    {
      id: 'models',
      name: 'Models',
      href: '/',
      iconName: 'models' 
    },
    {
      id: 'generator',
      name: 'Generator',
      href: '/generator',
      iconName: 'generator' 
    },
    {
      id: 'chat',
      name: 'Chat',
      href: '/chat',
      iconName: 'chat'
    },
    {
      id: 'favorites',
      name: 'Favorites',
      href: '/favorites',
      iconName: 'favorites'
    },
    {
      id: 'private',
      name: 'Private content',
      href: '/private',
      iconName: 'private'
    }
  ]
  
  // Mark current route as active
  return items.map(item => ({
    ...item,
    active: route.path === item.href
  }))
})

const secondaryLinks = computed(() => {
  const links = props.sidebar?.secondaryLinks || [
    {
      id: 'affiliate',
      name: 'Affiliate',
      href: '/affiliate',
      iconName: 'affiliate'
    },
    {
      id: 'updates',
      name: 'Updates',
      href: '/updates',
      iconName: 'updates',
      badgeNumber: 1
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '/settings',
      iconName: 'settings'
    }
  ]

  return links.map(link => ({
    ...link,
    active: route.path === link.href
  }))
})

const handleExit = async () => {
  try {
    if (process.client) {
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
    }
    
    // Call the auth logout method
    if (auth.value?.logout) {
      await auth.value.logout()
    }
    
    // Redirect to home page after logout
    await navigateTo('/')
        
    // Optional: Show success message
    console.log('Successfully logged out')
    
  } catch (error) {
    console.error('Logout error:', error)
    
    // Even if logout fails, redirect to home page
    try {
      await navigateTo('/')
    } catch (navError) {
      console.error('Navigation error:', navError)
    }
  }
}

const isSmallHeight = ref(false)

const checkHeight = () => {
  isSmallHeight.value = window.innerHeight <= 800
}

onMounted(() => {
  checkHeight()
  window.addEventListener('resize', checkHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkHeight)
})

const IsMiniHeight = ref(false)

const checkHeightMini = () => {
  IsMiniHeight.value = window.innerHeight <= 690
}

onMounted(() => {
  checkHeightMini()
  window.addEventListener('resize', checkHeightMini)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkHeightMini)
})

const isSidebarActive = ref(false)

const toggleSidebar = () => {
  isSidebarActive.value = !isSidebarActive.value
}

const toggleSidebarOf = () => {
  if (isSidebarActive.value) {
    isSidebarActive.value = !isSidebarActive.value
  }
}

// Handle navigation item clicks
const handleNavClick = async (item) => {
  // Close sidebar on mobile
  toggleSidebarOf()
  
  // Handle auth-protected navigation
  await handleNavClickBase(item, user.value)
}

// Handle premium button click
const handlePremiumClick = async () => {
  // Close sidebar on mobile
  toggleSidebarOf()
  
  // Handle auth-protected navigation
  await handlePremiumClickBase(user.value)
}

const excludedPaths = ['/subscribe', '/buy-tokens']

const showHeaderActions = computed(() => !excludedPaths.includes(route.path))

const isActivePopupMenu = ref(false)
</script>

<style scoped>
/* Menu fade transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* behind-text gradient pill for hover/active */

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

.arrow::after {
  content: "";
  position: absolute;
  display: inline-flex;
  width: 24px;
  height: 24px;
  right: 5%;
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  opacity: 0;
  background: url('/arrow.svg') no-repeat center/contain; 
  pointer-events: none;
  transition: opacity 280ms ease, transform 320ms cubic-bezier(.2,.9,.2,1);
  will-change: opacity, transform;
  z-index: 1;
}

.arrow.is-active::after,
.is-active.arrow::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0); 
}

.premium-button {
  @apply w-full h-[42px] px-8 rounded-xl flex items-center justify-center text-white font-medium transition-all duration-200 ease-in-out cursor-pointer;
  
  /* Background gradient */
  background: linear-gradient(180deg, #D946EF 0%, #6366F1 100%);
  
  /* Border */
  border: 1px solid rgba(255, 255, 255, 0.7);
  
  /* Shadow */
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  
  /* Hover effects */
  &:hover {
    background: radial-gradient(circle at bottom, #480C39 0%, #1D0628 100%) padding-box;
    transform: scale(1.03);
    border-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 25px rgba(255, 0, 255, 0.4);
  }
  
  /* Active/Click effects */
  &:active {
    transform: scale(0.97);
    box-shadow: 
      0 0 20px rgba(255, 0, 255, 0.3),
      inset 0 2px 4px rgba(0, 0, 0, 0.3);
    background: radial-gradient(circle at bottom, #480C39 0%, #1D0628 100%) padding-box;
  }
  
  /* Focus state for accessibility */
  &:focus {
    outline: none;
    box-shadow: 
      0 0 20px rgba(255, 0, 255, 0.3),
      0 0 0 3px rgba(255, 255, 255, 0.3);
  }
}

.internal-frame {
  border: 1px solid var(--internal-frame-border);
  border-radius: var(--internal-frame-radius);
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
}

.internal-frame:hover {
  border-color: rgba(255, 255, 255, 0.15);
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
  transition: all 0.3s ease;
}

.burger-menu span {
  width: 24px;
  height: 2px;
  background-color: #a854c4;
  border-radius: 9999px;    
  transition: all 0.3s ease;
}

.mini-burger {
  width: 44px !important;
  height: 44px !important;
  padding: 12px !important;
}

.burger-menu.accent span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.burger-menu.accent span:nth-child(2) {
  transform: translateY(-8px) rotate(-45deg);
}

.mini-burger.accent span:nth-child(1) {
  transform: translateY(7px) translateX(-3px) rotate(45deg);
}

.mini-burger.accent span:nth-child(2) {
  transform: translateY(-9px) translateX(-3px) rotate(-45deg);
}

.active {
  transform: none !important;
  inset: 0px;
  transition: transform 200ms;
}

@media (max-width: 1536px) {
  .arrow::after {
    display: none;

  }
  .internal-frame {
    padding-inline: 9px;
  }
}

@media (max-width: 768px) {
  .internal-frame {
    padding-inline: 1rem;
  }
}
</style>

