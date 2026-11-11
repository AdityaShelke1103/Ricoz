const Inquiry = require('../models/Inquiry');

const num = (v) => (v === '' || v === null || v === undefined ? undefined : Number(v));

exports.create = async (req, res, next) => {
  try {
    const b = req.body || {};
    const doc = await Inquiry.create({
      name: b.name,
      company: b.company,
      email: b.email,
      phone: b.phone,
      propertyType: b.propertyType,
      floorAreaSqFt: num(b.floorAreaSqFt),
      interest: b.interest,
      preferredTermYears: num(b.preferredTermYears),
      message: b.message,
    });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      const msg = err.errors ? Object.values(err.errors).map((e) => e.message).join(' ') : 'Invalid request.';
      return res.status(400).json({ error: msg });
    }
    next(err);
  }
};
