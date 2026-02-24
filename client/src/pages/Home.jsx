import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Coffee, Award, MapPin, Sparkles } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = React.useState([]);

    React.useEffect(() => {
        const fetchHotels = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/hotels');
                setHotels(data.slice(0, 3)); // Display top 3
            } catch (error) {
                console.error(error);
            }
        };
        fetchHotels();
    }, []);

    const features = [
        { icon: <Star />, title: "5-Star Luxury", desc: "Experience the highest standards of hospitality in every detail." },
        { icon: <Shield />, title: "Secure Stay", desc: "Advanced security protocols to ensure your peace of mind." },
        { icon: <Coffee />, title: "Culinary Excellence", desc: "World-class chefs preparing gourmet meals for every palate." }
    ];

    const services = [
        { title: "Premium Suites", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80" },
        { title: "Wellness Spa", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&w=800&q=80" },
        { title: "Fine Dining", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" }
    ];

    const testimonials = [
        { name: "John Doe", role: "Frequent Traveler", text: "The most comfortable stay I've ever had. The staff was incredibly attentive and the rooms were breathtaking." },
        { name: "Sarah Smith", role: "Business Mogul", text: "Perfect for business trips. High-speed internet, quiet atmosphere, and the best coffee in the city." }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1>Experience Luxury<br />at The Taj</h1>
                    <p>Where heritage meets modern comfort. Your gateway to an unforgettable legendary stay in the heart of India.</p>
                    <button onClick={() => navigate('/services')} className="btn-hero">
                        Explore Rooms <ArrowRight size={22} />
                    </button>
                </div>
            </section>

            {/* Featured Stays */}
            <section className="section bg-light">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>DISCOVER</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Featured Stays</h2>
                        </div>
                        <p style={{ color: '#64748b', maxWidth: '400px', textAlign: 'right' }}>Handpicked luxury destinations for your next legendary escape.</p>
                    </div>

                    <div className="blogs-grid">
                        {hotels.map(hotel => (
                            <div key={hotel._id} className="blog-card card" onClick={() => navigate(`/hotels/${hotel._id}`)} style={{ cursor: 'pointer' }}>
                                <div style={{ height: '250px', overflow: 'hidden', background: '#f1f5f9' }}>
                                    <img
                                        src={hotel.images?.[0]}
                                        alt={hotel.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                </div>
                                <div className="blog-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.9rem' }}>
                                            <MapPin size={14} /> {hotel.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--secondary)', fontWeight: '700' }}>
                                            <Star size={14} fill="currentColor" /> 4.9
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{hotel.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>₹{hotel.pricePerNight}<small style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '400' }}> / night</small></span>
                                        <button className="read-more" style={{ fontSize: '0.9rem' }}>Explore <ArrowRight size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {hotels.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#64748b' }}>Discovering our finest rooms...</p>}
                    </div>
                </div>
            </section>

            {/* Stats/Quick Features */}
            <section className="section bg-white">
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="section overflow-hidden">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Services</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '0.5rem' }}>Elegance in Every Service</h2>
                        </div>
                        <button onClick={() => navigate('/services')} className="read-more" style={{ fontSize: '1.1rem' }}>View All Services <ArrowRight size={18} /></button>
                    </div>

                    <div className="blogs-grid">
                        {services.map((s, i) => (
                            <div key={i} className="blog-card card" style={{ cursor: 'pointer' }}>
                                <img src={s.img} alt={s.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                <div className="blog-content" style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section bg-light" style={{ background: 'var(--dark)', color: 'white' }}>
                <div className="container">
                    <h2 className="section-title" style={{ color: 'white' }}>Guest Experiences</h2>
                    <div className="features-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="feature-card" style={{ background: 'var(--dark-light)', border: 'none' }}>
                                <Sparkles style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} size={32} />
                                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem', color: '#cbd5e1' }}>"{t.text}"</p>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{t.name}</h4>
                                <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '600' }}>{t.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section bg-white text-center">
                <div className="container">
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', padding: '5rem 3rem', borderRadius: '40px', color: 'white' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready for a Memorable Stay?</h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Join our exclusive membership to get 20% off on your first booking and early access to luxurious events.</p>
                        <button onClick={() => navigate('/register')} className="btn-hero" style={{ background: 'white', color: 'var(--primary)', boxShadow: 'none' }}>
                            Join Now & Book <Award size={22} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
