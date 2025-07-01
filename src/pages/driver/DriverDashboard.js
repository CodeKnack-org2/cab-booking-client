import React, { useState, useEffect } from 'react';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  DirectionsCar,
  LocationOn,
  AccessTime,
  Payment,
  Star,
  PlayArrow,
  Stop,
  CheckCircle,
  Cancel,
  TrendingUp,
  Person,
  Speed,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import {acceptBooking, startTrip, completeTrip, cancelBooking, toggleAvailability, getCurrentTrip, getDriverEarnings, getDriverBookings} from '../../services/api';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [earnings, setEarnings] = useState({});
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
    try {
      const [bookingsRes, currentTripRes, earningsRes] = await Promise.all([
        getDriverBookings(),
        getCurrentTrip(user.id),
        getDriverEarnings(user.id),
      ]);

      setBookings(bookingsRes.data);
      setCurrentTrip(currentTripRes.data);
      setEarnings(earningsRes.data);
    } catch (err) {
      setError('Failed to load driver data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      await toggleAvailability(user.id, !isAvailable);
      setIsAvailable(!isAvailable);
      toast.success(`You are now ${!isAvailable ? 'available' : 'unavailable'} for rides`);
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      await acceptBooking(bookingId);
      toast.success('Booking accepted successfully!');
      fetchDriverData();
    } catch (error) {
      toast.error('Failed to accept booking');
    }
  };

  const handleStartTrip = async (bookingId) => {
    try {
      await startTrip(bookingId);
      toast.success('Trip started!');
      fetchDriverData();
    } catch (error) {
      toast.error('Failed to start trip');
    }
  };

  const handleCompleteTrip = async (bookingId) => {
    try {
      await completeTrip(bookingId);
      toast.success('Trip completed successfully!');
      fetchDriverData();
    } catch (error) {
      toast.error('Failed to complete trip');
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
      case 'pending':
        return 'info';
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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Driver Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.name}! Manage your rides and earnings.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Availability Toggle */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Driver Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isAvailable ? 'You are currently available for rides' : 'You are currently offline'}
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAvailable}
                      onChange={handleToggleAvailability}
                      color="primary"
                    />
                  }
                  label={isAvailable ? 'Available' : 'Offline'}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {bookings.filter(b => b.status === 'completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Rides
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {bookings.filter(b => b.status === 'in_progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Rides
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                ${earnings.totalEarnings?.toFixed(2) || '0.00'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Earnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {earnings.rating || '4.8'}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Rating
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Trip */}
        {currentTrip && (
          <Grid item xs={12}>
            <Card sx={{ border: 2, borderColor: 'warning.main' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="warning.main">
                  🚗 Current Trip
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <LocationOn color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Pickup: {currentTrip.pickupLocation}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <LocationOn color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Destination: {currentTrip.destination}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Person color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Passenger: {currentTrip.user?.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => handleCompleteTrip(currentTrip.id)}
                        fullWidth
                      >
                        Complete Trip
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Bookings
              </Typography>
              
              {bookings.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <DirectionsCar sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No bookings yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Make sure you're available to receive booking requests.
                  </Typography>
                </Box>
              ) : (
                <List>
                  {bookings.slice(0, 5).map((booking, index) => (
                    <React.Fragment key={booking.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Person />
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
                                <Person sx={{ fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {booking.user?.name || 'Passenger'}
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
                        <Box display="flex" flexDirection="column" gap={1}>
                          {booking.status === 'pending' && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<CheckCircle />}
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              Accept
                            </Button>
                          )}
                          {booking.status === 'accepted' && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<PlayArrow />}
                              onClick={() => handleStartTrip(booking.id)}
                            >
                              Start Trip
                            </Button>
                          )}
                        </Box>
                      </ListItem>
                      {index < Math.min(bookings.length, 5) - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Earnings Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Earnings Summary
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Today's Earnings</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${earnings.todayEarnings?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">This Week</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${earnings.weeklyEarnings?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">This Month</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${earnings.monthlyEarnings?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total Earnings</Typography>
                  <Typography variant="h6" color="primary">
                    ${earnings.totalEarnings?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Average Rating</Typography>
                  <Box display="flex" alignItems="center">
                    <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                    <Typography variant="body1" fontWeight="bold">
                      {earnings.rating || '4.8'}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Total Rides</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {bookings.filter(b => b.status === 'completed').length}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Acceptance Rate</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    95%
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Online Hours</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {earnings.onlineHours || '8.5'} hrs
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DriverDashboard; 