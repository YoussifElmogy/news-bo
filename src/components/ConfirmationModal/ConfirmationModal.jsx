import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CustomButton from '../Button/Button';
import ResetButton from '../Button/ResetButton';

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          padding: '0.5rem',
        },
      }}
    >
      <DialogTitle sx={{ pb: '0.5rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <WarningAmberIcon sx={{ color: '#F59E0B', fontSize: '1.75rem' }} />
            <Typography sx={{ fontSize: '1.25rem', fontWeight: '600', color: '#111928' }}>
              {title}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            disabled={isLoading}
            sx={{
              color: '#6B7280',
              '&:hover': { bgcolor: '#F3F4F6' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: '1rem', pb: '1.5rem' }}>
        <Typography sx={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.6 }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: '1.5rem', pb: '1rem', gap: '0.75rem' }}>
        <ResetButton
          onClick={onClose}
          disabled={isLoading}
          sx={{ minWidth: '7rem' }}
        >
          {cancelText}
        </ResetButton>
        <CustomButton
          variant="primary"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            minWidth: '7rem',
            bgcolor: '#EF4444',
            '&:hover': {
              bgcolor: '#DC2626',
            },
          }}
        >
          {isLoading ? 'Deleting...' : confirmText}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}

