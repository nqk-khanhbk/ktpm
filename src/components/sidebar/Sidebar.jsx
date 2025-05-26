import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { menuItems } from '../../data/data.js';

const Sidebar = ({ isMobile = false, open = true, isTablet, onClose, onToggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('Học phần');

  const handleItemClick = (itemText) => {
    setActiveItem(itemText);
    if (isMobile && onClose) onClose();
  };

  const sidebarStyles = {
    width: 250,
    height: '100vh',
    position: (isMobile || isTablet) ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    pt: (isMobile || isTablet) ? 0 : '20px',
    pl: (isMobile || isTablet) ? 0 : '20px',
    zIndex: (isMobile || isTablet) ? 1300 : 'auto',
    transform: (isMobile || isTablet) ? (open ? 'translateX(0)' : 'translateX(-100%)') : 'none',
    transition: (isMobile || isTablet) ? 'transform 0.3s ease-in-out' : 'none',
    // overflow: 'hidden', 
    height: (isMobile || isTablet) ? '100vh' : 'fit-content', 
  };

  const sidebarContentStyles = {
    backgroundColor: '#fff',
    borderRadius: (isMobile || isTablet) ? 0 : 2,
    height: '100%',
    width: 230,
    boxShadow: 3,
  };

  const mobileHeaderStyles = {
    backgroundColor: '#c62828',
    // mx: -2,
    // mt: -4,
    pt: isMobile ? 1 : 2,
    pl: 2,
    pr: 2,
    pb: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2
  };

  const listItemStyles = (itemText) => ({
    borderRadius: 2,
    mb: 0.5,
    bgcolor: activeItem === itemText ? '#c62828' : 'transparent',
    color: activeItem === itemText ? '#fff' : 'text.primary',
    '&:hover': {
      bgcolor: activeItem === itemText ? '#b71c1c' : 'grey.100',
    },
  });

  const listItemIconStyles = (itemText) => ({
    color: activeItem === itemText ? '#fff' : '#c62828',
    minWidth: 36,
  });

  return (
    <>
      {(isMobile || isTablet) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1200,
          }}
          onClick={onClose}
        />
      )}
      
      <Box sx={sidebarStyles}>
        <Box 
          sx={sidebarContentStyles}
          onClick={(e) => e.stopPropagation()}
        >
          {(isMobile || isTablet) && (
            <Box sx={mobileHeaderStyles}>
              <IconButton color="inherit" onClick={onToggleSidebar} sx={{ color: 'white' }}>
                <MenuIcon />
              </IconButton>
              <img src="/logo_hust.webp" alt="Logo" style={{ height: 40 }} />
            </Box>
          )}

          {menuItems.map((section, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              {section.group && (
                <Typography variant="body2" color="textSecondary" sx={{ px: 1, mb: 1 }}>
                  {section.group}
                </Typography>
              )}
              <List disablePadding>
                {section.items.map((item) => (
                  <ListItem
                    key={item.text}
                    button
                    onClick={() => handleItemClick(item.text)}
                    sx={listItemStyles(item.text)}
                  >
                    <ListItemIcon sx={listItemIconStyles(item.text)}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;