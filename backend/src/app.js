const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { corsOrigins } = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1); // correct client IPs behind a proxy, for rate limiting
app.use(helmet());
app.use(cors({ origin: corsOrigins }));
app.use(express.json({ limit: '50kb' }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
