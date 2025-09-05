const AuthenticationError = require("../exceptions/AuthenticationError");
const AuthorizationError = require("../exceptions/AuthorizationError");
const tokenManager = require("../config/token");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new AuthenticationError("Access token is required");
    }

    try {
        const decoded = tokenManager.verifyAccessToken(token);
        req.user = decoded;
        next();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        throw new AuthorizationError("Invalid or expired access token");
    }
}

module.exports = authenticateToken;