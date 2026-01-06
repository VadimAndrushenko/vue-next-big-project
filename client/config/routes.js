/**
 * Application Routes Configuration
 * 
 * This file documents all available routes in the GODDASS.AI application.
 * Nuxt.js uses file-based routing, so routes are automatically generated from the pages directory.
 */

export const routes = {
  // Public Routes (No authentication required)
  public: {
    // Homepage - Main landing page with featured models and sections
    home: {
      path: '/',
      name: 'Home',
      file: 'pages/index.vue',
      description: 'Main homepage with carousel, featured models, FAQ, and simulator section',
      meta: {
        title: 'GODDASS.AI - Divine Desires',
        description: 'Create your perfect AI girlfriend and explore your deepest desires',
        requiresAuth: false
      }
    },
    
    // Authentication page - Login and registration forms
    auth: {
      path: '/auth',
      name: 'Authentication',
      file: 'pages/auth.vue',
      description: 'User login and registration with social login options',
      meta: {
        title: 'Login / Register - GODDASS.AI',
        description: 'Sign in or create your account to access AI companions',
        requiresAuth: false
      }
    },
    
    // Information hub page - Terms, Privacy, etc. (query param: type)
    info: {
      path: '/info',
      name: 'Information',
      file: 'pages/info/index.vue',
      description: 'Information pages like terms of service, privacy policy, cancellations',
      meta: {
        title: 'Information - GODDASS.AI',
        description: 'Read legal and policy information',
        requiresAuth: false
      }
    },
    
    // Policy pages (direct pretty URLs)
    termsOfService: {
      path: '/terms-of-service',
      name: 'Terms of Service',
      file: 'pages/terms-of-service.vue',
      description: 'Terms and conditions of using the service',
      meta: {
        title: 'Terms of Service - GODDASS.AI',
        description: 'Terms and conditions',
        requiresAuth: false
      }
    },
    privacyPolicy: {
      path: '/privacy-policy',
      name: 'Privacy Policy',
      file: 'pages/privacy-policy.vue',
      description: 'Privacy and data protection policy',
      meta: {
        title: 'Privacy Policy - GODDASS.AI',
        description: 'Privacy and data protection',
        requiresAuth: false
      }
    },
    cancellationPolicy: {
      path: '/cancellation-policy',
      name: 'Cancellation Policy',
      file: 'pages/cancellation-policy.vue',
      description: 'Subscription cancellation and refunds',
      meta: {
        title: 'Cancellation Policy - GODDASS.AI',
        description: 'Cancellations and refunds',
        requiresAuth: false
      }
    },
    complaintPolicy: {
      path: '/complaint-policy',
      name: 'Complaint Policy',
      file: 'pages/complaint-policy.vue',
      description: 'How to submit complaints and our response process',
      meta: {
        title: 'Complaint Policy - GODDASS.AI',
        description: 'Complaint submission and handling',
        requiresAuth: false
      }
    },
    contentRemovalPolicy: {
      path: '/content-removal-policy',
      name: 'Content Removal Policy',
      file: 'pages/content-removal-policy.vue',
      description: 'Guidelines for content takedown requests',
      meta: {
        title: 'Content Removal Policy - GODDASS.AI',
        description: 'Content takedown guidelines',
        requiresAuth: false
      }
    },
    
    // News listing page - Public news/articles hub
    news: {
      path: '/news',
      name: 'News',
      file: 'pages/news/index.vue',
      description: 'Latest articles, updates, and announcements',
      meta: {
        title: 'News - GODDASS.AI',
        description: 'Read the latest articles and updates from GODDASS.AI',
        requiresAuth: false
      }
    },
    
    // News article page - Dynamic route by articleId param
    newsArticle: {
      path: '/news/:articleId',
      name: 'News Article',
      file: 'pages/news/[articleId].vue',
      description: 'Detailed article page, accessible at /news/:articleId',
      meta: {
        title: 'Article - GODDASS.AI',
        description: 'Read the full article on GODDASS.AI',
        requiresAuth: false
      }
    }
  },
  
  // Protected Routes (Authentication required)
  protected: {
    // Models browsing page - Browse and filter AI models
    // models page removed; use home page instead
    
    // Chat interface - Interact with selected AI model
    chat: {
      path: '/chat',
      name: 'Chat',
      file: 'pages/chat.vue',
      description: 'Interactive chat interface with selected AI companion',
      meta: {
        title: 'Chat with AI - GODDASS.AI',
        description: 'Start a conversation with your chosen AI companion',
        requiresAuth: true
      }
    },
    
    // User settings - Profile, privacy, notifications, subscription
    settings: {
      path: '/settings',
      name: 'Settings',
      file: 'pages/settings.vue',
      description: 'User profile, privacy settings, notifications, and subscription management',
      meta: {
        title: 'Settings - GODDASS.AI',
        description: 'Manage your profile, privacy, and subscription settings',
        requiresAuth: true
      }
    },
    
    // Subscription management - Plans, billing, features
    subscribe: {
      path: '/subscribe',
      name: 'Subscribe',
      file: 'pages/subscribe.vue',
      description: 'Subscription plans, billing management, and premium features',
      meta: {
        title: 'Subscribe - GODDASS.AI',
        description: 'Choose your subscription plan and unlock premium features',
        requiresAuth: true
      }
    },
    
    // Private content - Exclusive AI models and features
    private: {
      path: '/private',
      name: 'Private Content',
      file: 'pages/private.vue',
      description: 'Exclusive private AI models and premium content for subscribers',
      meta: {
        title: 'Private Content - GODDASS.AI',
        description: 'Access exclusive AI companions and premium features',
        requiresAuth: true
      }
    }
  }
}

