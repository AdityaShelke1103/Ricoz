const mongoose = require('mongoose');
const { mongoUri } = require('./env');

/** Connects to MongoDB. Returns true on success, false if no URI or the connection fails. */
async function connectDB() {
  if (!mongoUri) {
    console.warn('[db] MONGODB_URI is not set. The API will start, but data routes return 503 until it is.');
    return false;
  }
  try {
    await mongoose.connect(mongoUri);
    console.log('[db] Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('[db] Connection failed:', err.message);
    return false;
  }
}

const isDbReady = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isDbReady };
