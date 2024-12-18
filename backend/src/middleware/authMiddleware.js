
const { API_TOKEN } = require('../config/env');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token === `Bearer ${API_TOKEN}`) {
        next();
    } else {
        console.error('Unauthorized access - Token:' + token);
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

module.exports = authMiddleware;