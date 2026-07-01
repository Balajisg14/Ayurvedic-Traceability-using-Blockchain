// index.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // ✅ Ensures .env loads from /server

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes and middleware
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const { authenticate } = require('./middleware/auth');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Default route (for testing)
app.get('/', (req, res) => {
  res.send('✅ Backend server is running successfully!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Protected test route
app.get('/api/me', authenticate, (req, res) => {
  res.json({ message: 'User authenticated', userId: req.userId });
});

// MongoDB connection
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
