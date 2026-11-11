const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required.'], trim: true, maxlength: 120 },
    company: { type: String, required: [true, 'Company is required.'], trim: true, maxlength: 160 },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address.'],
    },
    phone: { type: String, trim: true, maxlength: 30 },
    propertyType: {
      type: String,
      enum: { values: ['shopping-center', 'office-complex', 'factory', 'other'], message: 'Choose a property type.' },
      required: [true, 'Property type is required.'],
    },
    floorAreaSqFt: { type: Number, min: 0 },
    interest: { type: String, enum: ['maintenance', 'replacement', 'both'], default: 'maintenance' },
    preferredTermYears: { type: Number, enum: [1, 3, 5, 10], default: 3 },
    message: { type: String, trim: true, maxlength: 2000 },
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'won', 'lost'], default: 'new', index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
