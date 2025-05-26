import React, { useState } from 'react';
import { 
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage,
  LastPage
} from '@mui/icons-material';

// Import data from separate file
import { tableData, headerColumns, totalRecords, getStatusColor } from '../../data/data.js';

function Content() {
  const [data] = useState(tableData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]); // Thêm state để lưu các hàng được chọn

  // Xử lý chọn/bỏ chọn tất cả các hàng
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map(row => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Xử lý chọn/bỏ chọn một hàng
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Kiểm tra xem một hàng đã được chọn chưa
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Custom pagination actions
  function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const totalPages = Math.ceil(count / rowsPerPage);

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
          <FirstPage />
        </IconButton>
        <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
          <KeyboardArrowLeft />
        </IconButton>
        <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minWidth: '24px', 
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              color: 'white',
              mr: 1
            }}
          >
            {page + 1}
          </Typography>
          {[...Array(Math.min(4, totalPages - 1))].map((_, idx) => {
            const pageNum = page + idx + 1;
            if (pageNum < totalPages) {
              return (
                <Typography 
                  key={idx} 
                  variant="body2" 
                  sx={{ mx: 0.5, cursor: 'pointer' }}
                  onClick={(e) => onPageChange(e, pageNum)}
                >
                  {pageNum + 1}
                </Typography>
              );
            }
            return null;
          })}
        </Box>
        <IconButton onClick={(e) => onPageChange(e, page + 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={(e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
          <LastPage />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 0 }}>
      <Paper elevation={2} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eeeef0'}}>
                <TableCell 
                  padding="checkbox" 
                  sx={{ 
                    borderBottom: 'none',
                    pb: 1,
                    borderLeft: '1px solid #e0e0e0', 
                  }}
                >
                  <Checkbox 
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headerColumns.map((column, index) => (
                  <TableCell 
                    key={column.id} 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#C02135',
                      borderBottom: 'none',
                      padding: 0,
                      pl: 1,
                      borderLeft: '1px solid #e0e0e0'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ backgroundColor: '#eeeef0' }}>
                <TableCell sx={{ borderTop: 'none', pt: 0, borderRight: '1px solid #e0e0e0' }}></TableCell>
                {headerColumns.map((column, index) => (
                  <TableCell 
                    key={`filter-${column.id}`} 
                    sx={{ 
                      borderTop: 'none',
                      padding: 0,
                      borderLeft: '1px solid #e0e0e0', 
                    }}
                  >
                    {column.id !== 'actions' && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          placeholder="Nhập từ khóa"
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: '#9e9e9e' }} />
                              </InputAdornment>
                            ),
                            sx: {
                              backgroundColor: '#eeeef0',
                              borderRadius: 2,
                              '& fieldset': { border: 'none' }, // Xóa đường viền
                              fontSize: '0.85rem', // Nhỏ lại
                              paddingLeft: 0, // Loại bỏ padding bên trái để icon gần hơn
                              height: 36, // Chiều cao nhỏ lại
                            }
                          }}
                        />
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Typography color="primary" sx={{ cursor: 'pointer' }}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.credit}</TableCell>
                  <TableCell>{row.dept}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: getStatusColor(row.status) }}>
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.hasExam}</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: 2, 
          borderTop: '1px solid #e0e0e0' 
        }}>
          <Typography variant="body2">
            Tổng số bản ghi: {totalRecords}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TablePaginationActions
              count={totalRecords}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
            />
            <FormControl variant="outlined" size="small" sx={{ ml: 2, minWidth: 80 }}>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Dòng trên trang
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Content;