const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, deleteUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
