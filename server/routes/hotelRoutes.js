const express = require('express');
const router = express.Router();
const { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getHotels);
router.get('/:id', getHotelById);
router.post('/', protect, authorize('Super Admin'), createHotel);
router.put('/:id', protect, authorize('Super Admin'), updateHotel);
router.delete('/:id', protect, authorize('Super Admin'), deleteHotel);

module.exports = router;
