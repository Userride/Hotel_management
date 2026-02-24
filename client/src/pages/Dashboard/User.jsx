import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Calendar, LogOut, CheckCircle, XCircle, Clock, Star, Award, Heart } from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [savedHotels, setSavedHotels] = useState([
        { id: 1, name: 'The Taj Mahal Palace', location: 'Mumbai', price: 25000 },
        { id: 2, name: 'Rambagh Palace', location: 'Jaipur', price: 35000 }
    ]);
    const [profile, setProfile] = useState({ name: user.name, email: user.email, password: '' });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/bookings/mybookings', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/auth/profile', {
                name: profile.name,
                password: profile.password || undefined
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Profile updated successfully!');
            setProfile({ ...profile, password: '' });
        } catch (error) {
            alert('Profile update failed');
        }
    };

    const handleCancelBooking = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await axios.put(`http://localhost:5000/api/bookings/cancel/${id}`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Booking cancelled');
            fetchBookings();
        } catch (error) {
            alert('Cancellation failed');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {bookings.map(booking => (
                            <div key={booking._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{booking.hotel?.name || 'Hotel'}</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                        {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}
                                    </p>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {getStatusIcon(booking.status)}
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{booking.status}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>₹{booking.totalPrice}</p>
                                    {booking.status === 'Booked' && (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="read-more"
                                            style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '0', fontSize: '0.9rem' }}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'saved':
                return (
                    <div className="features-grid">
                        {savedHotels.map(h => (
                            <div key={h.id} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heart fill="red" color="red" size={20} />
                                    <Star fill="gold" color="gold" size={16} />
                                </div>
                                <h4 style={{ marginTop: '1rem' }}>{h.name}</h4>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{h.location}</p>
                                <p style={{ fontWeight: '700', marginTop: '0.5rem' }}>₹{h.price}/night</p>
                            </div>
                        ))}
                    </div>
                );
            case 'profile':
                return (
                    <div className="card" style={{ padding: '3rem' }}>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="form-group"><label>Full Name</label><input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
                            <div className="form-group"><label>Email Address</label><input type="email" value={profile.email} disabled /></div>
                            <div className="form-group"><label>New Password (leave blank to keep current)</label><input type="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} /></div>
                            <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Update Profile</button>
                        </form>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="dashboard container section">
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '3rem' }}>
                <div className="sidebar">
                    {/* Loyalty Feature */}
                    <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
                        <Award size={32} style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>2,450</h3>
                        <p style={{ fontSize: '0.8rem', opacity: '0.9' }}>Loyalty Points</p>
                        <div style={{ fontSize: '0.7rem', marginTop: '1rem', background: 'rgba(255,255,255,0.2)', padding: '5px', borderRadius: '4px' }}>Gold Member</div>
                    </div>

                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button onClick={() => setActiveTab('bookings')} style={tabStyles(activeTab === 'bookings')}><Calendar size={18} /> My Bookings</button>
                        <button onClick={() => setActiveTab('saved')} style={tabStyles(activeTab === 'saved')}><Heart size={18} /> Saved Hotels</button>
                        <button onClick={() => setActiveTab('profile')} style={tabStyles(activeTab === 'profile')}><User size={18} /> Profile Settings</button>
                    </div>
                </div>

                <div className="content">
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>
                        {activeTab === 'bookings' ? 'Your Stays' : activeTab === 'saved' ? 'Favorites' : 'Account Details'}
                    </h2>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const getStatusIcon = (status) => {
    if (status === 'Successful') return <CheckCircle size={16} color="#10b981" />;
    if (status === 'Cancelled') return <XCircle size={16} color="#ef4444" />;
    return <Clock size={16} color="#3b82f6" />;
};

const tabStyles = (isActive) => ({
    background: isActive ? '#eff6ff' : 'transparent',
    color: isActive ? 'var(--primary)' : '#64748b',
    border: 'none',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'left',
    fontWeight: isActive ? '700' : '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.2s'
});

export default UserDashboard;
