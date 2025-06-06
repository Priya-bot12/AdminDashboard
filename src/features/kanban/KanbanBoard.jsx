import { 
  Box, 
  Paper, 
  Typography, 
  styled, 
  IconButton, 
  TextField, 
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const getColumnColor = (columnId, theme) => {
  const isDark = theme.palette.mode === 'dark';
  const colors = {
    todo: isDark ? '#3d3d3d' : '#fff9c4',
    inProgress: isDark ? '#5c3d3d' : '#ffcdd2',
    done: isDark ? '#3d4d4d' : '#c8e6c9',
  };
  return colors[columnId] || (isDark ? '#424242' : '#f5f5f5');
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

const Column = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  minWidth: 280,
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
}));

export const KanbanBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      items: [
        { id: 'task-1', content: 'Design new dashboard' },
        { id: 'task-2', content: 'Fix bugs in login page' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      items: [
        { id: 'task-3', content: 'API integration' },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      items: [
        { id: 'task-4', content: 'Setup CI/CD' },
      ],
    },
  });

  const [newTasks, setNewTasks] = useState({
    todo: '',
    inProgress: '',
    done: ''
  });

  const addTask = (columnId) => {
    if (!newTasks[columnId].trim()) return;
    
    const newItem = {
      id: `task-${Date.now()}`,
      content: newTasks[columnId]
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, newItem]
      }
    }));

    setNewTasks(prev => ({
      ...prev,
      [columnId]: ''
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter(item => item.id !== taskId)
      }
    }));
  };

  const handleTaskInputChange = (columnId, value) => {
    setNewTasks(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            sx={{ bgcolor: getColumnColor(columnId, theme) }}
          >
            <Typography variant="h6" gutterBottom>
              {column.title}
            </Typography>

            {column.items.map((item) => (
              <Item key={item.id}>
                <Typography>{item.content}</Typography>
                <IconButton
                  size="small"
                  onClick={() => deleteTask(columnId, item.id)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Item>
            ))}

            <Box mt={2}>
              <TextField
                size="small"
                variant="outlined"
                label={`New ${column.title} Task`}
                value={newTasks[columnId]}
                onChange={(e) => handleTaskInputChange(columnId, e.target.value)}
                fullWidth
              />
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => addTask(columnId)}
                sx={{ mt: 1 }}
                fullWidth
                disabled={!newTasks[columnId].trim()}
              >
                Add Task
              </Button>
            </Box>
          </Column>
        ))}
      </Box>
    </Box>
  );
};