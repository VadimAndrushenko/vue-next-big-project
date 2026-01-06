# Application Routes Documentation

This document provides a comprehensive overview of all available routes in the GODDASS.AI application.

## 📋 Route Overview

### Public Routes (No Authentication Required)

| Route | Name | File | Description |
|-------|------|------|-------------|
| `/` | Home | `pages/index.vue` | Main homepage with carousel, featured models, FAQ, and simulator section |
| `/auth` | Authentication | `pages/auth.vue` | User login and registration with social login options |

### Protected Routes (Authentication Required)

| Route | Name | File | Description |
|-------|------|------|-------------|
| `/` | AI Models | `pages/index.vue` | Browse, search, and filter AI companion models |
| `/chat` | Chat | `pages/chat.vue` | Interactive chat interface with selected AI companion |
| `/settings` | Settings | `pages/settings.vue` | User profile, privacy settings, notifications, and subscription management |
| `/subscribe` | Subscribe | `pages/subscribe.vue` | Subscription plans, billing management, and premium features |
| `/private` | Private Content | `pages/private.vue` | Exclusive private AI models and premium content for subscribers |

## 🔐 Authentication Flow

### Route Protection
- **Protected Routes**: `/chat`, `/settings`, `/subscribe`, `/private`
- **Public Routes**: `/`, `/auth`
- **Redirect Rules**:
  - Unauthenticated users → `/auth`
  - Authenticated users on `/auth` → `/`

### Middleware Configuration
- **File**: `middleware/auth.global.js`
- **Configuration**: `config/routes.js`
- **Behavior**: Automatic route protection based on authentication status

## 🧭 Navigation Structure

### Main Navigation
```javascript
[
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Models', path: '/', icon: '👥', requiresAuth: true },
  { name: 'Chat', path: '/chat', icon: '💬', requiresAuth: true },
  { name: 'Private', path: '/private', icon: '🔒', requiresAuth: true },
  { name: 'Subscribe', path: '/subscribe', icon: '💎', requiresAuth: true },
  { name: 'Settings', path: '/settings', icon: '⚙️', requiresAuth: true }
]
```
```

### Authentication Navigation
```javascript
[
  { name: 'Login', path: '/auth', icon: '🔑' },
  { name: 'Register', path: '/auth', icon: '📝' }
]
```

## 🔌 API Routes

### Data Endpoints
- `GET /api/data` - All application data
- `GET /api/navigation` - Navigation configuration
- `GET /api/sidebar` - Sidebar configuration
- `GET /api/featured-models` - Featured AI models
- `GET /api/ai-models` - All AI models
- `GET /api/faq` - FAQ data
- `GET /api/design-section` - Design section data
- `GET /api/simulator-section` - Simulator section data
- `GET /api/footer` - Footer configuration
- `GET /api/page-metadata` - Page metadata

### Health Check
- `GET /api/health` - Server health status

## 📁 File Structure

```
client/
├── pages/
│   ├── index.vue          # Homepage (/)
│   ├── auth.vue           # Authentication (/auth)
│   ├── index.vue          # AI Models on Home (/)
│   ├── chat.vue           # Chat Interface (/chat)
│   ├── subscribe.vue      # Subscription Plans (/subscribe)
│   ├── private.vue        # Private Content (/private)
│   └── settings.vue       # User Settings (/settings)
```
├── config/
│   └── routes.js          # Route configuration
├── middleware/
│   └── auth.global.js     # Authentication middleware
└── ROUTES.md              # This documentation
```

## 🛠️ Route Utilities

The `config/routes.js` file provides utility functions:

- `routeUtils.requiresAuth(path)` - Check if route requires authentication
- `routeUtils.isPublic(path)` - Check if route is public
- `routeUtils.getRouteMeta(path)` - Get route metadata
- `routeUtils.getNavigationItems(isAuthenticated)` - Get navigation items for user

## 🔄 Route Categories

```javascript
routeCategories = {
  public: ['home', 'auth'],
  protected: ['models', 'chat', 'settings', 'subscribe', 'private'],
  all: ['home', 'auth', 'models', 'chat', 'settings', 'subscribe', 'private']
}
```
```

## 📝 Usage Examples

### Check if route requires authentication
```javascript
import { routeUtils } from '~/config/routes'

const needsAuth = routeUtils.requiresAuth('/') // false
const isPublic = routeUtils.isPublic('/') // true
```

### Get navigation items for user
```javascript
import { routeUtils } from '~/config/routes'

const navItems = routeUtils.getNavigationItems(true) // Shows all items for authenticated user
const publicNavItems = routeUtils.getNavigationItems(false) // Shows only public items
```

### Get route metadata
```javascript
import { routeUtils } from '~/config/routes'

const meta = routeUtils.getRouteMeta('/chat')
// Returns: { title: 'Chat with AI - GODDASS.AI', requiresAuth: true, ... }
```

---

**Note**: This application uses Nuxt.js file-based routing, so routes are automatically generated from the `pages/` directory structure. The configuration in `config/routes.js` provides additional metadata and utilities for route management.
