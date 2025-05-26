import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { menuItems } from '../../data/data.js';


const MiniSidebar = () => {
    const [activeItem, setActiveItem] = useState('Học phần');
    return (
        <Box
        sx={{
            width: 80,
            position: 'relative',
            backgroundColor: '#fff',
            boxShadow: 3,
            mt : '20px',
            ml: '20px',
            borderRadius: 2,
            display: 'inline-flex',  // Co lại theo nội dung
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden', // Quan trọng: ẩn phần tràn
            height: 'fit-content', // Quan trọng: co lại theo nội dung
        }}
        >
            {/* Danh sách menu items */}
            <List disablePadding>
                {menuItems.flatMap(section => section.items).map((item) => (
                // <Tooltip key={item.text} title={item.text} placement="right" arrow>
                // </Tooltip>
                <ListItem
                    button
                    onClick={() => setActiveItem(item.text)}
                    sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: '8px 4px',
                    mb: 0.5,
                    borderRadius: 1,
                    bgcolor: activeItem === item.text ? '#c62828' : 'transparent',
                    '&:hover': {
                        bgcolor: activeItem === item.text ? '#b71c1c' : 'rgba(0, 0, 0, 0.04)',
                    },
                    }}    
                >
                    <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        color: activeItem === item.text ? '#fff' : '#c62828',
                    }}> 
                        {React.cloneElement(item.icon, { fontSize: 'small' })}
                    </ListItemIcon>
                    <Typography 
                        variant="caption" 
                        sx={{
                        fontSize: 10,
                        color: activeItem === item.text ? '#fff' : 'text.secondary',
                        textAlign: 'center',
                        lineHeight: 1.2,
                        mt: 0.5,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%'
                        }}
                    >
                        {item.text}
                    </Typography>
                </ListItem>
                ))}
            </List>
        </Box>

    );

}

export default MiniSidebar;