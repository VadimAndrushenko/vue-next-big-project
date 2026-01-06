<template>
  <div :class="[
    $route.name === 'chat' ? 'max-lg:py-4' : 'py-4'
  ]">
    <!-- Sidebar -->
    <AppSidebar :sidebar="sidebar" />
    
    <!-- Main Content -->
    <div class="2xl:ml-[295px] md:max-2xl:ml-[120px]">
      <!-- Page Content (no header) -->
      <main class="">
        <PageTransition>
          <slot />
        </PageTransition>
      </main>
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
import AppFooter from '@/components/AppFooter.vue'
import PageTransition from '@/components/PageTransition.vue'
import { useAuthModal } from '@/composables/useAuthModal'
import UpgradeModal from '@/components/UpgradeModal.vue'
import { useUpgradeModal } from '@/composables/useUpgradeModal'

// Use the API data composable
const {
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
</script>

