import { Box, Typography, useTheme } from '@mui/material';
import { KanbanBoard } from '../features/kanban/KanbanBoard';

export const KanbanPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Kanban Board
      </Typography>
      <KanbanBoard />
    </Box>
  );
};
