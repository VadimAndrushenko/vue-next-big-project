# Express API Server

A Node.js Express server providing API endpoints for the web application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
PORT=3001
NODE_ENV=development
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message and server status
- `GET /api/health` - Health check endpoint
- `GET /api/data` - Sample data endpoint

## Features

- CORS enabled for cross-origin requests
- JSON body parsing
- Error handling middleware
- Environment variable configuration
- Hot reload with nodemon (development)
