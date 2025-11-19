// src/components/CustomPaginatedTable/CustomPaginatedTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from '@mui/material';
import CustomTableSkeleton from '../skeletons/CustomTableSkeleton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const cellStyle = {
  borderBottom: 0,
  py: '1.333rem',
  px: '1.33rem',
  position: 'relative',
  fontSize: '1rem',
  '&:not(:first-of-type):not(:last-of-type)::before': {
    content: '""',
    position: 'absolute',
    left: '0.556rem',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '1.333rem', // Adjust height as needed
    borderLeft: '1px solid #D1D5DB',
  },
};

// Style for title columns (first column) to limit width
const titleCellStyle = {
  ...cellStyle,
  maxWidth: '20rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export default function CustomPaginatedTable({
  columns,
  data,
  onToggle,
  loading,
}) {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#EBF3FE' }}>
              {columns.map((col, index) => (
                <TableCell
                  key={col.key}
                  sx={{
                    ...(index === 0 ? titleCellStyle : cellStyle),
                    fontWeight: '700',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <CustomTableSkeleton 
              columnsCount={columns.length}
              />
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ py: '8.333rem' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ color: '#595959', fontSize: '1.333rem' }}>
                      Sorry, no matches found for your specified criteria
                    </span>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={idx % 2 === 1 ? { bgcolor: '#FAFAFA' } : {}}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={col.key}
                      sx={colIndex === 0 ? titleCellStyle : cellStyle}
                    >
                      {col.render ? (
                        col.render(row)
                      ) : col.key === 'isIndexed' ? (
                        <Toggle
                          checked={row.isIndexed}
                          onChange={() => onToggle?.(idx)}
                        />
                      ) : (
                        row[col.key]
                      )}
                    </TableCell>
                  ))}
           
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
