import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getGreeting = () => {
            const hour = new Date().getHours();
            const minutes = new Date().getMinutes();
            const totalMinutes = hour * 60 + minutes;

            if (totalMinutes >= 3 * 60 && totalMinutes <= 11 * 60 + 50) return 'Good Morning';
            if (totalMinutes >= 11 * 60 + 51 && totalMinutes <= 16 * 60) return 'Good Afternoon';
            if (totalMinutes >= 16 * 60 + 1 && totalMinutes <= 19 * 60) return 'Good Evening';
            return 'Good Night';
        };
        setGreeting(getGreeting());
    }, []);

    return (
        <div className="dashboard container section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="employee-card" style={{ background: 'none', color: 'var(--dark)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow)', maxWidth: '600px', width: '100%' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    {greeting}, {user.name} {'{'}{user.role}{'}'}
                </h1>
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '1.2rem' }}>
                    Have a productive shift today!
                </p>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
