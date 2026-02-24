const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus, cancelBooking } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.put('/cancel/:id', protect, cancelBooking);
router.get('/', protect, authorize('Super Admin'), getAllBookings);
router.put('/:id', protect, authorize('Super Admin'), updateBookingStatus);

module.exports = router;
