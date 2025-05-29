import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MainLayout from './components/Layout/MainLayout';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Trang login và register không có layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    
                    {/* Các trang khác có layout đầy đủ */}
                    <Route path="/dashboard" element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    } />
                    <Route path="/profile" element={
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;