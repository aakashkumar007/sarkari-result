// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify if the user is authenticated
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with a secret key
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authenticateUser;
