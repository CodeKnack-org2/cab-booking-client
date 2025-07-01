# Cab Booking Frontend

A modern, responsive React frontend application for a cab booking system. This application provides a complete user interface for passengers, drivers, and administrators to manage cab bookings efficiently.

## Features

### 🚗 For Passengers
- **User Registration & Authentication**: Secure signup and login with role-based access
- **Book Rides**: Easy booking interface with pickup/destination selection
- **Multiple Cab Types**: Choose from Economy, Comfort, and Premium options
- **Real-time Fare Estimation**: Get instant fare estimates before booking
- **Ride History**: View all past and current rides with detailed information
- **Profile Management**: Update personal information and preferences
- **Payment Methods**: Support for cash, card, and digital wallet payments

### 🚘 For Drivers
- **Driver Dashboard**: Comprehensive dashboard with earnings and trip management
- **Availability Toggle**: Easy online/offline status management
- **Booking Management**: Accept, start, and complete trips
- **Earnings Tracking**: Real-time earnings and performance metrics
- **Trip History**: Complete history of all completed rides
- **Performance Analytics**: Rating and performance statistics

### 👨‍💼 For Administrators
- **Admin Dashboard**: System-wide overview with key metrics
- **User Management**: Monitor and manage all users and drivers
- **Booking Analytics**: Track booking patterns and revenue
- **System Monitoring**: Real-time system health and status
- **Driver Performance**: Top performing drivers and ratings
- **Revenue Reports**: Comprehensive financial reporting

## Technology Stack

- **Frontend Framework**: React 18
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router DOM v6
- **Form Management**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Icons**: Material-UI Icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running (see backend documentation)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cab-booking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/             # Generic UI components
├── contexts/           # React Context providers
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── driver/         # Driver-specific pages
│   └── admin/          # Admin-specific pages
├── services/           # API services
│   └── api.js          # API configuration and endpoints
└── utils/              # Utility functions
```

## Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the app for production
- `npm test` - Run the test suite
- `npm eject` - Eject from Create React App (irreversible)

## API Integration

The frontend integrates with the following backend APIs:

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/verify` - Verify JWT token

### Booking Endpoints
- `POST /bookings` - Create new booking
- `GET /bookings/user` - Get user bookings
- `GET /bookings/driver` - Get driver bookings
- `POST /bookings/:id/accept` - Accept booking (driver)
- `POST /bookings/:id/start` - Start trip (driver)
- `POST /bookings/:id/complete` - Complete trip (driver)
- `POST /bookings/:id/cancel` - Cancel booking

### User Management
- `GET /user/profile/:id` - Get user profile
- `PUT /user/profile/:id` - Update user profile
- `GET /user/ride-history/:id` - Get ride history

### Driver Management
- `PUT /driver/availability/:id` - Toggle availability
- `GET /driver/current-trip/:id` - Get current trip
- `GET /driver/earnings/:id` - Get earnings

### Cab Management
- `GET /cabs/available` - Get available cabs
- `POST /cabs` - Register new cab
- `PUT /cabs/:id/status` - Update cab status

## Key Features

### Responsive Design
- Mobile-first approach
- Responsive grid system
- Touch-friendly interface
- Cross-browser compatibility

### Security Features
- JWT token authentication
- Protected routes
- Role-based access control
- Secure API communication

### User Experience
- Intuitive navigation
- Real-time feedback
- Loading states
- Error handling
- Toast notifications

### Performance
- Code splitting
- Lazy loading
- Optimized bundle size
- Efficient state management

## Customization

### Theme Configuration
The application uses Material-UI theming. You can customize the theme in `src/App.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  // Add more theme customizations
});
```

### API Configuration
Update the API base URL in `src/services/api.js` or use environment variables:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend server is running
   - Check the API URL in environment variables
   - Verify CORS configuration on the backend

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify user credentials

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for dependency conflicts
   - Update Node.js version if needed

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the excellent component library
- React team for the amazing framework
- All contributors and maintainers
