import { ref, readonly } from 'vue'

const isOpen = ref(false)

export const useUpgradeModal = () => {
  const openUpgradeModal = () => { isOpen.value = true }
  const closeUpgradeModal = () => { isOpen.value = false }

  const onUpgrade = async () => {
    // Redirect to subscribe page for now
    await navigateTo('/subscribe')
  }

  return {
    isOpen: readonly(isOpen),
    openUpgradeModal,
    closeUpgradeModal,
    onUpgrade
  }
}


