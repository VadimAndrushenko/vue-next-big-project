<template>
  <InfoTemplate :type="infoType" :key="$route.fullPath" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InfoTemplate from '@/components/InfoTemplate.vue'

definePageMeta({
  layout: 'headless',
  alias: [
    '/terms-of-service',
    '/privacy-policy',
    '/cancellation-policy',
    '/complaint-policy',
    '/content-removal-policy'
  ]
})

// Reactive query param
const route = useRoute()
const infoType = computed(() => {
  if (route.query.type) return route.query.type
  // derive from path for alias routes
  const path = route.path
  if (path.endsWith('/terms-of-service')) return 'terms-of-service'
  if (path.endsWith('/privacy-policy')) return 'privacy-policy'
  if (path.endsWith('/cancellation-policy')) return 'cancellation-policy'
  if (path.endsWith('/complaint-policy')) return 'complaint-policy'
  if (path.endsWith('/content-removal-policy')) return 'content-removal-policy'
  return undefined
})

</script>


