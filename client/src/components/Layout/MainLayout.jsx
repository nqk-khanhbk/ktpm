import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="app">
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;