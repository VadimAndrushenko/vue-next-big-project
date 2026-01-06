// Shared chat session logic used by classic and interactive modes
// NOTE: Currently uses mocked behavior. Swap internals with real API calls later.

export const useChat = () => {
  const messages = ref([])
  const loading = ref(true)
  const error = ref(null)
  const isTyping = ref(false)

  const initialize = async (character) => {
    try {
      loading.value = true
      // Simulate fetching conversation; with API, load history here
      const welcomeMessage = {
        id: Date.now(),
        role: 'assistant',
        text: `Hi there! I'm ${character?.name || 'Sara'}. I'm so glad you chose to chat with me! How are you doing today?`,
        createdAt: new Date().toISOString()
      }
      messages.value = [welcomeMessage]
      loading.value = false
    } catch (e) {
      error.value = 'Failed to load conversation'
      loading.value = false
    }
  }

  const send = async (text) => {
    const clean = (text || '').trim()
    if (!clean) return
    const userMsg = { id: Date.now(), role: 'user', text: clean, createdAt: new Date().toISOString() }
    messages.value.push(userMsg)

    // Simulate request; replace with POST /api/chat/:id/messages
    isTyping.value = true
    await new Promise(r => setTimeout(r, 800))
    messages.value.push({ id: Date.now() + 1, role: 'assistant', text: "That's interesting! Tell me more ✨", createdAt: new Date().toISOString() })
    isTyping.value = false
  }

  const clear = () => { messages.value = [] }

  return { messages, loading, error, isTyping, initialize, send, clear }
}



