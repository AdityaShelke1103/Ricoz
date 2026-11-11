const Service = require('../models/Service');

exports.list = async (req, res, next) => {
  try {
    res.json(await Service.find().sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
};
