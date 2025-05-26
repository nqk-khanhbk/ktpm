import React from 'react'; 
import Sidebar from '../components/sidebar/Sidebar';
import MiniSidebar from '../components/sidebar/MiniSidebar';
import ToolbarSection from '../components/toolbar/ToolbarSection';
import Content from '../components/content/Content';

function Home({ 
  isSidebarOpen, 
  setSidebarOpen, 
  handleToggleSidebar, 
  shouldShowMiniSidebar, 
  isMobile, 
  isTablet 
}) {
  return (
      <div className="d-flex">
        {isSidebarOpen && <Sidebar isMobile={isMobile} open={isSidebarOpen} isTablet={isTablet} onClose={() => setSidebarOpen(false)} onToggleSidebar={handleToggleSidebar} />}
        {shouldShowMiniSidebar && <MiniSidebar/>}
        <div className="content-wrapper" style={{ flex: 1, padding: '20px 20px 0px 15px' }}>
          <ToolbarSection />
          <Content />
        </div>
      </div>
  );
}

export default Home;
