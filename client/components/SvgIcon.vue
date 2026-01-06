<template>
  <svg
    :class="svgClass"
    :width="size"
    :height="size"
    :fill="fill"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="`${spritePath}#icon-${name}`"></use>
  </svg>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24
  },
  fill: {
    type: String,
    default: 'currentColor'
  },
  class: {
    type: [String, Array, Object],
    default: ''
  }
})

const spritePath = '/icons-sprite.svg'
const svgClass = computed(() => props.class)
</script>
