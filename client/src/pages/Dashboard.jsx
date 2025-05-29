import React from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <Sidebar />
                <main>
                    <h1>Dashboard</h1>
                    <p>Welcome to your dashboard!</p>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;