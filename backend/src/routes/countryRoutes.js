const express = require('express');
const { getAvailableCountries, getCountryInfo } = require('../controllers/countryController');

const router = express.Router();

router.get('/available', getAvailableCountries);
router.get('/info/:code', getCountryInfo);

module.exports = router;