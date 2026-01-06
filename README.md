



# Веб‑приложение (Nuxt 4 )

Полноценное full‑stack веб‑приложение на базе Nuxt 4 (frontend)

Проект состоит из клиента и сервера. Большая часть фронтенда реализована мной и ещё одним человеком - серверную часть выполнял другой разработчик. Проект в настоящий момент не завершён и временно приостановлен, но при этом полностью готов к локальному запуску и дальнейшей разработке

## Project Structure

```
├── client/          # Nuxt 4 frontend application
├── server/          # Express.js API server
└── README.md        # This file
```

## Quick Start

### Prerequisites

- Node.js (version 20.19.0 or higher for Nuxt 4)
- npm or yarn

### Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
PORT=3001
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The server will be available at `http://localhost:3001`

### Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will be available at `http://localhost:3000`

## API Endpoints

The Express server provides the following endpoints:

- `GET /` - Welcome message and server status
- `GET /api/health` - Health check endpoint
- `GET /api/data` - Sample data endpoint

## Development

### Running Both Services

You can run both the client and server simultaneously:

**Terminal 1 (Server):**
```bash
cd server && npm run dev
```

**Terminal 2 (Client):**
```bash
cd client && npm run dev
```

### Environment Variables

**Server (.env):**
```
PORT=3001
NODE_ENV=development
```

**Client (.env):**
```
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Features

### Server
- Express.js API server
- CORS enabled for cross-origin requests
- JSON body parsing
- Error handling middleware
- Environment variable configuration
- Hot reload with nodemon

### Client
- Nuxt 4 frontend framework
- Tailwind CSS for styling
- Modern Vue.js 3 composition API
- Server-side rendering (SSR)
- Auto-imports and file-based routing

## Scripts

### Server Scripts
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Make changes in the respective directories
2. Test both client and server
3. Ensure API endpoints are working correctly
4. Commit your changes

## License

ISC

