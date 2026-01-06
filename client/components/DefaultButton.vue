<template>
  <button
    :type="type"
    :disabled="disabled"
    class="default-btn border border-[#3A2B41] sm:w-[132px] sm:py-[18px] max-sm:py-[14px] max-sm:w-[80px]"
    @click="$emit('click', $event)"
  >
    <span class="default-btn__label"><slot /></span>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>

<style scoped>
.default-btn {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--body-5, #11041D);
  transition: opacity 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out;
}

.default-btn__label {
  color: var(--body-1, #FAFAFA);
  text-align: center;
  font-family: "Open Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */
  transition: color 150ms ease-in-out;
}

.default-btn:hover:not(:disabled) .default-btn__label {
  color: var(--body-2, #A854C4);
}

.default-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.default-btn:active:not(:disabled) {
  border-radius: 16px;
  border: 1px solid var(--gr-stroke-bg-gr, #946FA7);
  background: var(--body-5, #11041D);
}
</style>


