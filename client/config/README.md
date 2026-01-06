# Configuration Directory

This directory contains application configuration files.

## 📁 Files

### `routes.js`
Central routing configuration for the GODDASS.AI application.

**Features:**
- Route definitions with metadata
- Authentication requirements
- Navigation structure
- API route mappings
- Route utility functions

**Usage:**
```javascript
import { routes, routeUtils, navigation } from '~/config/routes'

// Check if route requires auth
const needsAuth = routeUtils.requiresAuth('/models')

// Get navigation items
const navItems = routeUtils.getNavigationItems(true)
```

## 🚀 Quick Commands

List all routes:
```bash
npm run routes
```

View route documentation:
```bash
cat ROUTES.md
```

## 📋 Route Structure

- **Public Routes**: `/`, `/auth`
- **Protected Routes**: `/models`, `/chat`, `/settings`
- **API Routes**: `/api/*` endpoints
- **Middleware**: Automatic authentication checks

## 🔧 Configuration

Routes are automatically generated from the `pages/` directory structure using Nuxt.js file-based routing. The `routes.js` file provides additional metadata and utilities for route management.
