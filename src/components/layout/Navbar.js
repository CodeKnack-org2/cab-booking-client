import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DirectionsCar,
  Person,
  ExitToApp,
  Dashboard,
  History,
  AccountCircle,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout, isDriver, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleDashboardClick = () => {
    handleMenuClose();
    if (isDriver) {
      navigate('/driver/dashboard');
    } else if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <DirectionsCar sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          CabBooking
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/book-ride"
                sx={{ mr: 2 }}
              >
                Book Ride
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/ride-history"
                sx={{ mr: 2 }}
              >
                Ride History
              </Button>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {currentUser?.name?.charAt(0) || <AccountCircle />}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/register"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
        >
          {isAuthenticated ? (
            [
              <MenuItem key="dashboard" onClick={handleDashboardClick}>
                <Dashboard sx={{ mr: 1 }} />
                Dashboard
              </MenuItem>,
              <MenuItem key="book-ride" component={RouterLink} to="/book-ride" onClick={handleMenuClose}>
                <DirectionsCar sx={{ mr: 1 }} />
                Book Ride
              </MenuItem>,
              <MenuItem key="history" component={RouterLink} to="/ride-history" onClick={handleMenuClose}>
                <History sx={{ mr: 1 }} />
                Ride History
              </MenuItem>,
              <MenuItem key="profile" onClick={handleProfileClick}>
                <Person sx={{ mr: 1 }} />
                Profile
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>,
            ]
          ) : (
            [
              <MenuItem key="login" component={RouterLink} to="/login" onClick={handleMenuClose}>
                Login
              </MenuItem>,
              <MenuItem key="register" component={RouterLink} to="/register" onClick={handleMenuClose}>
                Register
              </MenuItem>,
            ]
          )}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>
            <Person sx={{ mr: 1 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleDashboardClick}>
            <Dashboard sx={{ mr: 1 }} />
            Dashboard
          </MenuItem>
          {currentUser?.role && (
            <MenuItem disabled>
              <Chip
                label={currentUser.role.toUpperCase()}
                size="small"
                color="primary"
                variant="outlined"
              />
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 