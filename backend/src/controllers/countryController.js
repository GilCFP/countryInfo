const { fetchAvailableCountries, fetchCountryInfo } = require('../services/countryService');

const getAvailableCountries = async (req, res) => {
    console.info('getAvailableCountries');
    try {
        const countries = await fetchAvailableCountries();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching available countries' });
    }
};

const getCountryInfo = async (req, res) => {
    console.info('getCountryInfo');
    const { code } = req.params;
    console.info(`code: ${code}`);
    try {
        const countryInfo = await fetchCountryInfo(code);
        res.status(200).json(countryInfo);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        
        res.status(statusCode).json({ error: error.message || 'Error fetching country info' });
    }
};

module.exports = { getAvailableCountries, getCountryInfo };