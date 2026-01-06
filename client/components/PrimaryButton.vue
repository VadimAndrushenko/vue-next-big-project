<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['gradient-btn', 'primary-btn']"
    :style="computedStyleWithWidth"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span aria-hidden="true" class="gradient-btn__glow"></span>
    <span class="gradient-btn__label"><slot /></span>
  </button>
  
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  fullWidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  height: { type: [Number, String], default: null }
})

const computedStyleWithWidth = computed(() => {
  const style = {}
  if (props.fullWidth) {
    style.width = '100%'
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return Object.keys(style).length ? style : undefined
})

defineEmits(['click'])
</script>

<style scoped>
.gradient-btn {
  display: flex;
  width: 100%;
  height: 60px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 16px;
  /* Gradient border using CSS variables */
  border: 1px solid transparent;
  background:
    radial-gradient(297.41% 215.23% at 54.74% -32.5%, #E02C7D 0%, #5B54C4 100%) padding-box,
    var(--gr-stroke-button-or-decor-gr, linear-gradient(180deg, #FFF 0%, #A854C4 100%)) border-box;
  box-shadow: 0 0 24px 0 rgba(255, 255, 255, 0.20);
  color: #fff;
  transition: transform 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out;
  position: relative;
  overflow: visible;
}

/* Hover: smoothly hide the highlight glow */
.gradient-btn:hover:not(:disabled) .gradient-btn__glow { opacity: 0; }

/* Hover: apply specified border/background styles */
.gradient-btn:hover:not(:disabled) {
  border-radius: 16px;
  /* Use layered backgrounds to respect gradient border variable */
  border: 1px solid transparent;
  background:
    radial-gradient(297.41% 215.23% at 54.74% -32.5%, #E02C7D 0%, #5B54C4 100%) padding-box,
    var(--gr-stroke-button-or-decor-gr, #FFF) border-box;
}

.gradient-btn:active:not(:disabled) {
  border-radius: 16px;
  /* Click effect: simplify to radial gradient fill */
  background: radial-gradient(297.41% 215.23% at 54.74% -32.5%, #E02C7D 0%, #5B54C4 100%);
  transform: scale(0.97);
}

.gradient-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gradient-btn__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  height: 24px;
  flex-shrink: 0;
  color: var(--body-1, #FAFAFA);
  text-align: center;
  font-family: "Open Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  position: relative; z-index: 1;
}

.gradient-btn__glow {
  position: absolute;
  inset: -6px; /* reduced from -12px to -6px (50% smaller area) */
  content: "";
  pointer-events: none;
  background: var(--gr-body-decor-gr, linear-gradient(180deg, #E02C7D 0%, #5B54C4 100%));
  opacity: 0.6;
  filter: blur(15px); /* reduced from 30px to 15px (50% smaller blur) */
  border-radius: 18px; /* reduced from 24px to 18px (25% smaller radius) */
  z-index: 0;
  transition: opacity 200ms ease-in-out;
}

/* Stronger glow (2x of base) for primary button usage */
.primary-btn .gradient-btn__glow {
  opacity: 0.6;
  filter: blur(15px); /* reduced from 30px to 15px (50% smaller blur) */
  inset: -6px; /* reduced from -12px to -6px (50% smaller area) */
  border-radius: 18px; /* reduced from 24px to 18px (25% smaller radius) */
}

/* 3x smaller soft highlight for specific use cases */
.glow-small .gradient-btn__glow {
  filter: blur(10px);
  inset: -4px;
}

</style>
