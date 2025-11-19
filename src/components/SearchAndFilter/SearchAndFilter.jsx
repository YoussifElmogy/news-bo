// src/components/SearchAndFilter/SearchAndFilter.jsx
import React from 'react';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchField from '../CustomTextField/SearchField';
import CustomButton from '../Button/Button';
import ResetButton from '../Button/ResetButton';

export default function SearchAndFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statusOptions,
  onReset,
  onApply,
  maxLength,
  searchPlaceholder = 'Search with name',
}) {
  

  return (
    <Stack
      direction="row"
      padding="1.33rem"
      gap="0.556rem"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" alignItems="center" gap="0.556rem" flexWrap="wrap">
        <SearchField
          placeholder={searchPlaceholder}
          icon={<SearchIcon sx={{ color: '#6B7280', fontSize: '1.333rem' }} />}
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onApply();
            }
          }}
          inputProps={{ maxLength: maxLength }}
        />
        
        {/* Category Filter */}
        {statusOptions && statusOptions.length > 0 && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel
              sx={{
                color: '#6B7280',
                '&.Mui-focused': { color: '#3788F4' },
              }}
            >
              Category
            </InputLabel>
            <Select
              value={status || ''}
              label="Category"
              onChange={(e) => onStatusChange(e.target.value)}
              sx={{
                height: '2.667rem',
                bgcolor: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3788F4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3788F4',
                },
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" gap="0.889rem" flexWrap="wrap">
        <ResetButton onClick={onReset} sx={{ minWidth: '7.944rem' }}>
          {' '}
          Reset
        </ResetButton>
        <CustomButton
          variant="secondary"
          onClick={onApply}
          sx={{ minWidth: '7.944rem' }}
        >
          Apply
        </CustomButton>
       
      </Stack>
    </Stack>
  );
}
