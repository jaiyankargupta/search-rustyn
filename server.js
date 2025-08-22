const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Proxy API requests to the external service
app.use('/api', createProxyMiddleware({
  target: 'https://what-to-build.niladri.tech',
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    '^/api': '/api', // Keep the /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('🚀 Proxying request:', req.method, req.url);
    console.log('🎯 Target:', proxyReq.path);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('✅ Response received:', proxyRes.statusCode, 'for', req.url);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
    res.status(500).json({
      error: 'Proxy error',
      message: err.message,
      url: req.url
    });
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

// Serve static files in production
if (NODE_ENV === 'production') {
  // Serve the React app build files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  if (NODE_ENV === 'production') {
    console.log(`📱 Serving React app from build folder`);
  } else {
    console.log(`📡 Proxying /api/* requests to https://what-to-build.niladri.tech`);
  }
});
