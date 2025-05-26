// src/components/toolbar/ToolbarSection.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ToolbarSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2, // Bo cong
        backgroundColor: '#fff', // Nền trắng, bạn có thể thay thành màu xám sau
        boxShadow: 1, // Bóng nhẹ
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: '#c02135', fontWeight: 600 }}>
        Quản lý học phần
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: '999px', // Bo tròn nút
          textTransform: 'none', // Giữ nguyên kiểu chữ
          backgroundColor: '#1976d2', // Màu xanh mặc định của MUI
          '&:hover': {
            backgroundColor: '#1565c0', // Màu khi hover
          },
        }}
      >
        Thêm học phần mới
      </Button>
    </Box>
  );
};

export default ToolbarSection;