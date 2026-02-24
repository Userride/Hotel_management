import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Hotel, Users, BookOpen, LayoutDashboard, FileText, CalendarCheck, Settings } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SuperAdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ hotels: 0, users: 0, bookings: 0, booked: 0, cancelled: 0, successful: 0 });
    const [hotels, setHotels] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hotelModal, setHotelModal] = useState({ open: false, data: null });
    const [blogModal, setBlogModal] = useState({ open: false, data: null });
    const { user: authUser } = useAuth();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${authUser.token}` } };
            const [hotelRes, bookingRes, userRes, blogRes] = await Promise.all([
                axios.get('http://localhost:5000/api/hotels'),
                axios.get('http://localhost:5000/api/bookings', config),
                axios.get('http://localhost:5000/api/auth', config),
                axios.get('http://localhost:5000/api/blogs')
            ]);
            setHotels(hotelRes.data);
            setBookings(bookingRes.data);
            setUsers(userRes.data);
            setBlogs(blogRes.data);

            const successful = bookingRes.data.filter(b => b.status === 'Successful').length;
            const cancelled = bookingRes.data.filter(b => b.status === 'Cancelled').length;
            const booked = bookingRes.data.length - successful - cancelled;

            setStats({
                hotels: hotelRes.data.length,
                users: userRes.data.length,
                bookings: bookingRes.data.length,
                booked, cancelled, successful
            });
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
        setLoading(false);
    };

    const fetchHotels = async () => {
        const { data } = await axios.get('http://localhost:5000/api/hotels');
        setHotels(data);
    };

    const handleDeleteHotel = async (id) => {
        if (!window.confirm('Delete this hotel?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            });
            fetchAllData();
        } catch (error) { alert('Action failed'); }
    };

    const handleHotelSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.amenities = data.amenities.split(',').map(a => a.trim());
        data.images = [data.image];
        try {
            const config = { headers: { Authorization: `Bearer ${authUser.token}` } };
            if (hotelModal.data) await axios.put(`http://localhost:5000/api/hotels/${hotelModal.data._id}`, data, config);
            else await axios.post('http://localhost:5000/api/hotels', data, config);
            setHotelModal({ open: false, data: null });
            fetchAllData();
        } catch (error) { alert('Save failed'); }
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        try {
            const config = { headers: { Authorization: `Bearer ${authUser.token}` } };
            if (blogModal.data) await axios.put(`http://localhost:5000/api/blogs/${blogModal.data._id}`, data, config);
            else await axios.post('http://localhost:5000/api/blogs', data, config);
            setBlogModal({ open: false, data: null });
            fetchAllData();
        } catch (error) { alert('Save failed'); }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Delete post?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            });
            fetchAllData();
        } catch (error) { alert('Delete failed'); }
    };

    const handleUpdateBooking = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}`, { status }, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            });
            fetchAllData();
        } catch (error) { alert('Update failed'); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Remove user?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/${id}`, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            });
            fetchAllData();
        } catch (error) { alert('Action failed'); }
    };

    const renderContent = () => {
        if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Synchronizing Royal Data...</div>;

        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="icon-label" style={{ background: '#dbeafe', color: '#1d4ed8' }}><Hotel /></div>
                                <div><h3>Total Hotels</h3><p>{stats.hotels}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="icon-label" style={{ background: '#fef3c7', color: '#d97706' }}><Users /></div>
                                <div><h3>Total Users</h3><p>{stats.users}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="icon-label" style={{ background: '#d1fae5', color: '#059669' }}><BookOpen /></div>
                                <div><h3>Total Bookings</h3><p>{stats.bookings}</p></div>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Booking Breakdown</h3>
                        <div className="stats-grid">
                            <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                                <div><h3>Booked</h3><p style={{ color: '#3b82f6' }}>{stats.booked}</p></div>
                            </div>
                            <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
                                <div><h3>Cancelled</h3><p style={{ color: '#ef4444' }}>{stats.cancelled}</p></div>
                            </div>
                            <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                                <div><h3>Successful</h3><p style={{ color: '#10b981' }}>{stats.successful}</p></div>
                            </div>
                        </div>

                        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Admin Capabilities</h3>
                        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <div className="card" onClick={() => setActiveTab('hotels')} style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <Hotel size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Manage Hotels</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Add, edit or remove rooms.</p>
                            </div>
                            <div className="card" onClick={() => setActiveTab('bookings')} style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <CalendarCheck size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Manage Bookings</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>View and update reservations.</p>
                            </div>
                            <div className="card" onClick={() => setActiveTab('users')} style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <Users size={32} color="#d97706" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Manage Users</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Control access and roles.</p>
                            </div>
                            <div className="card" onClick={() => setActiveTab('blogs')} style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <FileText size={32} color="#059669" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Manage Blogs</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Publish news and updates.</p>
                            </div>
                        </div>
                    </>
                );
            case 'hotels':
                return (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                            <h3>Inventory</h3>
                            <button className="login-btn" style={{ padding: '0.5rem 1rem' }} onClick={() => setHotelModal({ open: true, data: null })}><Plus size={16} /> Add Hotel</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Location</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map(h => (
                                    <tr key={h._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>{h.name}</td>
                                        <td style={{ padding: '1rem' }}>{h.location}</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <Edit size={16} color="#3b82f6" cursor="pointer" title="Edit Hotel" onClick={() => setHotelModal({ open: true, data: h })} />
                                            <Trash size={16} color="#ef4444" cursor="pointer" title="Delete Hotel" onClick={() => handleDeleteHotel(h._id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {hotelModal.open && (
                            <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                                <div className="card" style={{ width: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                                    <h3>{hotelModal.data ? 'Edit Hotel' : 'Add New Hotel'}</h3>
                                    <form onSubmit={handleHotelSubmit} style={{ marginTop: '1.5rem' }}>
                                        <div className="form-group"><label>Hotel Name</label><input name="name" defaultValue={hotelModal.data?.name} required /></div>
                                        <div className="form-group"><label>Location</label><input name="location" defaultValue={hotelModal.data?.location} required /></div>
                                        <div className="form-group"><label>Price Per Night (₹)</label><input type="number" name="pricePerNight" defaultValue={hotelModal.data?.pricePerNight} required /></div>
                                        <div className="form-group"><label>Description</label><textarea name="description" defaultValue={hotelModal.data?.description} required rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}></textarea></div>
                                        <div className="form-group"><label>Image URL</label><input name="image" defaultValue={hotelModal.data?.images?.[0]} required /></div>
                                        <div className="form-group"><label>Amenities (comma separated)</label><input name="amenities" defaultValue={hotelModal.data?.amenities?.join(', ')} required /></div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                            <button type="submit" className="login-btn" style={{ flex: 1 }}>{hotelModal.data ? 'Update' : 'Create'}</button>
                                            <button type="button" className="btn-hero" style={{ flex: 1, background: '#f1f5f9', color: 'var(--dark)' }} onClick={() => setHotelModal({ open: false, data: null })}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'bookings':
                return (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}><h3>All Bookings</h3></div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>User</th>
                                    <th style={{ padding: '1rem' }}>Hotel</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>{b.userId?.name || 'Guest'}</td>
                                        <td style={{ padding: '1rem' }}>{b.hotelId?.name || 'Hotel'}</td>
                                        <td style={{ padding: '1rem' }}><span style={{ color: b.status === 'Successful' ? '#10b981' : b.status === 'Cancelled' ? '#ef4444' : '#3b82f6', fontWeight: '600' }}>{b.status}</span></td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            {b.status !== 'Successful' && <button onClick={() => handleUpdateBooking(b._id, 'Successful')} style={{ fontSize: '0.7rem', padding: '4px 8px', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>}
                                            {b.status !== 'Cancelled' && <button onClick={() => handleUpdateBooking(b._id, 'Cancelled')} style={{ fontSize: '0.7rem', padding: '4px 8px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'users':
                return (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}><h3>System Users</h3></div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>{u.name}</td>
                                        <td style={{ padding: '1rem' }}>{u.role}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {u._id !== authUser._id && <Trash size={16} color="#ef4444" cursor="pointer" title="Remove User" onClick={() => handleDeleteUser(u._id)} />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'blogs':
                return (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                            <h3>Blog Posts</h3>
                            <button className="login-btn" style={{ padding: '0.5rem 1rem' }} onClick={() => setBlogModal({ open: true, data: null })}><Plus size={16} /> New Post</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Title</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(b => (
                                    <tr key={b._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>{b.title}</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.8rem' }}>
                                            <Edit size={16} color="#3b82f6" cursor="pointer" onClick={() => setBlogModal({ open: true, data: b })} />
                                            <Trash size={16} color="#ef4444" cursor="pointer" onClick={() => handleDeleteBlog(b._id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {blogModal.open && (
                            <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                                <div className="card" style={{ width: '500px', padding: '2rem' }}>
                                    <h3>{blogModal.data ? 'Edit Post' : 'New Post'}</h3>
                                    <form onSubmit={handleBlogSubmit} style={{ marginTop: '1.5rem' }}>
                                        <div className="form-group"><label>Title</label><input name="title" defaultValue={blogModal.data?.title} required /></div>
                                        <div className="form-group"><label>Image URL</label><input name="image" defaultValue={blogModal.data?.image} required /></div>
                                        <div className="form-group"><label>Content</label><textarea name="content" defaultValue={blogModal.data?.content} required rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}></textarea></div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                            <button type="submit" className="login-btn" style={{ flex: 1 }}>{blogModal.data ? 'Update' : 'Publish'}</button>
                                            <button type="button" className="btn-hero" style={{ flex: 1, background: '#f1f5f9', color: 'var(--dark)' }} onClick={() => setBlogModal({ open: false, data: null })}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="dashboard container section">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '2rem' }}>
                <div className="sidebar">
                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button onClick={() => setActiveTab('overview')} style={tabStyles(activeTab === 'overview')}><LayoutDashboard size={18} /> Overview</button>
                        <button onClick={() => setActiveTab('hotels')} style={tabStyles(activeTab === 'hotels')}><Hotel size={18} /> Hotels</button>
                        <button onClick={() => setActiveTab('bookings')} style={tabStyles(activeTab === 'bookings')}><CalendarCheck size={18} /> Bookings</button>
                        <button onClick={() => setActiveTab('users')} style={tabStyles(activeTab === 'users')}><Users size={18} /> Users</button>
                        <button onClick={() => setActiveTab('blogs')} style={tabStyles(activeTab === 'blogs')}><FileText size={18} /> Blogs</button>
                    </div>
                </div>
                <div className="main-content">
                    <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Super Admin Panel</h1>
                        <p style={{ color: '#64748b' }}>Complete control over The Taj Hotel system.</p>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const tabStyles = (isActive) => ({
    background: isActive ? 'var(--primary)' : 'transparent',
    color: isActive ? 'white' : 'var(--dark-light)',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    textAlign: 'left',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
});

export default SuperAdminDashboard;
