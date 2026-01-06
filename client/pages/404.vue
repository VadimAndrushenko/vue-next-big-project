<template>
  <StatusPage routeKey="/404" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Page Not Found - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
