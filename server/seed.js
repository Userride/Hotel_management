const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');

dotenv.config();

const indianHotels = [
    {
        name: "The Taj Mahal Palace",
        location: "Mumbai, Maharashtra",
        description: "An architectural marvel overlooking the Arabian Sea, offering a legendary blend of rich history and modern luxury since 1903.",
        pricePerNight: 28000,
        amenities: ["Spa", "Sea View Rooms", "Fine Dining", "Luxury Shopping", "Art Gallery"],
        images: ["https://images.unsplash.com/photo-1598302842175-221852bbfd2b?auto=format&fit=crop&w=1200&q=80"]
    },
    {
        name: "The Leela Palace",
        location: "Udaipur, Rajasthan",
        description: "A modern palace resort nestled on the banks of Lake Pichola, offering breathtaking views and royal Rajasthani hospitality.",
        pricePerNight: 35000,
        amenities: ["Infinity Pool", "Boat Arrival", "Royal Spa", "Fine Dining", "Yoga Deck"],
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"]
    },
    {
        name: "Rambagh Palace",
        location: "Jaipur, Rajasthan",
        description: "Known as the Jewel of Jaipur, this former residence of the Maharaja offers a magnificent experience of royal heritage.",
        pricePerNight: 42000,
        amenities: ["Heritage Walks", "Peacock Garden", "Spacious Suites", "Gourmet Kitchen", "Vintage Car Rides"],
        images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecde9d7?auto=format&fit=crop&w=1200&q=80"]
    },
    {
        name: "ITC Grand Chola",
        location: "Chennai, Tamil Nadu",
        description: "An ornate vision of the golden age of the Cholas, this hotel is a masterpiece of Dravidian architecture and luxury.",
        pricePerNight: 22000,
        amenities: ["Luxury Spa", "Gourmet Dining", "Helipad", "Grand Ballroom", "Service Excellence"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Hotel.deleteMany({});
        console.log('Cleared existing hotels.');

        await Hotel.insertMany(indianHotels);
        console.log('Seeded Indian hotels successfully!');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
