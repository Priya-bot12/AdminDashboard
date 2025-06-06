import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Divider,
  Chip,
  Stack,
  useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TodayIcon from '@mui/icons-material/Today';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Sample notifications
  const notifications = [
    { id: 1, text: 'System update scheduled for tonight', time: '2 hours ago', read: false },
    { id: 2, text: 'New feature available: Dark mode', time: '1 day ago', read: true },
    { id: 3, text: 'Your profile is 80% complete', time: '3 days ago', read: true }
  ];

  // Upcoming events
  const events = [
    { id: 1, title: 'Team meeting', date: 'Today, 10:00 AM' },
    { id: 2, title: 'Project deadline', date: 'Tomorrow, 5:00 PM' }
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: theme.palette.text.primary,
          mb: 4,
          fontWeight: 600
        }}
      >
        Dashboard
        <Typography variant="body2" color="textSecondary" gutterBottom>
                       UI (no database)*
              </Typography>
      </Typography>

      <Grid container spacing={3}>
        {/* Time Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: theme.palette.background.paper,
              borderLeft: `4px solid ${theme.palette.primary.main}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon 
                fontSize="large" 
                sx={{ 
                  mr: 2,
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                }} 
              />
              <Typography variant="h6" color="text.primary">
                Current Time
              </Typography>
            </Box>
            
            <Typography 
              variant="h3" 
              sx={{ 
                fontFamily: 'monospace',
                fontWeight: 500,
                color: theme.palette.text.primary
              }}
            >
              {formattedTime}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">
                {formattedDate}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Notifications Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              bgcolor: theme.palette.background.paper,
              borderLeft: `4px solid ${theme.palette.secondary.main}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CircleNotificationsIcon 
                fontSize="large" 
                sx={{ 
                  mr: 2,
                  color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark
                }} 
              />
              <Typography variant="h6" color="text.primary">
                Notifications
              </Typography>
              <Chip 
                label={`${notifications.filter(n => !n.read).length} new`} 
                size="small" 
                color="secondary"
                sx={{ ml: 'auto' }}
              />
            </Box>
            
            <Stack spacing={2}>
              {notifications.map((notification) => (
                <Box 
                  key={notification.id}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: !notification.read ? 
                      (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 
                      'transparent',
                    borderLeft: !notification.read ? `3px solid ${theme.palette.secondary.main}` : 'none'
                  }}
                >
                  <Typography variant="body1" color="text.primary">
                    {notification.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Upcoming Events Card */}
        <Grid item xs={12} md={12} lg={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              bgcolor: theme.palette.background.paper,
              borderLeft: `4px solid ${theme.palette.success.main}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventNoteIcon 
                fontSize="large" 
                sx={{ 
                  mr: 2,
                  color: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark
                }} 
              />
              <Typography variant="h6" color="text.primary">
                Upcoming Events
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {events.map((event) => (
                <Box 
                  key={event.id}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  <Typography variant="subtitle1" color="text.primary">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};