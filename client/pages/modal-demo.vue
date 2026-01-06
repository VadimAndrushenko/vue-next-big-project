<template>
  <div class="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-secondary mb-4 font-heading">
          Auth Modal Demo
        </h1>
        <p class="text-muted font-body text-lg">
          Test the authentication modal components
        </p>
      </div>

      <!-- Demo Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Login Modal Button -->
        <button
          @click="openLoginModal"
          class="p-6 border-custom bg-[var(--color-bg-secondary)] hover:bg-overlay-20 transition-all duration-200 rounded-xl"
        >
          <h3 class="text-xl font-semibold text-secondary mb-2 font-heading">
            Login Modal
          </h3>
          <p class="text-muted font-body">
            Open the login modal
          </p>
        </button>

        <!-- Register Modal Button -->
        <button
          @click="openRegisterModal"
          class="p-6 border-custom bg-[var(--color-bg-secondary)] hover:bg-overlay-20 transition-all duration-200 rounded-xl"
        >
          <h3 class="text-xl font-semibold text-secondary mb-2 font-heading">
            Register Modal
          </h3>
          <p class="text-muted font-body">
            Open the register modal
          </p>
        </button>

        <!-- Auth Modal with Custom Mode -->
        <button
          @click="openAuthModal('login')"
          class="p-6 border-custom bg-[var(--color-bg-secondary)] hover:bg-overlay-20 transition-all duration-200 rounded-xl"
        >
          <h3 class="text-xl font-semibold text-secondary mb-2 font-heading">
            Custom Auth Modal
          </h3>
          <p class="text-muted font-body">
            Open modal with custom mode
          </p>
        </button>
      </div>

      <!-- Usage Examples -->
      <div class="border-custom bg-[var(--color-bg-secondary)] p-8 rounded-xl">
        <h2 class="text-2xl font-bold text-secondary mb-6 font-heading">
          Usage Examples
        </h2>
        
        <div class="space-y-6">
          <!-- Method 1: Using Composable -->
          <div>
            <h3 class="text-lg font-semibold text-secondary mb-3 font-heading">
              1. Using the useAuthModal Composable
            </h3>
            <pre class="bg-[var(--color-bg-primary)] p-4 rounded-lg text-sm text-muted font-mono overflow-x-auto"><code>// In your component
import { useAuthModal } from '@/composables/useAuthModal'

const { openLoginModal, openRegisterModal, closeModal } = useAuthModal()

// Open login modal
const handleLoginClick = () => {
  openLoginModal()
}

// Open register modal
const handleRegisterClick = () => {
  openRegisterModal()
}</code></pre>
          </div>

          <!-- Method 2: Using Modal Component Directly -->
          <div>
            <h3 class="text-lg font-semibold text-secondary mb-3 font-heading">
              2. Using the AuthModal Component Directly
            </h3>
            <pre class="bg-[var(--color-bg-primary)] p-4 rounded-lg text-sm text-muted font-mono overflow-x-auto"><code>&lt;template&gt;
  &lt;AuthModal
    :is-open="isModalOpen"
    :mode="modalMode"
    :is-loading="isLoading"
    @close="closeModal"
    @login="handleLogin"
    @register="handleRegister"
    @social-login="handleSocialLogin"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const isModalOpen = ref(false)
const modalMode = ref('login')
const isLoading = ref(false)

const openModal = (mode = 'login') => {
  modalMode.value = mode
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
&lt;/script&gt;</code></pre>
          </div>

          <!-- Method 3: Global Modal with Composable -->
          <div>
            <h3 class="text-lg font-semibold text-secondary mb-3 font-heading">
              3. Global Modal with Composable (Recommended)
            </h3>
            <pre class="bg-[var(--color-bg-primary)] p-4 rounded-lg text-sm text-muted font-mono overflow-x-auto"><code>// In your app.vue or layout
&lt;template&gt;
  &lt;AuthModal
    :is-open="isOpen"
    :mode="mode"
    :is-loading="isLoading"
    @close="closeModal"
    @login="onLogin"
    @register="onRegister"
    @social-login="onSocialLogin"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useAuthModal } from '@/composables/useAuthModal'

const {
  isOpen,
  mode,
  isLoading,
  closeModal,
  onLogin,
  onRegister,
  onSocialLogin
} = useAuthModal()
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <AuthModal
      :is-open="isOpen"
      :mode="mode"
      :is-loading="isLoading"
      @close="closeModal"
      @login="onLogin"
      @register="onRegister"
      @social-login="onSocialLogin"
    />
  </div>
</template>

<script setup>
import { useAuthModal } from '@/composables/useAuthModal'

// Use the auth modal composable
const {
  isOpen,
  mode,
  isLoading,
  openLoginModal,
  openRegisterModal,
  openAuthModal,
  closeModal,
  onLogin,
  onRegister,
  onSocialLogin
} = useAuthModal()

// Set page layout
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.border-custom {
  border: 1px solid #3A2B41;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}
</style>
