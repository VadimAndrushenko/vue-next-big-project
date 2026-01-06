<template>
  <div class="min-h-screen">
    <!-- Sidebar -->
    <AppSidebar :sidebar="sidebar" />
    
    <!-- Main Content -->
    <div class="ml-64">
      <!-- Header -->
      <AppHeader :navigation="navigation" />
      
      <!-- Page Content -->
      <main class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-4xl">
          <PageTransition>
            <slot />
          </PageTransition>
        </div>
      </main>
      
      <!-- Footer -->
      <AppFooter :footer="footer" />
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTransition from '@/components/PageTransition.vue'

// Use the API data composable
const {
  navigation,
  sidebar,
  footer
} = useApiData()
</script>
