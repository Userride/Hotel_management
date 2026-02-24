import React from 'react';
import { Award, Target, Heart, Users, Sparkles } from 'lucide-react';

const About = () => {
    const stats = [
        { label: "Hotels", value: "25+" },
        { label: "Happy Guests", value: "10k+" },
        { label: "Cities", value: "12" },
        { label: "Awards", value: "50+" }
    ];

    return (
        <div className="about-page">
            <div className="page-header">
                <div className="container">
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>OUR STORY</span>
                    <h1>A Legacy of Excellence</h1>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                                alt="Luxury Hotel"
                                style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
                            />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Where Heritage Meets Luxury</h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Since 1995, The Taj Hotel has been redefined the art of hospitality. What started as a boutique palace hotel in the heart of Udaipur has grown into a national icon of luxury.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8' }}>
                                Our commitment to "Atithi Devo Bhava" remains unchanged. We believe every guest deserves a legendary experience, crafted with precision and delivered with warmth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section bg-white" style={{ background: 'var(--dark)', color: 'white', overflow: 'hidden' }}>
                <div className="container">
                    <div className="stats-grid" style={{ border: 'none' }}>
                        {stats.map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>{s.value}</h2>
                                <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: '500' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><Award /></div>
                            <h3>Excellence</h3>
                            <p>We strive for perfection in every service we provide, ensuring a quality stay.</p>
                        </div>
                        <div className="feature-card">
                            <Target />
                            <h3>Integrity</h3>
                            <p>Honesty and transparency are at the foundation of our business relationships.</p>
                        </div>
                        <div className="feature-card">
                            <Heart />
                            <h3>Passion</h3>
                            <p>We are passionate about creating memorable moments for all our guests.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
