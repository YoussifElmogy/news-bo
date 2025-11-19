import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/form/login/LoginForm';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NextFaceLogo from '../assets/next-face-bo.png';


const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated === true) {
    return <Navigate to="/" replace />;
  }

  return (
    <Grid container sx={{ minHeight: '100vh', bgcolor: '#F5F6F7', width: '100vw' }}>
      <Grid
        item
        size={{ xs: 12 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width:{xs:'100%', md:'50%'},
          margin:'auto'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            boxShadow: 'none',
            p: '1.778rem',
            borderRadius: 3,
            width: { xs: '100%' },
            margin: '1.33rem',
          }}
        >
          <Box display="flex" alignItems="center" mb="2.111rem">
            <img
                src={NextFaceLogo}
              alt="Next Face"
              style={{ width: '10.5rem', marginRight: '0.444rem' }}
            />
       
          </Box>
          <Typography fontSize="1.778rem" mb="1.333rem">
            Log In
          </Typography>
          <LoginForm />
        </Paper>
      </Grid>

    </Grid>
  );
};

export default Login;
