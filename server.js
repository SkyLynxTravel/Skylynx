const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const {
  searchFlights,
  getOfferDetails,
  createOrder,
  getOrderDetails,
} = require('./duffel-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'SkyLynx Travel API is running',
    timestamp: new Date().toISOString(),
  });
});

// POST /api/flights/search
app.post('/api/flights/search', async (req, res) => {
  try {
    const searchParams = req.body;

    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: origin, destination, departureDate',
      });
    }

    const result = await searchFlights(searchParams);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/flights/search:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/flights/offer/:offerId
app.get('/api/flights/offer/:offerId', async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) {
      return res.status(400).json({
        success: false,
        error: 'Offer ID is required',
      });
    }

    const result = await getOfferDetails(offerId);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/flights/offer:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/booking/create
app.post('/api/booking/create', async (req, res) => {
  try {
    const orderParams = req.body;

    if (!orderParams.offerId || !orderParams.passengers) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: offerId, passengers',
      });
    }

    const result = await createOrder(orderParams);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/booking/create:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/booking/:orderId
app.get('/api/booking/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'Order ID is required',
      });
    }

    const result = await getOrderDetails(orderId);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/booking:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SkyLynx Travel API is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
