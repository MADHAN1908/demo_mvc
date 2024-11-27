const express = require('express');
const stateController = require('../controllers/stateController');

const router = express.Router();

router.get('/', stateController.getAllStates);
router.post('/', stateController.addState);
router.put('/:id', stateController.updateState);
router.delete('/:id', stateController.deleteState);

module.exports = router;