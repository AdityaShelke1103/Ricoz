const express = require('express');
const requireDb = require('../middleware/requireDb');
const { inquiryLimiter } = require('../middleware/rateLimit');
const { isDbReady } = require('../config/db');
const services = require('../controllers/services.controller');
const testimonials = require('../controllers/testimonials.controller');
const inquiries = require('../controllers/inquiries.controller');

const router = express.Router();

router.get('/health', (req, res) => res.json({ ok: true, db: isDbReady() ? 'connected' : 'not connected' }));

router.get('/services', requireDb, services.list);
router.get('/testimonials', requireDb, testimonials.list);
router.post('/inquiries', inquiryLimiter, requireDb, inquiries.create);

module.exports = router;
