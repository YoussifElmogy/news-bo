import React from 'react';
import Button from '@mui/material/Button';

export default function CustomButton({
  variant = 'primary',
  icon,
  iconPosition = 'start',
  children,
  sx = {},
  ...props
}) {
  const isPrimary = variant === 'primary';
  const isDelete = variant === 'delete';
  const sharedStyles = {
    borderRadius: '0.444rem',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 400,
    paddingBlock: '0.556rem !important',
    paddingInline: '1.556rem',

    '&:focus': {
      outline: 'none',
    },
  };
  const baseSx = isDelete
    ? {
        bgcolor: '#940000',
        color: '#fff',
        borderColor: '#940000',
        ...sharedStyles,
        '&:hover': { bgcolor: '#7a0000', borderColor: '#940000' },
      }
    : isPrimary
      ? {
          bgcolor: '#1A56DB',
          color: '#fff',
          ...sharedStyles,
          '&:hover': { bgcolor: '#1d4ed8' },
        }
      : {
          borderColor: '#1A56DB',
          color: '#1A56DB',
          ...sharedStyles,
          '&:hover': { bgcolor: '#e0e7ff' },
        };
  return (
    <Button
      variant={isPrimary || isDelete ? 'contained' : 'outlined'}
      sx={{ ...baseSx, ...sx }}
      {...props}
    >
      {icon && iconPosition === 'start' && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: '0.5rem',
            width: '1.111rem',
            height: '1.111rem',
          }}
        >
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'end' && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: '0.5rem',
            width: '1.111rem',
            height: '1.111rem',
          }}
        >
          {icon}
        </span>
      )}
    </Button>
  );
}
