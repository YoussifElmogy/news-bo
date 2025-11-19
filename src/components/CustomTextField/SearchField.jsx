import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchField({
  placeholder = 'Search...',
  icon = null,
  value = '',
  onChange,
  ...props
}) {
  const inputRef = useRef(null);

  const handleClear = e => {
    e.preventDefault();
    e.stopPropagation();

    if (onChange) {
      onChange({ target: { value: '' } });
    }

    // Keep focus on the input field after clearing
    if (inputRef.current) {
      const input = inputRef.current.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <TextField
      ref={inputRef}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{ flexGrow: 1, minWidth: '16.5rem' }}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment
            position="start"
            sx={{
              color: '#1F2A37',
              width: '1rem',
              height: '1rem',
              mr: '0.56rem',
            }}
          >
            {icon}
          </InputAdornment>
        ) : null,
        endAdornment: value ? (
          <InputAdornment position="end" sx={{ margin: 0 }}>
            <IconButton
              onMouseDown={handleClear}
              size="small"
              sx={{
                color: '#6B7280',
                padding: '0.222rem',
                margin: 0,
                width: '1rem',
                height: '1rem',
                '&:hover': {
                  color: '#374151',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </InputAdornment>
        ) : null,
        sx: {
          bgcolor: '#fff',
          borderRadius: '0.444rem',
          fontWeight: 400,
          fontSize: '1rem',
          color: '#6B7280',
          paddingBlock: '0.778rem',
          paddingInline: '0.89rem',
          '& .MuiInputBase-input': {
            padding: 0,
            color: '#000000',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '& input::placeholder': {
            color: '#6B7280',
            opacity: 1,
            fontWeight: 400,
          },
        },
      }}
      {...props}
    />
  );
}
