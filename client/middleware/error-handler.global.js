export default defineNuxtRouteMiddleware((to) => {
  // List of error routes that should be handled
  const errorRoutes = ['/404', '/500', '/501', '/503', '/geo-block', '/maintenance']
  
  // Check if the current route is an error route
  if (errorRoutes.includes(to.path)) {
    // For these routes, we want to show the StatusPage component
    // The route will be handled by the individual page components
    return
  }
  
  // For other routes, let Nuxt handle them normally
  return
})
