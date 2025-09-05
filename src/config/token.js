const createTokenManager = require('../utils/tokenManager');

const tokenManager = createTokenManager({
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
});

module.exports = tokenManager;
