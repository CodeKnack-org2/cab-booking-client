import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            <DirectionsCar sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              CabBooking
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CabBooking. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 