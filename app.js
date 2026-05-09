const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const schoolRoutes = require('./src/routes/schoolRoutes');

const app = express();

// Security headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

const pool = require('./src/config/db');

// Health check endpoint — verifies API and DB connectivity
app.get('/', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1');
    res.status(200).json({
      message: 'School Management API is running 🎓',
      database: 'connected',
      status: 'ok',
    });
  } catch (error) {
    res.status(503).json({
      message: 'School Management API is running but database is unreachable',
      database: 'disconnected',
      status: 'error',
    });
  }
});

// Mount school routes at root
app.use('/', schoolRoutes);

// 404 catch-all — must be registered after all other routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
