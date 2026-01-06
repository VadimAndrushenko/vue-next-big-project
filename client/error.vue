<template>
  <StatusPage :routeKey="errorRouteKey" />
</template>

<script setup>
import StatusPage from '~/components/StatusPage.vue'

// Get the error from Nuxt
const error = useError()

// Map error status codes to route keys
const errorRouteMap = {
  400: '/404',
  404: '/404',
  500: '/500',
  501: '/501',
  503: '/503'
}

// Compute the route key based on error status
const errorRouteKey = computed(() => {
  const status = error.value?.statusCode || 404
  return errorRouteMap[status] || '/404'
})

// Set page meta
definePageMeta({
  layout: 'empty'
})

// Set head meta
useHead({
  title: 'Error - GODDASS.AI',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
