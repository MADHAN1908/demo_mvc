const Country = require('../models/countryModel');

const countryController = {
    getAllCountries: async (req, res) => {
        try {
            const countries = await Country.getAll();
            res.json(countries);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching countries', error:error.message || 'Unexpected error occurred' });
        }
    },
    addCountry: async (req, res) => {
        try {
            const country = await Country.add(req.body);
            res.json(country);
        } catch (error) {
            res.status(500).json({ message: `Error inserting country: ${error.message || 'Validation error occurred'}`, error });
        }
    },
    updateCountry: async (req, res) => {
        try {
            const country = await Country.update(req.params.id, req.body);
            res.json(country);
        } catch (error) {
            res.status(500).json({ message: `Error updating country: ${error.message || 'Unexpected error occurred'}`, error });
        }
    },
    deleteCountry: async (req, res) => {
        try {
            await Country.delete(req.params.id);
            res.json({ message: 'Country deleted successfully' });
        } catch (error) {
            res.status(500).json({ message:`Error deleting country: ${error.message || 'Unexpected error occurred'}`, error });
        }
    },
};

module.exports = countryController;