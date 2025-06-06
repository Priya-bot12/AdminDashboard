import { Typography, Box, useTheme } from '@mui/material';
import { CalendarComponent } from '../features/calendar/FullCalendar';

export const CalendarPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Calendar
        <Typography variant="body2" color="textSecondary" gutterBottom>
              Add/delete tasks by clicking on date*
            </Typography>
      </Typography>
      <CalendarComponent />
    </Box>
  );
};
