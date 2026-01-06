export default defineNuxtPlugin((nuxtApp) => {
  // Create reactive user state
  const user = useState('user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  
  // Ensure user starts as null
  user.value = null
  
  // Initialize properties immediately
  nuxtApp.$isAuthenticated = isAuthenticated
  nuxtApp.$auth = null // Will be set below
  
  // Authentication methods
  const auth = {
    // Login user
    async login(credentials) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check for default user credentials
        if (credentials.email === 'a@a.a' && credentials.password === '123qwe123') {
          // Default user data
          const defaultUser = {
            id: 1,
            email: 'a@a.a',
            firstName: 'Default',
            lastName: 'User',
            avatar: '👤',
            isPremium: true,
            tokenBalance: 1000,
            createdAt: new Date().toISOString()
          }
          
          // Set user state
          user.value = defaultUser
          
          // Store in localStorage
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(defaultUser))
          }
          
          return { success: true, user: defaultUser }
        }
        
        // For any other credentials, use mock user data
        const mockUser = {
          id: 1,
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          avatar: '👤',
          isPremium: true,
          tokenBalance: 1000,
          createdAt: new Date().toISOString()
        }
        
        // Set user state
        user.value = mockUser
        
        // Store in localStorage
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(mockUser))
        }
        
        return { success: true, user: mockUser }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: 'Login failed' }
      }
    },
    
    // Register user
    async register(userData) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock user data
        const mockUser = {
          id: 1,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: '👤',
          isPremium: false,
          tokenBalance: 0,
          createdAt: new Date().toISOString()
        }
        
        // Set user state
        user.value = mockUser
        
        // Store in localStorage
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(mockUser))
        }
        
        return { success: true, user: mockUser }
      } catch (error) {
        console.error('Register error:', error)
        return { success: false, error: 'Registration failed' }
      }
    },
    
    // Logout user
    async logout() {
      try {
        // Clear user state
        user.value = null
        
        // Remove from localStorage
        if (process.client) {
          localStorage.removeItem('user')
        }
        
        // Redirect to home
        await navigateTo('/')
        
        return { success: true }
      } catch (error) {
        console.error('Logout error:', error)
        return { success: false, error: 'Logout failed' }
      }
    },
    
    // Check if user is authenticated
    checkAuth() {
      console.log('checkAuth called')
      if (process.client) {
        const storedUser = localStorage.getItem('user')
        console.log('Stored user from localStorage:', storedUser)
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            console.log('Parsed user:', parsedUser)
            // Check if the stored user data is valid and not expired
            if (parsedUser && parsedUser.id) {
              user.value = parsedUser
              console.log('User authenticated:', user.value)
            } else {
              // Invalid user data, clear it
              localStorage.removeItem('user')
              user.value = null
              console.log('Invalid user data cleared')
            }
          } catch (error) {
            console.error('Error parsing stored user:', error)
            localStorage.removeItem('user')
            user.value = null
            console.log('Error parsing user, cleared')
          }
        } else {
          // No stored user, ensure user state is null
          user.value = null
          console.log('No stored user, user state set to null')
        }
      } else {
        // Server side, ensure user is null
        user.value = null
        console.log('Server side, user state set to null')
      }
    },
    
    // Get current user
    getCurrentUser() {
      return user.value
    },
    
    // Update user profile
    async updateProfile(profileData) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Update user state
        if (user.value) {
          user.value = { ...user.value, ...profileData }
          
          // Update localStorage
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(user.value))
          }
        }
        
        return { success: true, user: user.value }
      } catch (error) {
        console.error('Profile update error:', error)
        return { success: false, error: 'Profile update failed' }
      }
    },
    
    // Upgrade user to premium and add tokens
    async upgradeToPremium(tokens = 1000) {
      try {
        if (user.value) {
          // Update user state
          user.value = {
            ...user.value,
            isPremium: true,
            tokenBalance: (user.value.tokenBalance || 0) + tokens
          }
          
          // Update localStorage
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(user.value))
          }
          
          console.log('User upgraded to premium with', tokens, 'tokens')
          return { success: true, user: user.value }
        }
        
        return { success: false, error: 'No user found' }
      } catch (error) {
        console.error('Upgrade error:', error)
        return { success: false, error: 'Upgrade failed' }
      }
    },
    
    // Clear authentication state (for testing)
    clearAuth() {
      user.value = null
      if (process.client) {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
      }
      console.log('Authentication state cleared')
    }
  }
  
  // Check authentication on app start
  if (process.client) {
    console.log('Auth plugin initializing...')
    console.log('Initial user state:', user.value)
    console.log('Initial isAuthenticated:', isAuthenticated.value)
    
    auth.checkAuth()
    
    console.log('After checkAuth - user state:', user.value)
    console.log('After checkAuth - isAuthenticated:', isAuthenticated.value)
    
    // For testing: Uncomment the line below to clear auth state on app start
    // auth.clearAuth()
  }
  
  // Ensure the plugin is properly loaded
  console.log('Auth plugin loaded successfully')
  console.log('Provided properties:', { auth: !!auth, $isAuthenticated: !!isAuthenticated, $auth: !!auth })
  
  // Set the auth property on nuxtApp
  nuxtApp.$auth = auth
  
  // Provide auth methods globally
  return {
    provide: {
      auth,
      $isAuthenticated: isAuthenticated,
      $auth: auth
    }
  }
})
