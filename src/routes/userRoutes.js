const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const { validateRegistration, validateLogin, handleValidationErrors } = require('../middleware/validation');

router.post('/register', validateRegistration, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', getProfile);

module.exports = router;