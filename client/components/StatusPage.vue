<template>
  <main class="min-h-screen relative overflow-hidden bg-[#180A24]">
    <!-- Background radial vignette glow -->
    <div class="absolute inset-0 bg-gradient-radial from-[#2B104A]/60 via-transparent to-transparent"></div>
    
    <!-- Bottom vignette -->
    <div class="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-black/35 to-transparent"></div>
    
    <!-- Centered content wrapper -->
    <section class="relative max-w-[940px] mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center sm:px-4">
      <!-- Background image -->
      <div class="absolute inset-0 flex items-center justify-center opacity-20 animate-fade-in-delay-1">
        <img 
          :src="statusContent.imageSrc" 
          :alt="`${statusContent.title[0]} ${statusContent.title[1]}`"
          class="max-sm:w-[250px] drop-shadow-[0_20px_60px_rgba(151,71,255,.35)]"
        />
      </div>
      
      <!-- Headline (H1) -->
      <h1 class="font-medium text-[40px] text-center leading-tight tracking-tight animate-fade-in mb-[450px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] max-sm:text-2xl max-sm:mb-[300px]">
        {{ statusContent.title[0] }}
        <span class="bg-gradient-to-r from-[#FF6AB2] to-[#8A5BFF] text-transparent bg-clip-text">
          {{ statusContent.title[1] }}
        </span>
        <span v-if="statusContent.titleSuffix">{{ statusContent.titleSuffix }}</span>
      </h1>

      
      <!-- Subcopy -->
      <p class="text-white/90 text-center text-xl mb-8 animate-fade-in-delay-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-sm:text-xs">
        {{ statusContent.subcopy }}
      </p>
      
      <!-- CTA button -->
      <NuxtLink 
        to="/"
        class="animate-fade-in-delay-3 w-[326px] max-[350px]:w-full"
      >
        <PrimaryButton>
          Go to Home page
        </PrimaryButton>
      </NuxtLink>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

// Props
const props = defineProps({
  routeKey: {
    type: String,
    required: true
  }
})

// Status content map
const STATUS_CONTENT = {
  "/404": {
    httpStatus: 404,
    title: ["Ops!", "Page Not Found"],
    subcopy: "The page you're looking for doesn't exist.",
    bubbles: [
      { side: "left", text: "👋 What happened??" },
      { side: "right", text: "💀 Error 404!" }
    ],
    imageSrc: "/images/status/404.png",
  },
  "/500": {
    httpStatus: 500,
    title: ["Oops!", "Internal Server Error"],
    subcopy: "Something went wrong on our end.",
    bubbles: [
      { side: "left", text: "🛠 Trying to fix it…" },
      { side: "right", text: "🔥 Error 500" }
    ],
    imageSrc: "/images/status/500.png",
  },
  "/501": {
    httpStatus: 501,
    title: ["Service is", "temporarily unavailable"],
    subcopy: "We apologize for the inconvenience, the site is under maintenance.",
    bubbles: [
      { side: "left", text: "🧪 Work in progress…" },
      { side: "right", text: "🧰 501 Not Implemented" }
    ],
    imageSrc: "/images/status/501.png",
  },
  "/503": {
    httpStatus: 503,
    title: ["Service", "Unavailable"],
    subcopy: "Please try again a bit later.",
    bubbles: [
      { side: "left", text: "⏳ One moment…" },
      { side: "right", text: "🚧 503 in progress" }
    ],
    imageSrc: "/images/status/503.png",
  },
  "/geo-block": {
    httpStatus: 451,
    title: ["The site is", "not available"],
    titleSuffix: " in your country.",
    subcopy: "The page you're looking for doesn't exist.",
    bubbles: [
      { side: "left", text: "👋 Hello, you are here??" },
      { side: "right", text: "🙅 I won't be there(" }
    ],
    imageSrc: "/images/status/geo-block.png",
  },
  "/maintenance": {
    httpStatus: 503,
    title: ["The service", "is undergoing technical work."],
    subcopy: "The page you're looking for doesn't exist.",
    bubbles: [
      { side: "left", text: "⏳ I'm waiting…" },
      { side: "right", text: "Oops 🤯" }
    ],
    imageSrc: "/images/status/maintenance.png",
  },
}

// Computed property to get content based on route
const { app: appConfig } = useRuntimeConfig()
const baseURL = appConfig?.baseURL || '/'
const statusContent = computed(() => {
  const content = STATUS_CONTENT[props.routeKey] || STATUS_CONTENT["/404"]
  const normalizedPath = (content.imageSrc || '').replace(/^\//, '')
  return {
    ...content,
    imageSrc: `${baseURL}${normalizedPath}`
  }
})

// Set HTTP status code
if (process.client) {
  // Set document title
  document.title = `${statusContent.value.title[0]} ${statusContent.value.title[1]} - GODDASS.AI`
  
  // Add meta robots tag for non-200 routes
  const meta = document.createElement('meta')
  meta.name = 'robots'
  meta.content = 'noindex'
  document.head.appendChild(meta)
}
</script>

<style scoped>
/* Custom radial gradient */
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-stops));
}

/* Fade-in animations */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.6s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 0.6s ease-out 0.4s forwards;
  opacity: 0;
}

/* Floating animation for bubbles */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 3s ease-in-out 1.5s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}
</style>
