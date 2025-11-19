import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function CustomSkeleton({
  width = '14.111rem',
  height = '2.5rem',
  borderRadius = '2rem',
  sx = {},
}) {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={{ borderRadius, display: 'block', mx: 'auto', ...sx }}
    />
  );
}
