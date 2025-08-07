require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Load from .env
const TEAM_ID = process.env.TEAM_ID;
const KEY_ID = process.env.KEY_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n'); // Fix \n issue

// ✅ Serve developer token
app.get('/token', (req, res) => {
  try {
    const token = jwt.sign({}, PRIVATE_KEY, {
      algorithm: 'ES256',
      expiresIn: '180d',
      issuer: TEAM_ID,
      header: {
        alg: 'ES256',
        kid: KEY_ID
      }
    });

    res.json({ token });
  } catch (err) {
    console.error('❌ Token generation error:', err.message);
    res.status(500).json({ error: 'Failed to generate token', details: err.message });
  }
});

// ✅ Optional health check
app.get('/', (req, res) => {
  res.send('🎶 TeenConnect Music Token Server is live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎵 Server running at http://localhost:${PORT}/token`);
});
