import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from './loginschema';
import CustomTextField from '../../CustomTextField/CustomTextField';
import Button from '../../Button/Button';
import { useAuth } from '../../../context/AuthContext';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CustomLoader from '../../skeletons/CustomLoader';

const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {

    try {
      setLoading(true);
      setFormError(null);

      // Send the captcha token with your payload
      await login({ ...data});

    } catch (err) {
      const errorMessage = err?.detail || 'Invalid email or password';
      setFormError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomLoader show={loading} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomTextField
          label="Username"
          placeholder="username"
          type="text"
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register('username')}
          sx={{ mb: '1.333rem' }}
        />

        <CustomTextField
          label="Password"
          placeholder="Password"
          isPassword
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
          sx={{ mb: '1.333rem' }}
        />


        {formError && (
          <Typography
            color="error"
            sx={{ mb: '1.333rem', textAlign: 'left', fontSize: '1rem' }}
          >
            {formError}
          </Typography>
        )}


        <Button type="submit" fullWidth>
          Log In
          {loading && (
            <CircularProgress
              size={16}
              sx={{
                color: 'inherit',
                ml: '0.5rem',
                '& .MuiCircularProgress-circle': { strokeWidth: 2 },
              }}
            />
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
