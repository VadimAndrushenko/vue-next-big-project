<template>
  <StatusPage routeKey="/503" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Service Unavailable - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
