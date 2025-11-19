import React from 'react';
import Button from '@mui/material/Button';

export default function ResetButton({
  variant,
  children,
  type,
  sx = {},
  ...props
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        ...sx,
        color: type === 'deleteBtn' ? '#940000' : '#1F2A37',
        textTransform: 'none',
        fontWeight: 400,
        fontSize: '1rem',
        border: variant === 'primary' ? '1px solid #940000' : 'none',
        borderRadius: '8px',

        '&:focus': {
          outline: 'none',
        },
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
