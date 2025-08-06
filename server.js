const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Load credentials from environment variables
const TEAM_ID = process.env.APPLE_TEAM_ID;
const KEY_ID = process.env.APPLE_KEY_ID;
const PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'); // Fix newline formatting

// Serve developer token on request
app.get('/token', (req, res) => {
  const token = jwt.sign({}, PRIVATE_KEY, {
    algorithm: 'ES256',
    expiresIn: '180d',  // Max allowed
    issuer: TEAM_ID,
    header: {
      alg: 'ES256',
      kid: KEY_ID
    }
  });

  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎵 Apple Music Token Server running at http://localhost:${PORT}/token`);
});
