import React from 'react';
import Header from './components/header/Header';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import { useTheme, useMediaQuery } from '@mui/material';


const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isTablet = useMediaQuery(theme.breakpoints.between(801, 1200));
  const isDesktop = useMediaQuery(theme.breakpoints.up(1201));
  const [isSidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const handleToggleSidebar = () => {
    // Nếu là mobile, luôn đóng lại sau toggle
    if (isMobile) {
      setSidebarOpen(prev => !prev);
    } else {
      setSidebarOpen(prev => !prev);
    }
  };

  React.useEffect(() => {
    // Đóng sidebar khi chuyển sang màn hình mobile hoặc tablet
    if (isMobile || isTablet ) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile, isTablet]);

  const shouldShowMiniSidebar = (isTablet || isDesktop) && !isSidebarOpen;
  return (
    <>
        <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
          <Header onToggleSidebar={handleToggleSidebar} isMobile={isMobile} /> 
          <Routes>
            <Route path="/" element={
              <Home 
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleToggleSidebar={handleToggleSidebar}
                shouldShowMiniSidebar={shouldShowMiniSidebar}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            } />
            {/* Add more routes here as needed */}
          </Routes>
      </div>
    </>
  );
};

export default App;