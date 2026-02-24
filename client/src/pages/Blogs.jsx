import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const Blogs = () => {
    const [blogs] = useState([
        {
            _id: '1',
            title: 'Top 10 Travel Tips for Your Next Luxury Stay',
            content: 'Experience luxury like never before with our curated travel guide. From packing secrets to choosing the right suite...',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
            category: 'Travel',
            date: 'May 12, 2024'
        },
        {
            _id: '2',
            title: 'The Art of Fine Dining: A Culinary Adventure',
            content: 'Inside the kitchens of The Taj Hotel, where every dish is a masterpiece and every flavor tells a unique story...',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
            category: 'Lifestyle',
            date: 'May 08, 2024'
        },
        {
            _id: '3',
            title: 'Rediscovering Wellness in the Heart of the City',
            content: 'Our new spa treatments combine ancient wisdom with modern techniques for the ultimate relaxation experience...',
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&w=800&q=80',
            category: 'Wellness',
            date: 'May 01, 2024'
        }
    ]);

    return (
        <div className="blogs-page">
            <div className="page-header">
                <div className="container">
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px' }}>INSIGHTS & STORIES</span>
                    <h1>The Taj Blog</h1>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Recent Stories</h2>
                        <div style={{ display: 'flex', gap: '1rem', background: 'white', padding: '0.5rem 1.5rem', borderRadius: '50px', boxShadow: 'var(--shadow-sm)', border: '1px solid #f1f5f9' }}>
                            <Search size={20} color="#94a3b8" />
                            <input type="text" placeholder="Search insights..." style={{ border: 'none', outline: 'none', fontSize: '1rem' }} />
                        </div>
                    </div>

                    <div className="blogs-grid">
                        {blogs.map(blog => (
                            <div key={blog._id} className="blog-card card">
                                <div style={{ position: 'relative' }}>
                                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                                    <span style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>{blog.category}</span>
                                </div>
                                <div className="blog-content" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {blog.date}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> Admin</div>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.3' }}>{blog.title}</h3>
                                    <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: '1.7' }}>{blog.content}</p>
                                    <Link to={`/blogs/${blog._id}`} className="read-more" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                                        Keep Reading <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
