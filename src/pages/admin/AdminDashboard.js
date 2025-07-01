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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  DirectionsCar,
  People,
  TrendingUp,
  Payment,
  Star,
  Person,
  Speed,
  Assessment,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeBookings: 0,
    completedBookings: 0,
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // In a real app, you would fetch this data from admin API endpoints
      // For now, we'll use mock data
      setStats({
        totalUsers: 1250,
        totalDrivers: 85,
        totalBookings: 3420,
        totalRevenue: 45680.50,
        activeBookings: 12,
        completedBookings: 3408,
      });
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const recentBookings = [
    {
      id: 1,
      user: 'John Doe',
      driver: 'Mike Smith',
      pickup: 'Central Park',
      destination: 'Times Square',
      status: 'completed',
      fare: 25.50,
      date: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      user: 'Jane Smith',
      driver: 'David Johnson',
      pickup: 'Brooklyn Bridge',
      destination: 'Manhattan',
      status: 'in_progress',
      fare: 18.75,
      date: '2024-01-15T11:15:00Z',
    },
    {
      id: 3,
      user: 'Bob Wilson',
      driver: 'Sarah Davis',
      pickup: 'JFK Airport',
      destination: 'Downtown',
      status: 'pending',
      fare: 45.00,
      date: '2024-01-15T12:00:00Z',
    },
  ];

  const topDrivers = [
    { name: 'Mike Smith', rides: 156, rating: 4.9, earnings: 2840.50 },
    { name: 'Sarah Davis', rides: 142, rating: 4.8, earnings: 2650.25 },
    { name: 'David Johnson', rides: 128, rating: 4.7, earnings: 2380.75 },
    { name: 'Lisa Brown', rides: 115, rating: 4.9, earnings: 2150.00 },
  ];

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
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.name}! Monitor and manage the cab booking system.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" color="secondary.main">
                {stats.totalDrivers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Drivers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {stats.totalBookings}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Bookings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Payment sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                ${stats.totalRevenue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Bookings
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Driver</TableCell>
                      <TableCell>Route</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Fare</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.driver}</TableCell>
                        <TableCell>
                          {booking.pickup} → {booking.destination}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={booking.status.replace('_', ' ')}
                            color={getStatusColor(booking.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${booking.fare.toFixed(2)}</TableCell>
                        <TableCell>{formatDate(booking.date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<Assessment />}
                  fullWidth
                >
                  View Reports
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  fullWidth
                >
                  Manage Users
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DirectionsCar />}
                  fullWidth
                >
                  Manage Drivers
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  fullWidth
                >
                  System Settings
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Notifications />}
                  fullWidth
                >
                  Send Notifications
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Active Bookings</Typography>
                  <Chip label={stats.activeBookings} color="warning" size="small" />
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Completed Today</Typography>
                  <Chip label={stats.completedBookings} color="success" size="small" />
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">System Health</Typography>
                  <Chip label="Healthy" color="success" size="small" />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">API Status</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Drivers */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performing Drivers
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Driver Name</TableCell>
                      <TableCell>Total Rides</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Total Earnings</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topDrivers.map((driver, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {driver.name.charAt(0)}
                            </Avatar>
                            {driver.name}
                          </Box>
                        </TableCell>
                        <TableCell>{driver.rides}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                            {driver.rating}
                          </Box>
                        </TableCell>
                        <TableCell>${driver.earnings.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Chart Placeholder */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Overview
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Revenue chart would be displayed here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 