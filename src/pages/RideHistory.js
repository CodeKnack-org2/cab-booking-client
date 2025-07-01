import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  DirectionsCar,
  LocationOn,
  AccessTime,
  Payment,
  Star,
  FilterList,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api  from '../services/api';

const RideHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.getUserBookings();
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load ride history');
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

  const filteredBookings = bookings.filter(booking => {
    if (statusFilter === 'all') return true;
    return booking.status === statusFilter;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ride History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all your past and current rides.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
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
        <Grid item xs={6} sm={3}>
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
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {bookings.filter(b => b.status === 'cancelled').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cancelled Rides
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                ${bookings.reduce((total, booking) => total + (booking.fare || 0), 0).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <FilterList color="action" />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              label="Filter by Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Rides</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {filteredBookings.length} rides found
        </Typography>
      </Box>

      {/* Bookings List */}
      <Card>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <Box textAlign="center" py={4}>
              <DirectionsCar sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No rides found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {statusFilter === 'all' 
                  ? 'You haven\'t taken any rides yet.' 
                  : `No ${statusFilter.replace('_', ' ')} rides found.`
                }
              </Typography>
            </Box>
          ) : (
            <List>
              {filteredBookings.map((booking, index) => (
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
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.destination}
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
                          {booking.driver && (
                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                              <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                              <Typography variant="body2" color="text.secondary">
                                Driver: {booking.driver.name} (4.8 ★)
                              </Typography>
                            </Box>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < filteredBookings.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RideHistory; 