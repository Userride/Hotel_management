import React from 'react';
import { Coffee, Wifi, Car, Waves, Dumbbell, ShieldCheck, Zap, Utensils, Music, Laptop } from 'lucide-react';

const Services = () => {
    const services = [
        { icon: <Coffee />, title: "Breakfast Buffet", desc: "Start your day with a wide variety of local and international cuisines.", bg: "#eff6ff", color: "#1d4ed8" },
        { icon: <Wifi />, title: "High-Speed Wi-Fi", desc: "Stay connected with our premium fiber network available in all areas.", bg: "#fef3c7", color: "#d97706" },
        { icon: <Car />, title: "Valet Parking", desc: "Safe and secure 24/7 parking for all our guests with electric charging.", bg: "#d1fae5", color: "#059669" },
        { icon: <Waves />, title: "Spa & Infinity Pool", desc: "Relax and rejuvenate in our world-class facilities with a breathtaking view.", bg: "#fae8ff", color: "#a21caf" },
        { icon: <Dumbbell />, title: "Fitness Center", desc: "State-of-the-art modern equipment for your complete daily workout.", bg: "#fee2e2", color: "#dc2626" },
        { icon: <ShieldCheck />, title: "24/7 Concierge", desc: "Your safety and requests are our absolute priority, around the clock.", bg: "#f1f5f9", color: "#475569" }
    ];

    return (
        <div className="services-page">
            <div className="page-header">
                <div className="container">
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>LUXURY AMENITIES</span>
                    <h1>Exquisite Services</h1>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Tailored to Your Desires</h2>
                        <p style={{ fontSize: '1.2rem', color: '#64748b' }}>We provide a comprehensive range of premium services designed to make your stay as comfortable and memorable as possible.</p>
                    </div>

                    <div className="services-grid">
                        {services.map((s, i) => (
                            <div key={i} className="service-card card" style={{ padding: '3.5rem 2.5rem' }}>
                                <div className="service-icon" style={{ background: s.bg, color: s.color, width: '80px', height: '80px', borderRadius: '24px' }}>
                                    {React.cloneElement(s.icon, { size: 32 })}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{s.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: '1.7' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialty Section */}
            <section className="section bg-light" style={{ background: 'var(--dark)', color: 'white' }}>
                <div className="container">
                    <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>BUSINESS & EVENTS</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '1rem', marginBottom: '1.5rem' }}>Perfect for Professionals</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Zap color="var(--secondary)" />
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem' }}>Ultra-Fast Connectivity</h4>
                                        <p style={{ color: '#94a3b8' }}>Dedicated lines for lag-free global conferences.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Laptop color="var(--secondary)" />
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem' }}>Executive Lounge</h4>
                                        <p style={{ color: '#94a3b8' }}>Private spaces for meetings and high-level decisions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                                alt="Business Lounge"
                                style={{ width: '100%', borderRadius: '24px' }}
                            />
                            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--primary)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                                <h4 style={{ fontSize: '2rem', fontWeight: '800' }}>5+</h4>
                                <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Conference Halls</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
