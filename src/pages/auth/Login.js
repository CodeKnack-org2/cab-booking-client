import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Sign In
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back! Please sign in to your account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 