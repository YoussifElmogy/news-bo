import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function CustomPagination({ page = 1, count = 3, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #D1D5DB',
        borderRadius: '0.444rem',
        overflowX: isMobile ? 'auto' : 'hidden',
        bgcolor: '#fff',
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={(e, value) => onChange(value)}
        variant="outlined"
        shape="rounded"
        siblingCount={isMobile ? 1 : count > 4 ? 1 : 0}
        boundaryCount={isMobile ? 0 : 1}
        showFirstButton={false}
        showLastButton={false}
        renderItem={item => (
          <PaginationItem
            {...item}
            components={{
              previous: () => (
                <span style={{ padding: isMobile ? '0 0.5rem' : '0 1rem' }}>
                  Previous
                </span>
              ),
              next: () => (
                <span style={{ padding: isMobile ? '0 0.5rem' : '0 1rem' }}>
                  Next
                </span>
              ),
            }}
          />
        )}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: 0,
            minWidth: isMobile ? '2rem' : '2.67rem',
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#6B7280',
            fontWeight: 400,
            border: 'none',
            bgcolor: '#fff',
            margin: 0,
            borderRight: '1px solid #D1D5DB',
            transition: 'background 0.2s',
            '&.Mui-selected': {
              color: '#1A56DB',
              bgcolor: '#E1EFFE',
            },
            '&:hover': {
              bgcolor: '#F3F6F9',
            },
            '&.Mui-disabled': {
              color: '#9CA3AF',
              bgcolor: '#fff',
            },
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: '#6B7280',
            fontSize: isMobile ? '1rem' : '1.1rem',
            px: isMobile ? '0.5rem' : '1rem',
            height: '32px',
          },
        }}
      />
    </Box>
  );
}
