import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hotel, User as UserIcon, LogOut, Menu } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <Hotel size={32} />
                    <span>The Taj Hotel</span>
                </Link>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/contact">Contact</Link>

                    {user ? (
                        <div className="user-nav">
                            <Link to="/dashboard" className="dashboard-link">
                                <UserIcon size={20} />
                                <span>Dashboard</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
