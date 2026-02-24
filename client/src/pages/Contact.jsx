import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

const Contact = () => {
    const hotelLocation = "https://www.google.com/maps?q=The+Taj+Mahal+Palace+Mumbai";
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>GET IN TOUCH</span>
                    <h1>We're Here for You</h1>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem' }}>
                        {/* Form Side */}
                        <div>
                            <div style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Send Us a Message</h2>
                                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Have a question or a special request? Drop us a line and our team will respond within 2 hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="card" style={{ padding: '3rem', border: 'none' }}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Your Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help you?"
                                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontFamily: 'inherit' }}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Info Side */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card" style={{ padding: '2.5rem', border: 'none' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: '700' }}>Contact Details</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ background: '#eff6ff', color: 'var(--primary)', padding: '12px', borderRadius: '12px' }}><MapPin /></div>
                                        <div>
                                            <h5 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Address</h5>
                                            <p style={{ fontWeight: '600' }}>Marine Drive, Mumbai, Maharashtra, India</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ background: '#fef3c7', color: 'var(--secondary)', padding: '12px', borderRadius: '12px' }}><Phone /></div>
                                        <div>
                                            <h5 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</h5>
                                            <p style={{ fontWeight: '600' }}>+91 22 6665 3366</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ background: '#d1fae5', color: 'var(--accent)', padding: '12px', borderRadius: '12px' }}><Mail /></div>
                                        <div>
                                            <h5 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</h5>
                                            <p style={{ fontWeight: '600' }}>stay@royalindianhotels.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden', border: 'none', background: 'var(--dark)', color: 'white' }}>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>View on Maps</h3>
                                    <p style={{ opacity: '0.7', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Click below to get directions to our premium location.</p>
                                    <button
                                        onClick={() => window.open(hotelLocation, '_blank')}
                                        className="btn-hero"
                                        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
                                    >
                                        Open Google Maps <Globe size={18} />
                                    </button>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1590059390258-062e2129e196?auto=format&fit=crop&w=800&q=80"
                                    alt="Mumbai Map"
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', opacity: '0.5' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
