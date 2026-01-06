<template>
  <footer class="text-white mt-16">
    <!-- Main Footer Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Top Section: Logo + Brand + Social Icons -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 max-md:items-center">
        <!-- Logo and Brand Name (Left) -->
        <div class="flex items-center mb-6 md:mb-0">

          <!-- Brand Name -->
          <div class="flex justify-center">
            <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
              <img src="/full-logo.svg" alt="GODDASS.AI" class="h-8 w-auto" />
            </NuxtLink>
          </div>
        </div>

        <!-- Social Icons (Top Right) -->
        <div class="flex space-x-3">
          <a href="#facebook" aria-label="Facebook" class="social-icon">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#instagram" aria-label="Instagram" class="social-icon">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
            </svg>
          </a>
          <a href="#twitter" aria-label="X (Twitter)" class="social-icon">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#reddit" aria-label="Reddit" class="social-icon">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Floating Inner Card -->
      <div class="floating-card">
        <div class="flex flex-col gap-x-6 md:flex-row md:justify-between max-md:gap-y-6">
          <!-- Left Column -->
          <div class="flex md:flex-col justify-between text-sm md:gap-y-4 max-md:items-center max-md:justify-between max-md:gap-x-4 max-sm:text-xs">
            <!-- Row 1: Copyright -->
            <div>
              <p class="text-muted leading-relaxed">
                Copyright © 2025, Hedonism Games LTD. All rights reserved.<br>
                Apostolou Pavlou Ave 10, Paphos 8046
              </p>
            </div>
            <!-- Row 2: AI Generated Note -->
            <div>
              <p class="text-muted items-center flex">
                <span class="mr-2">🌸</span>
                All content in this website is AI-generated.
              </p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col gap-y-4 md:text-right max-md:text-center justify-between">
            <!-- Row 1: Footer Menu -->
            <div class="flex flex-wrap gap-3 md:gap-6 md:justify-end max-md:flex-col font-body text-sm max-sm:text-xs">
              <a href="/terms-of-service" class="text-muted hover:text-secondary transition-colors ">Terms of Service</a>
              <a href="/privacy-policy" class="text-muted hover:text-secondary transition-colors ">Privacy Policy</a>
              <a href="/cancellation-policy" class="text-muted hover:text-secondary transition-colors">Cancellation Policy</a>
              <a href="/complaint-policy" class="text-muted hover:text-secondary transition-colors ">Complaint Policy</a>
              <a href="/content-removal-policy" class="text-muted hover:text-secondary transition-colors">Content Removal Policy</a>
            </div>
            <!-- Row 2: Email -->
            <div>
              <a href="mailto:goddassai.support@gmail.com" class="text-2xl text-secondary font-medium hover:text-muted transition-colors font-body max-sm:text-[18px]">
                goddassai.support@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Strip: Payment Icons + Navigation Links -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-white/10">
        <!-- Payment Icons (Left) -->
        <div class="flex items-center space-x-3 mb-4 sm:mb-0">
          <div class="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span class="text-white font-bold text-xs">VISA</span>
          </div>
          <div class="w-12 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <div class="w-8 h-5 bg-white rounded-full flex items-center justify-center">
              <div class="w-6 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Navigation Links (Right) -->
        <div class="flex space-x-6">
          <a href="/news" class="text-white/80 hover:text-white transition-colors text-sm font-body">Blog</a>
          <a href="#categories" class="text-white/80 hover:text-white transition-colors text-sm font-body">Categories</a>
          <a href="#report" class="text-white/80 hover:text-white transition-colors text-sm font-body">Report Content</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  footer: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.social-icon {
  @apply w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm;
}

.floating-card {
  @apply bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-purple-900/30 border border-white/10;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-card {
    @apply p-4;
  }
}
</style>
