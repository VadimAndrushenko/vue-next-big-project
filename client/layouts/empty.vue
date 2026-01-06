<template>
  <div class="min-h-screen">
    <PageTransition>
      <slot />
    </PageTransition>
  </div>
</template>

<script setup>
import PageTransition from '@/components/PageTransition.vue'

// This empty layout provides a minimal structure
// while allowing for future additions like meta tags and analytics
</script>
