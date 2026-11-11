const mongoose = require('mongoose');
const { mongoUri } = require('../config/env');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const { services, testimonials } = require('./data');

(async () => {
  if (!mongoUri) {
    console.error('Set MONGODB_URI in backend/.env first.');
    process.exit(1);
  }
  await mongoose.connect(mongoUri);
  await Service.deleteMany({});
  await Testimonial.deleteMany({});
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);
  console.log(`Seeded ${services.length} services and ${testimonials.length} testimonials.`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
