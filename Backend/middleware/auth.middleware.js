const jwt = require('jsonwebtoken')
const blackListToken = require('../models/blacklist.model')

async function User(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not found. Please log in."
        });
    }

    try {
        const isTokenBlackListed = await blackListToken.findOne({ token });
        if (isTokenBlackListed) {
            return res.status(401).json({
                message: "Token is blacklisted. Please log in again."
            });
        }

        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || process.env.JWT_SCRETE || "default_jwt_secret"
        );

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
}   

module.exports = { User }