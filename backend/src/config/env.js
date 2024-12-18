const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    NAGER_API_BASE_URL: process.env.NAGER_API_BASE_URL,
    COUNTRIES_NOW_API_BASE_URL: process.env.COUNTRIES_NOW_API_BASE_URL,
    API_TOKEN: process.env.API_TOKEN
};