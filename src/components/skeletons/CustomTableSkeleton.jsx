import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function CustomTableSkeleton({ columnsCount }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <TableRow key={`skeleton-${idx}`}>
          <TableCell
            sx={{ border: 'none' }}
            colSpan={columnsCount}
            align="center"
          >
            <Skeleton
              variant="rectangular"
              height={32}
              sx={{
                width: '100%',
                borderRadius: '0.889rem',
                minHeight: '2.5rem',
                maxWidth: '100%',
                bgcolor: 'rgba(0,0,0,0.12)',
                mb: idx !== 5 ? 1.5 : 0, // margin between skeletons except last
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
