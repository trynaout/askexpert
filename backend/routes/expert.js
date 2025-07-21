require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // CORS is imported
const authRoutes = require('./routes/auth');
const expertRoutes = require('./routes/expert');

const app = express();

// Middleware
app.use(cors());  // CORS is enabled
app.use(express.json());

// In backend/server.js
app.use('/api/auth', authRoutes);
app.use('/api/experts', expertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 