<template>
  <div class="bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
    <div class="flex flex-col gap-4">
      <div class="flex-1">
        <textarea 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @keydown.enter.exact.prevent="$emit('send')"
          @keydown.enter.shift.exact.prevent="handleShiftEnter"
          type="text" 
          placeholder="Type your message..."
          rows="2"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none min-h-[60px] max-h-[120px] overflow-y-auto"
        ></textarea>
      </div>
      <PrimaryButton 
        :height="50"
        @click="$emit('send')"
        :disabled="!modelValue.trim() || disabled"
      >
        Ask
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'send'])

const handleShiftEnter = (event) => {
  const cursorPosition = event.target.selectionStart;
  const currentValue = event.target.value;
  const newValue = currentValue.substring(0, cursorPosition) + '\n' + currentValue.substring(cursorPosition);

  event.target.value = newValue;
  
  event.target.selectionStart = cursorPosition + 1;
  event.target.selectionEnd = cursorPosition + 1;
  
  defineEmits(['update:modelValue'])(newValue);
}
</script>