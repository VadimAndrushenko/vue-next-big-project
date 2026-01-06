<template>
  <InfoTemplate type="terms-of-service" :key="$route.fullPath" />
  
</template>

<script setup>
definePageMeta({ layout: 'headless' })
import InfoTemplate from '@/components/InfoTemplate.vue'
</script>


