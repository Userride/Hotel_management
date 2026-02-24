const Hotel = require('../models/Hotel');

const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) res.json(hotel);
        else res.status(404).json({ message: 'Hotel not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createHotel = async (req, res) => {
    const { name, location, description, pricePerNight, amenities, images } = req.body;
    try {
        const hotel = await Hotel.create({ name, location, description, pricePerNight, amenities, images });
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) {
            hotel.name = req.body.name || hotel.name;
            hotel.location = req.body.location || hotel.location;
            hotel.description = req.body.description || hotel.description;
            hotel.pricePerNight = req.body.pricePerNight || hotel.pricePerNight;
            hotel.amenities = req.body.amenities || hotel.amenities;
            hotel.images = req.body.images || hotel.images;

            const updatedHotel = await hotel.save();
            res.json(updatedHotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) {
            await hotel.deleteOne();
            res.json({ message: 'Hotel removed' });
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHotels, getHotelById, createHotel, updateHotel, deleteHotel };
