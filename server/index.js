const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Express API Server!',
    timestamp: new Date().toISOString(),
    status: 'running'
  });
});

// Sample API endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Main data endpoint
app.get('/api/data', (req, res) => {
  const data = require('./data/data.json');
  res.json(data);
});

// Navigation data endpoint
app.get('/api/navigation', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.navigation);
});

// Sidebar data endpoint
app.get('/api/sidebar', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.sidebar);
});

// Featured models endpoint
app.get('/api/featured-models', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.featuredModels);
});

// AI models endpoint
app.get('/api/ai-models', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.aiModels);
});

// FAQ endpoint
app.get('/api/faq', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.faq);
});

// Design section endpoint
app.get('/api/design-section', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.designSection);
});

// Simulator section endpoint
app.get('/api/simulator-section', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.simulatorSection);
});

// Footer endpoint
app.get('/api/footer', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.footer);
});

// Page metadata endpoint
app.get('/api/page-metadata', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.pageMetadata);
});

// Subscription plans endpoint
app.get('/api/subscription-plans', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.subscriptionPlans);
});

// Exclusive models endpoint
app.get('/api/exclusive-models', (req, res) => {
  const data = require('./data/data.json');
  res.json(data.exclusiveModels);
});

// Pages data endpoint (legacy)
app.get('/api/pages', (req, res) => {
  const pagesData = require('./data/pages.json');
  res.json(pagesData);
});

// Specific page data endpoint (legacy)
app.get('/api/pages/:page', (req, res) => {
  const pagesData = require('./data/pages.json');
  const page = req.params.page;
  
  if (pagesData[page]) {
    res.json(pagesData[page]);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🔍 Health check at http://localhost:${PORT}/api/health`);
});
