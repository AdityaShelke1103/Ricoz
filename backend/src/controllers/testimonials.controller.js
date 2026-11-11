const Testimonial = require('../models/Testimonial');

exports.list = async (req, res, next) => {
  try {
    res.json(await Testimonial.find({ published: true }).sort({ createdAt: -1 }).lean());
  } catch (err) {
    next(err);
  }
};
