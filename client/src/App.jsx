import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SuperAdminDashboard from './pages/Dashboard/SuperAdmin';
import EmployeeDashboard from './pages/Dashboard/Employee';
import UserDashboard from './pages/Dashboard/User';
import HotelDetails from './pages/HotelDetails';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/hotels/:id" element={<HotelDetails />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <DashboardRedirect />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin" element={
                            <ProtectedRoute roles={['Super Admin']}>
                                <SuperAdminDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/employee" element={
                            <ProtectedRoute roles={['Manager', 'Receptionist', 'Waiter', 'Cook']}>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/user-dashboard" element={
                            <ProtectedRoute roles={['Customer']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

const DashboardRedirect = () => {
    const { user } = useAuth();
    if (user.role === 'Super Admin') return <Navigate to="/admin" />;
    if (['Manager', 'Receptionist', 'Waiter', 'Cook'].includes(user.role)) return <Navigate to="/employee" />;
    return <Navigate to="/user-dashboard" />;
};

export default App;
