import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  DirectionsCar,
  Speed,
  Security,
  Payment,
  LocationOn,
  Star,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Speed />,
      title: 'Fast & Reliable',
      description: 'Get your ride in minutes with our efficient booking system',
    },
    {
      icon: <Security />,
      title: 'Safe Travel',
      description: 'All our drivers are verified and vehicles are regularly inspected',
    },
    {
      icon: <Payment />,
      title: 'Easy Payment',
      description: 'Multiple payment options including cash and digital payments',
    },
    {
      icon: <LocationOn />,
      title: 'Real-time Tracking',
      description: 'Track your ride in real-time and know exactly when to expect your driver',
    },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/book-ride');
    } else {
      navigate('/register');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80)',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Book Your Ride
                <br />
                <span style={{ color: '#1976d2' }}>Anywhere, Anytime</span>
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Experience the convenience of modern transportation. Book a cab with just a few taps and enjoy a comfortable ride to your destination.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{ mr: 2, mb: 2 }}
                >
                  {isAuthenticated ? 'Book Now' : 'Get Started'}
                </Button>
                {!isAuthenticated && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <DirectionsCar
                  sx={{
                    fontSize: '15rem',
                    color: 'rgba(255,255,255,0.3)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: 3,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                10K+
              </Typography>
              <Typography variant="h6">Happy Customers</Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                500+
              </Typography>
              <Typography variant="h6">Verified Drivers</Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                50K+
              </Typography>
              <Typography variant="h6">Rides Completed</Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                4.8
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Star sx={{ mr: 0.5 }} />
                <Typography variant="h6">Rating</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Start Your Journey?
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Join thousands of satisfied customers who trust us for their daily commute.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStarted}
          sx={{ mt: 2 }}
        >
          {isAuthenticated ? 'Book Your Ride' : 'Sign Up Now'}
        </Button>
      </Container>
    </Box>
  );
};

export default Home;