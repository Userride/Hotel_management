import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Car, Shield, Check, Calendar, Users as UsersIcon } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const HotelDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({ checkIn: '', checkOut: '', guests: 1 });

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/hotels/${id}`);
                setHotel(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchHotel();
    }, [id]);

    const calculateNights = () => {
        if (!bookingData.checkIn || !bookingData.checkOut) return 0;
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const nights = calculateNights();
    const totalPrice = hotel ? hotel.pricePerNight * (nights || 1) : 0;

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) return navigate('/login');
        if (nights <= 0) return alert('Check-out date must be after check-in date');

        try {
            await axios.post('http://localhost:5000/api/bookings', {
                hotelId: id,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                totalPrice
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Booking successful!');
            navigate('/dashboard');
        } catch (error) {
            alert('Booking failed');
        }
    };

    if (loading) return <div className="container section">Loading...</div>;
    if (!hotel) return <div className="container section">Hotel not found.</div>;

    return (
        <div className="hotel-details-page">
            {/* Hero Header */}
            <div className="page-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <span style={{ background: 'var(--secondary)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '700' }}>HOTEL OF THE MONTH</span>
                    <h1 style={{ marginTop: '1rem' }}>{hotel.name}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', color: '#cbd5e1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={18} /> {hotel.location}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={18} color="var(--secondary)" /> 4.9 (128 Reviews)</div>
                    </div>
                </div>
            </div>

            <div className="container section">
                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                    {/* Main Info */}
                    <div className="main-info">
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem' }}>About this Hotel</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8', marginBottom: '3rem' }}>{hotel.description}</p>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Luxurious Amenities</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {['Free High-Speed Wi-Fi', '24/7 Concierge Service', 'Gourmet Breakfast', 'Luxury Spa Access', 'Valet Parking', 'Smart Room Control'].map((amenity, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: 'var(--accent)', background: '#ecfdf5', padding: '6px', borderRadius: '50%' }}>
                                        <Check size={18} />
                                    </div>
                                    <span style={{ fontWeight: '500', color: '#1e293b' }}>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="booking-sidebar">
                        <div className="card" style={{ padding: '2.5rem', border: '1px solid #e2e8f0', position: 'sticky', top: '120px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                                <div>
                                    <span style={{ fontSize: '1.75rem', fontWeight: '800' }}>₹{hotel.pricePerNight}</span>
                                    <span style={{ color: '#64748b' }}> / night</span>
                                </div>
                                <div style={{ color: 'var(--secondary)', display: 'flex', gap: '2px' }}>
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                </div>
                            </div>

                            <form onSubmit={handleBooking}>
                                <div className="form-group">
                                    <label><Calendar size={16} /> Check-In</label>
                                    <input type="date" value={bookingData.checkIn} onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label><Calendar size={16} /> Check-Out</label>
                                    <input type="date" value={bookingData.checkOut} onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label><UsersIcon size={16} /> Number of Guests</label>
                                    <input type="number" min="1" max="5" value={bookingData.guests} onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })} required />
                                </div>

                                {nights > 0 && (
                                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b' }}>Total for {nights} {nights === 1 ? 'night' : 'nights'}</span>
                                        <span style={{ fontWeight: '700' }}>₹{totalPrice}</span>
                                    </div>
                                )}

                                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={nights <= 0 && user}>
                                    {user ? (nights > 0 ? `Book Now - ₹${totalPrice}` : 'Select Dates') : 'Login to Book'}
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>You won't be charged yet.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
