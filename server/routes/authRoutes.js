const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUserProfile, getUsers, deleteUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, authorize('Super Admin'), getUsers);
router.delete('/:id', protect, authorize('Super Admin'), deleteUser);

module.exports = router;
