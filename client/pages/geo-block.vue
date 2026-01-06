<template>
  <StatusPage routeKey="/geo-block" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Site Not Available - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
