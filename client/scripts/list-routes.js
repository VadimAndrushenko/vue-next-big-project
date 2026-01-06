#!/usr/bin/env node

/**
 * Route Listing Script
 * 
 * This script lists all available routes in the GODDASS.AI application.
 * Run with: node scripts/list-routes.js
 */

import { routes, routeCategories, navigation, apiRoutes } from '../config/routes.js'

console.log('🚀 GODDASS.AI - Route Listing\n')

// List all routes
console.log('📋 ALL ROUTES:')
console.log('==============')

// Public routes
console.log('\n🌐 PUBLIC ROUTES (No Authentication Required):')
Object.entries(routes.public).forEach(([key, route]) => {
  console.log(`  ${route.path.padEnd(10)} | ${route.name.padEnd(15)} | ${route.description}`)
})

// Protected routes
console.log('\n🔒 PROTECTED ROUTES (Authentication Required):')
Object.entries(routes.protected).forEach(([key, route]) => {
  console.log(`  ${route.path.padEnd(10)} | ${route.name.padEnd(15)} | ${route.description}`)
})

// Route categories
console.log('\n📂 ROUTE CATEGORIES:')
console.log('===================')
console.log(`Public Routes:     ${routeCategories.public.join(', ')}`)
console.log(`Protected Routes:  ${routeCategories.protected.join(', ')}`)
console.log(`Total Routes:      ${routeCategories.all.length}`)

// Navigation structure
console.log('\n🧭 NAVIGATION STRUCTURE:')
console.log('========================')
console.log('Main Navigation:')
navigation.main.forEach(item => {
  const authStatus = item.requiresAuth ? '🔒' : '🌐'
  console.log(`  ${authStatus} ${item.icon} ${item.name.padEnd(10)} | ${item.path}`)
})

console.log('\nAuth Navigation:')
navigation.auth.forEach(item => {
  console.log(`  🔑 ${item.icon} ${item.name.padEnd(10)} | ${item.path}`)
})

// API routes
console.log('\n🔌 API ROUTES:')
console.log('==============')
console.log('Data Endpoints:')
Object.entries(apiRoutes.data).forEach(([key, path]) => {
  console.log(`  GET ${path.padEnd(25)} | ${key}`)
})

console.log('\nHealth Check:')
console.log(`  GET ${apiRoutes.health.padEnd(25)} | health`)

// Summary
console.log('\n📊 SUMMARY:')
console.log('============')
console.log(`• Total Pages: ${routeCategories.all.length}`)
console.log(`• Public Pages: ${routeCategories.public.length}`)
console.log(`• Protected Pages: ${routeCategories.protected.length}`)
console.log(`• API Endpoints: ${Object.keys(apiRoutes.data).length + 1}`)
console.log(`• Navigation Items: ${navigation.main.length + navigation.auth.length}`)

console.log('\n✨ Route configuration is managed in: config/routes.js')
console.log('📖 Full documentation: ROUTES.md')
