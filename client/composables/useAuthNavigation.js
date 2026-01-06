import { useAuthModal } from './useAuthModal'
import { useUpgradeModal } from './useUpgradeModal'

// Routes that require authentication
const protectedRoutes = [
  '/models',
  '/generator', 
  '/chat',
  '/favorites',
  '/private',
  '/subscribe',
  '/settings'
]

export const useAuthNavigation = () => {
  const { openLoginModal, openRegisterModal } = useAuthModal()
  const { openUpgradeModal } = useUpgradeModal()
  
  // Check if a route requires authentication
  const requiresAuth = (route) => {
    return protectedRoutes.some(protectedRoute => 
      route.startsWith(protectedRoute)
    )
  }
  
  // Handle navigation with auth check
  const navigateWithAuth = async (route, user) => {
    // If route requires auth and user is not authenticated
    if (requiresAuth(route) && !user) {
      // Open login modal instead of navigating
      openLoginModal()
      return false // Navigation was blocked
    }
    
    // If user is authenticated or route doesn't require auth, navigate normally
    await navigateTo(route)
    return true // Navigation was successful
  }
  
  // Handle click on navigation item
  const handleNavClick = async (item, user) => {
    // Close sidebar if it's open
    if (typeof window !== 'undefined' && window.innerWidth < 1536) { // 2xl breakpoint
      // This will be handled by the component
    }
    
    // Check if navigation requires auth
    if (requiresAuth(item.href) && !user) {
      // Open login modal
      openLoginModal()
      return false
    }

    // If authenticated and clicking Private content, check premium status
    if (user && (item.id === 'private' || item.href === '/private')) {
      // If user is not premium, show upgrade modal
      if (!user.isPremium) {
        openUpgradeModal()
        return false
      }
      // If user is premium, navigate directly to private page
      await navigateTo('/private')
      return true
    }
    
    // Navigate normally (redirect /models to home)
    const href = item.href === '/models' ? '/' : item.href
    await navigateTo(href)
    return true
  }
  
  // Handle premium/subscribe button click
  const handlePremiumClick = async (user) => {
    if (!user) {
      openLoginModal()
      return false
    }
    
    await navigateTo('/subscribe')
    return true
  }
  
  return {
    requiresAuth,
    navigateWithAuth,
    handleNavClick,
    handlePremiumClick,
    protectedRoutes
  }
}
