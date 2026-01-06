<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <!-- Big Smooth Color Spots -->
    <div 
      v-for="spot in colorSpots" 
      :key="spot.id"
      :class="[
        'absolute rounded-full',
        spot.type
      ]"
      :style="{
        left: spot.x + '%',
        top: spot.y + '%',
        width: spot.size + 'px',
        height: spot.size + 'px',
        animationDelay: spot.delay + 's',
        animationDuration: spot.duration + 's',
        opacity: 0
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Animation state
const colorSpots = ref([])

// Generate random number between min and max
const random = (min, max) => Math.random() * (max - min) + min

// Generate random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Color spot types - big smooth gradient spots
const spotTypes = [
  'spot-pink',      // Pink gradient spot
  'spot-purple',    // Purple gradient spot
  'spot-blue',      // Blue gradient spot
  'spot-magenta',   // Magenta gradient spot
  'spot-cyan'       // Cyan gradient spot
]

// Generate big smooth color spots
const generateColorSpots = () => {
  const newSpots = []
  
  // Reduced to 15 spots for cleaner look
  for (let i = 0; i < 15; i++) {
    newSpots.push({
      id: `spot-${Date.now()}-${i}`,
      x: random(-20, 120), // Allow spots to be partially off-screen
      y: random(-20, 120),
      size: random(300, 650), // Larger spots: 300-650px
      type: spotTypes[randomInt(0, spotTypes.length - 1)],
      delay: random(0, 10), // Spread out the delays more
      duration: random(20, 40) // Much slower animation for smoother effect
    })
  }
  
  return newSpots
}

// Store timeout IDs for cleanup
const spotTimeouts = ref([])

// Add a new color spot with automatic removal
const addColorSpot = (spot) => {
  // Add spot to array
  colorSpots.value.push(spot)
  
  // Calculate when this spot should be removed (delay + duration) in milliseconds
  const removeTime = (spot.delay + spot.duration) * 1000
  
  // Set timeout to remove this specific spot
  const timeoutId = setTimeout(() => {
    // Find and remove this specific spot by id
    const index = colorSpots.value.findIndex(s => s.id === spot.id)
    if (index !== -1) {
      colorSpots.value.splice(index, 1)
    }
    
    // Create a new spot to replace it
    const newSpot = {
      id: `spot-${Date.now()}-${Math.random()}`,
      x: random(-20, 120),
      y: random(-20, 120),
      size: random(300, 650),
      type: spotTypes[randomInt(0, spotTypes.length - 1)],
      delay: 0, // New spot starts immediately
      duration: random(20, 40)
    }
    addColorSpot(newSpot)
  }, removeTime)
  
  // Store timeout ID for cleanup
  spotTimeouts.value.push(timeoutId)
}

onMounted(() => {
  // Initial generation - create all spots
  const spots = generateColorSpots()
  spots.forEach(spot => {
    addColorSpot(spot)
  })
})

onUnmounted(() => {
  // Clear all timeouts
  spotTimeouts.value.forEach(timeoutId => clearTimeout(timeoutId))
  spotTimeouts.value = []
})
</script>

<style scoped>
/* Big Smooth Color Spot Styles with ultra-smooth transitions */
.spot-pink {
  background: radial-gradient(circle, rgba(217, 19, 108, 0.4) 0%, rgba(217, 19, 108, 0.2) 35%, rgba(217, 19, 108, 0.08) 60%, rgba(217, 19, 108, 0.02) 75%, transparent 90%);
  animation: spot-float-pink infinite cubic-bezier(0.4, 0, 0.6, 1);
  filter: blur(100px);
  transition: opacity 6s cubic-bezier(0.4, 0, 0.6, 1), transform 6s cubic-bezier(0.4, 0, 0.6, 1);
}

.spot-purple {
  background: radial-gradient(circle, rgba(83, 67, 95, 0.4) 0%, rgba(83, 67, 95, 0.2) 35%, rgba(83, 67, 95, 0.08) 60%, rgba(83, 67, 95, 0.02) 75%, transparent 90%);
  animation: spot-float-purple infinite cubic-bezier(0.4, 0, 0.6, 1);
  filter: blur(100px);
  transition: opacity 6s cubic-bezier(0.4, 0, 0.6, 1), transform 6s cubic-bezier(0.4, 0, 0.6, 1);
}

.spot-blue {
  background: radial-gradient(circle, rgba(91, 84, 196, 0.4) 0%, rgba(91, 84, 196, 0.2) 35%, rgba(91, 84, 196, 0.08) 60%, rgba(91, 84, 196, 0.02) 75%, transparent 90%);
  animation: spot-float-blue infinite cubic-bezier(0.4, 0, 0.6, 1);
  filter: blur(100px);
  transition: opacity 6s cubic-bezier(0.4, 0, 0.6, 1), transform 6s cubic-bezier(0.4, 0, 0.6, 1);
}

