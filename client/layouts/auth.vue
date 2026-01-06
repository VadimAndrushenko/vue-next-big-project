<template>
  <div class="min-h-screen">
    <!-- Page Content -->
    <main class="min-h-screen">
      <PageTransition>
        <slot />
      </PageTransition>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTransition from '@/components/PageTransition.vue'

// Use the API data composable
const {
  navigation,
  footer
} = useApiData()
</script>
