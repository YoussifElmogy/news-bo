import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onMenuClick }) {
  const isMobile = useMediaQuery('(max-width:1023px)');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Logout',
      onClick: logout,
      sx: { color: '#940000' },
    },
  ];

  const trigger = (
    <Box sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box mr="0.556rem">
          <Typography
            sx={{
              fontWeight: 400,
              color: '#595959',
              fontSize: '1rem',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.fullName}
          </Typography>
          <Typography
            sx={{ fontSize: '1rem', color: '#8F8F8F', mt: '-0.11rem' }}
          >
            {user?.role}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon sx={{ fontSize: '1.56rem', color: '#222' }} />
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        height: '4.556rem !important',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: 'none',
        pl: '1.778rem',
        pr: '3.778rem',
        py: '0.889rem',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: '100%',
          minHeight: 'auto !important',
          p: '0rem !important',
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: '0.11rem', color: '#222' }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />
        <DropdownMenu menuItems={menuItems}>{trigger}</DropdownMenu>
      </Toolbar>
    </AppBar>
  );
}
