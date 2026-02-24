const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

const createBooking = async (req, res) => {
    const { hotelId, checkIn, checkOut, totalPrice } = req.body;
    try {
        const booking = await Booking.create({
            user: req.user._id,
            hotel: hotelId,
            checkIn,
            checkOut,
            totalPrice
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('hotel');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user hotel');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        booking.status = 'Cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus, cancelBooking };
