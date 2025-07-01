import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  DirectionsCar,
  LocationOn,
  AccessTime,
  Payment,
  Star,
  Add,
  History,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { bookingAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  const fetchRecentBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setRecentBookings(response.data.slice(0, 5)); // Get last 5 bookings
    } catch (err) {
      setError('Failed to load recent bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ready for your next ride? Book a cab and get going.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/book-ride')}
                  fullWidth
                >
                  Book New Ride
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<History />}
                  onClick={() => navigate('/ride-history')}
                  fullWidth
                >
                  View All Rides
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Payment />}
                  onClick={() => navigate('/payments')}
                  fullWidth
                >
                  Payment History
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* User Stats */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Stats
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {recentBookings.filter(b => b.status === 'completed').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed Rides
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      {recentBookings.filter(b => b.status === 'in_progress').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Rides
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      4.8
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info.main">
                      ${recentBookings.reduce((total, booking) => total + (booking.fare || 0), 0).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Recent Bookings
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate('/ride-history')}
                  endIcon={<History />}
                >
                  View All
                </Button>
              </Box>
              
              {recentBookings.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <DirectionsCar sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No bookings yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Start your journey by booking your first ride!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/book-ride')}
                    startIcon={<Add />}
                  >
                    Book Your First Ride
                  </Button>
                </Box>
              ) : (
                <List>
                  {recentBookings.map((booking, index) => (
                    <React.Fragment key={booking.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <DirectionsCar />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1">
                                {booking.pickupLocation} → {booking.destination}
                              </Typography>
                              <Chip
                                label={booking.status.replace('_', ' ')}
                                color={getStatusColor(booking.status)}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <LocationOn sx={{ fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {booking.pickupLocation}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <AccessTime sx={{ fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {formatDate(booking.createdAt)}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Payment sx={{ fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                  ${booking.fare?.toFixed(2) || '0.00'}
                                </Typography>
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < recentBookings.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 