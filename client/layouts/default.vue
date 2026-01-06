<template>
  <div class="min-h-screen py-4">
    <!-- Sidebar -->
    <AppSidebar :sidebar="sidebar" />
    
    <!-- Main Content -->
    <div class="2xl:ml-[295px] md:max-2xl:ml-[120px]">
      <!-- Header -->
      <AppHeader 
        v-if="!hideHeader" 
        :navigation="navigation"
        class="max-xl:hidden"
      />
      
      <!-- Page Content -->
      <main class="min-h-screen">
        <PageTransition>
          <slot />
        </PageTransition>
      </main>
      
      <!-- Footer -->
      <AppFooter :footer="footer" />
    </div>
    
    <!-- Global Auth Modal -->
    <AuthModal
      :is-open="isOpen"
      :mode="mode"
      :is-loading="isLoading"
      @close="closeModal"
      @login="onLogin"
      @register="onRegister"
      @social-login="onSocialLogin"
    />
    
    <!-- Global Upgrade Modal -->
    <UpgradeModal 
      :is-open="isUpgradeOpen" 
      @close="closeUpgradeModal" 
      @upgrade="onUpgrade"
    />
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTransition from '@/components/PageTransition.vue'
import { useAuthModal } from '@/composables/useAuthModal'
import UpgradeModal from '@/components/UpgradeModal.vue'
import { useUpgradeModal } from '@/composables/useUpgradeModal'

// Use the API data composable
const {
  navigation,
  sidebar,
  footer
} = useApiData()

// Use auth modal composable
const {
  isOpen,
  mode,
  isLoading,
  closeModal,
  onLogin,
  onRegister,
  onSocialLogin
} = useAuthModal()

// Upgrade modal
const {
  isOpen: isUpgradeOpen,
  openUpgradeModal,
  closeUpgradeModal,
  onUpgrade
} = useUpgradeModal()

const route = useRoute()
const hideHeader = computed(() => !!route.meta?.hideHeader)
const hideHeaderNav = computed(() => {
  if (route.meta?.hideHeaderNav) return true
  const path = route.path || ''
  // Force-hide nav on info and news pages
  const policyPaths = ['/terms-of-service', '/privacy-policy', '/cancellation-policy', '/complaint-policy', '/content-removal-policy']
  if (path.startsWith('/news') || path.startsWith('/info') || policyPaths.includes(path) || path === '/updates' || path === '/affiliate') {
    return true
  }
  return false
})
const headerTitle = computed(() => {
  if (route.meta?.headerTitle) return route.meta.headerTitle
  const path = route.path || ''
  const map = {
    '/terms-of-service': 'Terms of Service',
    '/privacy-policy': 'Privacy Policy',
    '/cancellation-policy': 'Cancellation Policy',
    '/complaint-policy': 'Complaint Policy',
    '/content-removal-policy': 'Content Removal Policy',
    '/news': 'News',
    '/affiliate': 'Affiliate Program'
  }
  if (path.startsWith('/news/')) return 'Article'
  return map[path] || ''
})

const headerSubtitle = computed(() => {
  if (route.meta?.headerSubtitle) return route.meta.headerSubtitle
  const path = route.path || ''
  const map = {
    '/terms-of-service': 'Private content version: 10th of September, 2025',
    '/privacy-policy': 'Last updated: 10th of September, 2025',
    '/cancellation-policy': 'Effective: 10th of September, 2025',
    '/complaint-policy': 'How to submit a complaint and what to expect',
    '/content-removal-policy': 'Guidelines for requesting content takedowns',
    '/affiliate': 'Earn money by promoting GODDASS.AI to your audience'
  }
  return map[path] || ''
})

</script>
