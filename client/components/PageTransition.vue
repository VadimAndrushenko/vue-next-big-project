<template>
  <Transition
    name="page"
    mode="out-in"
  >
    <div :key="$route.fullPath" class="page-content">
      <slot />
    </div>
  </Transition>
</template>

<script setup>
// Simplified PageTransition component using only CSS transitions
</script>

<style scoped>
.page-content {
  /* min-height: 100vh; */
  width: 100%;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Ensure smooth transitions for all content */
.page-content * {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
