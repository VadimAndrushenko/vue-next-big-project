import { routeGuards } from '@/config/routes'

export default defineNuxtRouteMiddleware((to, from) => {
  // Get the current user state (you can implement this with your auth system)
  const user = useState('user', () => null)
  
  // Use route configuration from routes.js
  const { protectedRoutes, publicRoutes, redirectIfAuthenticated, defaultRedirect } = routeGuards
  
  // Check if the route requires authentication
  const requiresAuth = protectedRoutes.some(route => to.path.startsWith(route))
  const shouldRedirectIfAuth = redirectIfAuthenticated.some(route => to.path === route)
  
  // If route requires auth and user is not authenticated
  if (requiresAuth && !user.value) {
    // Redirect to auth page
    return navigateTo(defaultRedirect)
  }
  
  // Check for premium access to private content
  if (to.path === '/private' && user.value && !user.value.isPremium) {
    // User is authenticated but not premium, redirect to subscribe page
    return navigateTo('/subscribe')
  }
  
  // If user is authenticated and trying to access auth page
  if (user.value && shouldRedirectIfAuth) {
    // Redirect to home page
    return navigateTo('/')
  }
})
