const express = require('express');
const cors = require('cors');
const path = require('path');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/countries', countryRoutes);
app.use('/states', stateRoutes);
app.use('/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});