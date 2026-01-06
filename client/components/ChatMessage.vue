<template>
  <div 
    :class="[
      'flex',
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div 
      :class="[
        'max-w-full px-4 py-2 rounded-2xl',
        message.sender === 'user' 
          ? 'bg-pink-500 text-white rounded-br-none' 
          : 'bg-white/10 backdrop-blur-sm text-white rounded-bl-none'
      ]"
    >
      <div class="flex items-start space-x-2">
        <div v-if="message.sender === 'ai'" class="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center flex-shrink-0 mt-1">
          <span class="text-white text-xs">{{ avatar || '👩' }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm break-words whitespace-pre-wrap line-clamp-2">{{ message.text }}</p>
          <p class="text-xs opacity-70 mt-1">{{ formatTime(message.timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  },
  avatar: {
    type: String,
    default: '👩'
  }
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>