.spot-magenta {
  background: radial-gradient(circle, rgba(148, 111, 167, 0.4) 0%, rgba(148, 111, 167, 0.2) 35%, rgba(148, 111, 167, 0.08) 60%, rgba(148, 111, 167, 0.02) 75%, transparent 90%);
  animation: spot-float-magenta infinite cubic-bezier(0.4, 0, 0.6, 1);
  filter: blur(100px);
  transition: opacity 6s cubic-bezier(0.4, 0, 0.6, 1), transform 6s cubic-bezier(0.4, 0, 0.6, 1);
}

.spot-cyan {
  background: radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, rgba(217, 70, 239, 0.2) 35%, rgba(217, 70, 239, 0.08) 60%, rgba(217, 70, 239, 0.02) 75%, transparent 90%);
  animation: spot-float-cyan infinite cubic-bezier(0.4, 0, 0.6, 1);
  filter: blur(100px);
  transition: opacity 6s cubic-bezier(0.4, 0, 0.6, 1), transform 6s cubic-bezier(0.4, 0, 0.6, 1);
}

/* Ultra-smooth color spot animations with very gradual fading */
@keyframes spot-float-pink {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.85);
  }
  5% {
    opacity: 0.05;
  }
  15% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.35;
    transform: translate(15px, -20px) scale(0.95);
  }
  40% {
    opacity: 0.45;
    transform: translate(25px, -30px) scale(1.02);
  }
  50% {
    opacity: 0.5;
    transform: translate(30px, -35px) scale(1.05);
  }
  60% {
    opacity: 0.45;
    transform: translate(25px, -25px) scale(1);
  }
  75% {
    opacity: 0.35;
    transform: translate(15px, -15px) scale(0.93);
  }
  85% {
    opacity: 0.2;
  }
  95% {
    opacity: 0.05;
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.85);
  }
}

@keyframes spot-float-purple {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.85);
  }
  5% {
    opacity: 0.06;
  }
  15% {
    opacity: 0.22;
  }
  25% {
    opacity: 0.38;
    transform: translate(-18px, 15px) scale(0.96);
  }
  40% {
    opacity: 0.48;
    transform: translate(-28px, 25px) scale(1.03);
  }
  50% {
    opacity: 0.52;
    transform: translate(-35px, 30px) scale(1.08);
  }
  60% {
    opacity: 0.48;
    transform: translate(-28px, 22px) scale(1.02);
  }
  75% {
    opacity: 0.38;
    transform: translate(-18px, 12px) scale(0.94);
  }
  85% {
    opacity: 0.22;
  }
  95% {
    opacity: 0.06;
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.85);
  }
}

@keyframes spot-float-blue {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.88);
  }
  5% {
    opacity: 0.07;
  }
  15% {
    opacity: 0.24;
  }
  25% {
    opacity: 0.4;
    transform: translate(20px, 20px) scale(0.97);
  }
  40% {
    opacity: 0.5;
    transform: translate(30px, 30px) scale(1.05);
  }
  50% {
    opacity: 0.55;
    transform: translate(35px, 35px) scale(1.1);
  }
  60% {
    opacity: 0.5;
    transform: translate(30px, 28px) scale(1.04);
  }
  75% {
    opacity: 0.4;
    transform: translate(20px, 18px) scale(0.95);
  }
  85% {
    opacity: 0.24;
  }
  95% {
    opacity: 0.07;
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.88);
  }
}

@keyframes spot-float-magenta {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.83);
  }
  5% {
    opacity: 0.04;
  }
  15% {
    opacity: 0.18;
  }
  25% {
    opacity: 0.32;
    transform: translate(-15px, -22px) scale(0.93);
  }
  40% {
    opacity: 0.42;
    transform: translate(-25px, -32px) scale(1);
  }
  50% {
    opacity: 0.47;
    transform: translate(-30px, -38px) scale(1.04);
  }
  60% {
    opacity: 0.42;
    transform: translate(-25px, -30px) scale(0.98);
  }
  75% {
    opacity: 0.32;
    transform: translate(-15px, -18px) scale(0.91);
  }
  85% {
    opacity: 0.18;
  }
  95% {
    opacity: 0.04;
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.83);
  }
}

@keyframes spot-float-cyan {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.87);
  }
  5% {
    opacity: 0.06;
  }
  15% {
    opacity: 0.21;
  }
  25% {
    opacity: 0.37;
    transform: translate(22px, -18px) scale(0.98);
  }
  40% {
    opacity: 0.47;
    transform: translate(32px, -28px) scale(1.04);
  }
  50% {
    opacity: 0.53;
    transform: translate(38px, -33px) scale(1.09);
  }
  60% {
    opacity: 0.47;
    transform: translate(32px, -26px) scale(1.02);
  }
  75% {
    opacity: 0.37;
    transform: translate(22px, -16px) scale(0.96);
  }
  85% {
    opacity: 0.21;
  }
  95% {
    opacity: 0.06;
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.87);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* Reduce blur slightly on mobile for better performance */
  .spot-pink,
  .spot-purple,
  .spot-blue,
  .spot-magenta,
  .spot-cyan {
    filter: blur(50px);
  }
}
</style>
