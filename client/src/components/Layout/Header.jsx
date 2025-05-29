import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Avatar,
  Menu, MenuItem
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
const Header = ({ onToggleSidebar, isMobile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  return (
    <AppBar position="static" sx={{ backgroundColor: '#c62828', px: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Sidebar Toggle + Logo */}
        <Box display="flex" alignItems="center" gap={2}>
            <IconButton color="inherit" onClick={onToggleSidebar}>
              <MenuIcon />
            </IconButton>


          <img src="/logo_hust.webp" alt="Logo" style={{ height: 40 }} />
          {!isMobile && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ lineHeight: 1, mb: -0.7 }}>
                BK-ELEARNING MANAGEMENT SYSTEM
              </Typography>
              <Typography variant="caption" color="white" sx={{ lineHeight: 1, mt: -0.7 }}>
                HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </Typography>
            </Box>
          )}
        </Box>

        {/* Icons + User */}
        <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2} mt={isMobile ? 1 : 0}>
          <IconButton color="inherit">
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>

          <Box display="flex" alignItems="center" gap={1} onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}>
            <Avatar sx={{ width: 30, height: 30, bgcolor: '#ddd' }} />
            {!isMobile && (
              <>
                <Typography variant="body2" color="white">Người dùng 1</Typography>
                <ExpandMoreIcon sx={{ color: 'white', fontSize: 20 }} />
              </>
            )}
          </Box>

          {/* Dropdown menu */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Thông tin tài khoản</MenuItem>
            <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
