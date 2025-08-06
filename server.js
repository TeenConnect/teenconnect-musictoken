const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Serve static files from the 'images' folder
app.use('/images', express.static('images'));

// ✅ Load credentials from environment variables
const TEAM_ID = process.env.APPLE_TEAM_ID;
const KEY_ID = process.env.APPLE_KEY_ID;
const PRIVATE_KEY = (process.env.APPLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'); // Converts \n to real newlines

// ✅ Serve developer token on request
app.get('/token', (req, res) => {
  try {
    const token = jwt.sign({}, PRIVATE_KEY, {
      algorithm: 'ES256',
      expiresIn: '180d', // Max allowed by Apple
      issuer: TEAM_ID,
      header: {
        alg: 'ES256',
        kid: KEY_ID
      }
    });

    res.json({ token });
  } catch (err) {
    console.error('❌ Token generation error:', err);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎵 Apple Music Token Server running at http://localhost:${PORT}/token`);
  console.log(`🖼️ Logo available at http://localhost:${PORT}/images/teenconnect-music-logo.png`);
});