// Route categories for easy reference
export const routeCategories = {
  public: Object.keys(routes.public),
  protected: Object.keys(routes.protected),
  all: [...Object.keys(routes.public), ...Object.keys(routes.protected)]
}

// Navigation structure
export const navigation = {
  main: [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Models', path: '/', icon: '👥', requiresAuth: true },
    { name: 'Chat', path: '/chat', icon: '💬', requiresAuth: true },
    { name: 'Private', path: '/private', icon: '🔒', requiresAuth: true },
    { name: 'Subscribe', path: '/subscribe', icon: '💎', requiresAuth: true },
    { name: 'Settings', path: '/settings', icon: '⚙️', requiresAuth: true }
  ],
  
  auth: [
    { name: 'Login', path: '/auth', icon: '🔑' },
    { name: 'Register', path: '/auth', icon: '📝' }
  ]
}

// Route guards configuration
export const routeGuards = {
  // Routes that require authentication
  protectedRoutes: ['/chat', '/settings', '/subscribe', '/private'],
  
  // Routes that are public
  publicRoutes: ['/', '/auth', '/news'],
  
  // Routes that redirect authenticated users
  redirectIfAuthenticated: ['/auth'],
  
  // Default redirect for unauthenticated users
  defaultRedirect: '/auth'
}

// API routes (for reference)
export const apiRoutes = {
  // Data endpoints
  data: {
    all: '/api/data',
    navigation: '/api/navigation',
    sidebar: '/api/sidebar',
    featuredModels: '/api/featured-models',
    aiModels: '/api/ai-models',
    faq: '/api/faq',
    designSection: '/api/design-section',
    simulatorSection: '/api/simulator-section',
    footer: '/api/footer',
    pageMetadata: '/api/page-metadata'
  },
  
  // Health check
  health: '/api/health'
}

// Route utilities
export const routeUtils = {
  // Check if route requires authentication
  requiresAuth(path) {
    return routeGuards.protectedRoutes.some(route => path.startsWith(route))
  },
  
  // Check if route is public
  isPublic(path) {
    return routeGuards.publicRoutes.some(route => path === route)
  },
  
  // Get route metadata
  getRouteMeta(path) {
    const allRoutes = { ...routes.public, ...routes.protected }
    for (const [key, route] of Object.entries(allRoutes)) {
      if (route.path === path) {
        return route.meta
      }
    }
    return null
  },
  
  // Get navigation items for current user
  getNavigationItems(isAuthenticated = false) {
    return navigation.main.filter(item => {
      if (item.requiresAuth) {
        return isAuthenticated
      }
      return true
    })
  }
}

export default {
  routes,
  routeCategories,
  navigation,
  routeGuards,
  apiRoutes,
  routeUtils
}
