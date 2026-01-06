<template>
  <StatusPage routeKey="/501" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Feature Not Implemented - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
