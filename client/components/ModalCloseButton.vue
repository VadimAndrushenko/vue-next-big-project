<template>
  <button
    @click="$emit('click')"
    class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
    aria-label="Close modal"
  >
    <div class="burger-menu border-custom bg-[var(--color-bg-primary)] accent">
      <span></span>
      <span></span>
    </div>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.burger-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  will-change: background, transform, box-shadow;
}

.burger-menu span {
  width: 14px;
  height: 2px;
  background-color: #a854c4;
  border-radius: 9999px;    
  transition: background-color 200ms ease, transform 200ms ease, opacity 200ms ease;
  will-change: background-color, transform, opacity;
}

.burger-menu span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.burger-menu span:nth-child(2) {
  transform: translateY(-6px) rotate(-45deg);
}

button:hover .burger-menu {
  background: radial-gradient(circle at bottom, #480C39 0%, #1D0628 100%) padding-box;
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.25);
}

button:active .burger-menu {
  transform: scale(0.97);
  box-shadow: 0 0 12px rgba(255, 0, 255, 0.2), inset 0 2px 4px rgba(0,0,0,0.3);
}

button:focus .burger-menu {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 0 18px rgba(255, 0, 255, 0.25);
}

.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}
</style>


