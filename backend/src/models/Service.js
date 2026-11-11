const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, enum: ['maintenance', 'replacement', 'mechanical'], required: true },
    summary: { type: String, required: true },
    features: [String],
    termOptionsYears: { type: [Number], default: [1, 3, 5] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
