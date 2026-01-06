import { ref, computed } from 'vue'

// Global state
const isOpen = ref(false)
const mode = ref('login') // 'login' or 'register'
const isLoading = ref(false)

export const useAuthModal = () => {
  // Computed properties
  const isLoginMode = computed(() => mode.value === 'login')
  const isRegisterMode = computed(() => mode.value === 'register')

  // Methods
  const openLoginModal = () => {
    mode.value = 'login'
    isOpen.value = true
  }

  const openRegisterModal = () => {
    mode.value = 'register'
    isOpen.value = true
  }

  const openAuthModal = (modalMode = 'login') => {
    mode.value = modalMode
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
    isLoading.value = false
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const toggleMode = () => {
    mode.value = mode.value === 'login' ? 'register' : 'login'
  }

  // Handle authentication actions
  const handleLogin = async (loginData) => {
    setLoading(true)
    try {
      const { $auth } = useNuxtApp()
      
      if (!$auth) {
        console.error('Auth plugin not available')
        return { success: false, error: 'Auth plugin not available' }
      }
      
      const result = await $auth.login({
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe
      })
      
      if (result.success) {
        console.log('Login successful:', result.user)
        closeModal()
        // Redirect to home page or dashboard
        await navigateTo('/')
        return { success: true, user: result.user }
      } else {
        console.error('Login failed:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (registerData) => {
    setLoading(true)
    try {
      const { $auth } = useNuxtApp()
      
      if (!$auth) {
        console.error('Auth plugin not available')
        return { success: false, error: 'Auth plugin not available' }
      }
      
      const result = await $auth.register({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password
      })
      
      if (result.success) {
        console.log('Registration successful:', result.user)
        closeModal()
        // Redirect to home page or dashboard
        await navigateTo('/')
        return { success: true, user: result.user }
      } else {
        console.error('Registration failed:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    setLoading(true)
    try {
      const { $auth } = useNuxtApp()
      
      if (!$auth) {
        console.error('Auth plugin not available')
        return { success: false, error: 'Auth plugin not available' }
      }
      
      const result = await $auth.socialLogin(provider)
      
      if (result.success) {
        console.log('Social login successful:', result.user)
        closeModal()
        // Redirect to home page or dashboard
        await navigateTo('/')
        return { success: true, user: result.user }
      } else {
        console.error('Social login failed:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Social login error:', error)
      return { success: false, error: 'Social login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  // Modal event handlers
  const onLogin = async (loginData) => {
    const result = await handleLogin(loginData)
    if (!result.success) {
      // You can emit a toast notification here or handle the error as needed
      alert(result.error)
    }
  }

  const onRegister = async (registerData) => {
    const result = await handleRegister(registerData)
    if (!result.success) {
      // You can emit a toast notification here or handle the error as needed
      alert(result.error)
    }
  }

  const onSocialLogin = async (provider) => {
    const result = await handleSocialLogin(provider)
    if (!result.success) {
      // You can emit a toast notification here or handle the error as needed
      alert(result.error)
    }
  }

  return {
    // State
    isOpen: readonly(isOpen),
    mode: readonly(mode),
    isLoading: readonly(isLoading),
    
    // Computed
    isLoginMode,
    isRegisterMode,
    
    // Methods
    openLoginModal,
    openRegisterModal,
    openAuthModal,
    closeModal,
    setLoading,
    toggleMode,
    
    // Event handlers
    onLogin,
    onRegister,
    onSocialLogin,
    
    // Direct handlers (for more control)
    handleLogin,
    handleRegister,
    handleSocialLogin
  }
}
