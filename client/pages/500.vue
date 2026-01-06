<template>
  <StatusPage routeKey="/500" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Internal Server Error - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
