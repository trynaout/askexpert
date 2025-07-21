require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const expertRoutes = require('./routes/expert');

const app = express();

// Middleware - ensure these come BEFORE routes
app.use(express.json());   // Parse JSON bodies
app.use(cors({            // Setup CORS with specific options
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true,      // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Routes - after middleware
app.use('/api/auth', authRoutes);
app.use('/api/expert', expertRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 