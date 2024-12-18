const express = require('express');
const countryRoutes = require('./routes/countryRoutes');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Apply the authentication middleware before the routes
app.use(authMiddleware);

app.use('/countries', countryRoutes);

module.exports = app;