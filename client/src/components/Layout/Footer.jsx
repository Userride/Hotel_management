import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>The Taj Hotel</h3>
                        <p>Experience the epitome of luxury and Indian hospitality. Our world-class service ensures your stay is nothing short of legendary.</p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Facebook size={18} /></a>
                            <a href="#" className="social-icon"><Twitter size={18} /></a>
                            <a href="#" className="social-icon"><Instagram size={18} /></a>
                            <a href="#" className="social-icon"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/blogs">Blogs</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Luxury Rooms</Link></li>
                            <li><Link to="/services">Fine Dining</Link></li>
                            <li><Link to="/services">Spa & Wellness</Link></li>
                            <li><Link to="/services">Event Spaces</Link></li>
                            <li><Link to="/services">Concierge</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <ul className="footer-links">
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} color="var(--secondary)" />
                                    <span>Marine Drive, Mumbai, India</span>
                                </div>
                            </li>
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Phone size={16} color="var(--secondary)" />
                                    <span>+91 22 6665 3366</span>
                                </div>
                            </li>
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Mail size={16} color="var(--secondary)" />
                                    <span>stay@thetajhotel.com</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} The Taj Hotel & Resorts. Designed for excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
