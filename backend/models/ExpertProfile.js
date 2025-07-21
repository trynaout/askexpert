const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const expertProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expertise: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  commonQuestions: [qaSchema],
  experienceYears: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  consultationCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('ExpertProfile', expertProfileSchema); 