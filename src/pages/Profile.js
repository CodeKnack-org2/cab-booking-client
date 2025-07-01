import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Visibility,
  VisibilityOff,
  Edit,
  Save,
  Cancel,
  Security,
  Notifications,
  Payment,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
  currentPassword: yup.string().when('newPassword', {
    is: (val) => val && val.length > 0,
    then: yup.string().required('Current password is required to change password'),
  }),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().when('newPassword', {
    is: (val) => val && val.length > 0,
    then: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Please confirm your new password'),
  }),
});

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const watchNewPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const updateData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      if (data.newPassword) {
        updateData.currentPassword = data.currentPassword;
        updateData.newPassword = data.newPassword;
      }

      const result = await updateProfile(updateData);
      if (result.success) {
        setEditing(false);
        reset(data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    reset();
    setError('');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Settings
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your account information and preferences.
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  Personal Information
                </Typography>
                {!editing && (
                  <Button
                    startIcon={<Edit />}
                    onClick={() => setEditing(true)}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {editing && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }}>
                          <Chip label="Change Password (Optional)" />
                        </Divider>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Current Password"
                          type={showPassword ? 'text' : 'password'}
                          {...register('currentPassword')}
                          error={!!errors.currentPassword}
                          helperText={errors.currentPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Security color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="New Password"
                          type={showNewPassword ? 'text' : 'password'}
                          {...register('newPassword')}
                          error={!!errors.newPassword}
                          helperText={errors.newPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Security color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleToggleNewPasswordVisibility}
                                  edge="end"
                                >
                                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...register('confirmPassword')}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Security color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleToggleConfirmPasswordVisibility}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {editing && (
                    <Grid item xs={12}>
                      <Box display="flex" gap={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<Save />}
                          disabled={loading || !isDirty}
                        >
                          {loading ? <CircularProgress size={20} /> : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleCancel}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mb: 2,
                  }}
                >
                  {user?.name?.charAt(0) || <Person />}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {user?.name}
                </Typography>
                <Chip
                  label={user?.role?.toUpperCase()}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Account Information
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Member since
                  </Typography>
                  <Typography variant="body1">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Account Status
                  </Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email Verified
                  </Typography>
                  <Chip label="Verified" color="success" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<Notifications />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Notification Settings
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Payment />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Payment Methods
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Privacy Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 