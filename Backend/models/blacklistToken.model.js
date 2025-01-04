const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensure each token is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // TTL in seconds (24 hours)
  },
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;