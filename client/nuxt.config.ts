// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-17',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  
  // App configuration
  app: {
    // Custom domain on GitHub Pages → serve from root
    baseURL: '/',
    head: {
      title: 'GODDASS.AI - Divine Desires',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Create your perfect AI girlfriend and explore your deepest desires with our advanced AI companion platform.' },
        { name: 'keywords', content: 'AI girlfriend, virtual companion, AI chat, relationship simulator, artificial intelligence' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    }
  },
  
  // Router configuration
  // Routes are defined in config/routes.js
  // File-based routing is used from the pages/ directory
  router: {
    options: {
      strict: false
    }
  },
  
  // Page transitions
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  
  // Build configuration
  build: {
    transpile: []
  },
  
  // Development configuration
  devServer: {
    port: 3000
  },
  
  // CSS configuration
  css: [
    './assets/css/main.css'
  ],
  
  // Nitro configuration
  nitro: {
    // Use the GitHub Pages preset when generating for static hosting on gh-pages
    // This affects prerendering and output paths used by `nuxt generate`
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
