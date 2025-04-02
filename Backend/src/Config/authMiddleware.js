const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// require('dotenv').config();

const SECRET_KEY =  'your_secret_key';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    

    try {
        const token = authHeader.split(' ')[1]; 
        console.log("🔹 Received Token:", token);
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("🔹 Decoded Token:", decoded); // Debugging
        const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // ✅ Attach user to request

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;