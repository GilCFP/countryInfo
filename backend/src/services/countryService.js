const axios = require('axios');
const { API_TOKEN } = require('../config/env');

const fetchAvailableCountries = async () => {
    const response = await axios.get(`${process.env.NAGER_API_BASE_URL}/AvailableCountries`);
    return response.data;
};

const fetchCountryInfo = async (code) => {

    console.info(`[fetchCountryInfo] - Getting border for ${code}`);
    let borderResponse;
    try {
        borderResponse = await axios.get(`${process.env.NAGER_API_BASE_URL}/CountryInfo/${code}`);
    } catch (error) {
        const statusCode = error.response ? error.response.status : 404;
        console.error('[fetchCountryInfo] -',error);
        const err = new Error('Invalid country code provided');
        err.statusCode = statusCode;
        throw err;
    }

    const country = borderResponse.data.commonName;
    const iso2 = borderResponse.data.countryCode;
    
    console.info(`[fetchCountryInfo] - Getting population for ${country}`);
    let populationResponse;
    try {
        populationResponse = await axios.post(`${process.env.COUNTRIES_NOW_API_BASE_URL}/countries/population`, {
            country: country
        });
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        console.error('[fetchCountryInfo] -',error.response.data);
        // const err = new Error('Error fetching population data ', error.response.data.msg);
        // err.statusCode = statusCode;
        // throw err;
    }

    console.info(`[fetchCountryInfo] - Getting flag URL for ${iso2}`);
    let flagResponse;
    try {
        flagResponse = await axios.post(`${process.env.COUNTRIES_NOW_API_BASE_URL}/countries/flag/images`, {
            iso2: iso2
        });
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        console.error('[fetchCountryInfo] -',error.response.data);
        // const err = new Error('Error fetching flag URL');
        // err.statusCode = statusCode;
        // throw err;
    }

    return {
        country: borderResponse.data,
        populationData: populationResponse?.data?.data?.populationCounts || [],
        flagURL: flagResponse?.data?.data?.flag || null
    };
};

module.exports = { fetchAvailableCountries, fetchCountryInfo };