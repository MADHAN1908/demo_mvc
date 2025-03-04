const express = require('express');
const countryController = require('../controllers/countryController');

const router = express.Router();

router.get('/', countryController.getAllCountries);
router.post('/', countryController.addCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

module.exports = router;