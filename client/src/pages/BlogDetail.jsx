import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Instagram } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();

    return (
        <div className="blog-detail-page">
            <div className="container" style={{ paddingTop: '5rem' }}>
                <Link to="/blogs" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '700', marginBottom: '3rem' }}>
                    <ArrowLeft size={18} /> Back to Insights
                </Link>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>EXPERIENCE</span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginTop: '1rem', marginBottom: '2rem', lineHeight: '1.1' }}>Inside the Kitchens of Grand Horizon</h1>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '3rem', borderBottom: '1px solid #e2e8f0', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>A</div>
                            <div>
                                <h5 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Admin Content Team</h5>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Published on May 12, 2024</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ color: '#64748b', fontWeight: '600' }}><Share2 size={20} /></span>
                            <Facebook size={20} color="#94a3b8" />
                            <Twitter size={20} color="#94a3b8" />
                            <Instagram size={20} color="#94a3b8" />
                        </div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1550966841-391ad29a0764?auto=format&fit=crop&w=1200&q=80"
                        alt="Blog Featured"
                        style={{ width: '100%', borderRadius: '32px', marginBottom: '4rem', boxShadow: 'var(--shadow-lg)' }}
                    />

                    <div className="blog-body" style={{ fontSize: '1.25rem', lineHeight: '1.9', color: '#334155' }}>
                        <p style={{ marginBottom: '2.5rem' }}>
                            At Grand Horizon, we believe that dining is not just about sustenance; it’s about a journey through flavors, traditions, and the art of hospitality. Our culinary team, led by world-renowned chefs, works tirelessly to source the freshest local ingredients to create masterpieces on every plate.
                        </p>
                        <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--dark)' }}>The Farm to Horizon Initiative</h3>
                        <p style={{ marginBottom: '2.5rem' }}>
                            Sustainability is at the core of our kitchens. Through our "Farm to Horizon" program, we partner with local organic farmers to bring the best produce directly to your table within hours of harvest. This not only supports our community but ensures that every bite you take is packed with natural flavor and nutrition.
                        </p>
                        <blockquote style={{ borderLeft: '6px solid var(--secondary)', background: '#f8fafc', padding: '3rem', margin: '4rem 0', borderRadius: '0 24px 24px 0', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: '500' }}>
                            "Food is the common language of humanity. In our kitchens, we speak that language through spices, textures, and a relentless pursuit of perfection."
                        </blockquote>
                        <p style={{ marginBottom: '2.5rem' }}>
                            Whether you are enjoying a casual breakfast buffet or a formal seven-course dinner, you’ll notice the signature Grand Horizon touch—an unwavering commitment to quality that has made us a destination for food lovers worldwide.
                        </p>
                    </div>
                </div>
            </div>

            <section className="section bg-light" style={{ marginTop: '5rem', background: '#f8fafc' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '2rem' }}>Enjoyed this story?</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '3rem' }}>Subscribe to our newsletter to receive the latest updates, recipes, and luxury travel tips directly in your inbox.</p>
                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '50px', border: '2px solid #e2e8f0', outline: 'none' }} />
                        <button className="btn-primary" style={{ width: 'auto' }}>Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
