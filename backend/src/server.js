const { port } = require('./config/env');
const { connectDB } = require('./config/db');
const app = require('./app');

connectDB().finally(() => {
  app.listen(port, () => console.log(`[api] Listening on http://localhost:${port}`));
});
