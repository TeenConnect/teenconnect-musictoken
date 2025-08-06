// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

// Load your private key (.p8)
const privateKey = fs.readFileSync('AuthKey_3S7KV79R9Q.p8', 'utf8');

// Apple Developer credentials
const TEAM_ID = '3LCD288RQN';       // ← Your Team ID
const KEY_ID = '3S7KV79R9Q';         // ← Your Key ID

// Serve developer token on request
app.get('/token', (req, res) => {
  const token = jwt.sign({}, privateKey, {
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
