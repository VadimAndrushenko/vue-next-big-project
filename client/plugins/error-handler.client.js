export default defineNuxtPlugin((nuxtApp) => {
  // Handle programmatic errors
  nuxtApp.hook('app:error', (error) => {
    console.error('App error:', error)
    
    // Map error status codes to routes
    const errorRouteMap = {
      400: '/404',
      404: '/404',
      500: '/500',
      501: '/501',
      503: '/503'
    }
    
    const statusCode = error.statusCode || 404
    const targetRoute = errorRouteMap[statusCode] || '/404'
    
    // Navigate to the appropriate error page
    navigateTo(targetRoute)
  })
  
  // Handle navigation errors
  nuxtApp.hook('page:error', (error) => {
    console.error('Page error:', error)
    
    // For navigation errors, redirect to 404
    navigateTo('/404')
  })
})
