const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../midleware/upload')

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/',upload.single('photo'), userController.addUser);
router.put('/',upload.single('photo'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;