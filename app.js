const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const schoolRoutes = require('./src/routes/schoolRoutes');
const authRoutes = require('./src/routes/authRoutes');
const pool = require('./src/config/db');
const swaggerSpecs = require('./src/config/swagger');

const app = express();

// Security and Utility Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Request logging

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Health check endpoint — verifies API and DB connectivity
app.get('/', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1');
    res.status(200).json({
      message: 'School Management API is running 🎓',
      database: 'connected',
      docs: '/docs',
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

// Routes
app.use('/auth', authRoutes);
app.use('/', schoolRoutes);

// 404 catch-all
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
