
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

// Helper function to reorder items in a list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move items between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

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

  const [newTask, setNewTask] = useState('');

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        columns[source.droppableId].items,
        source.index,
        destination.index
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: reordered,
        },
      });
    } else {
      const moved = move(
        columns[source.droppableId].items,
        columns[destination.droppableId].items,
        source,
        destination
      );

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: moved[source.droppableId],
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: moved[destination.droppableId],
        },
      });
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newId = `task-${Date.now()}`;
    const newItem = { id: newId, content: newTask };
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [...prev.todo.items, newItem],
      },
    }));
    setNewTask('');
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  return (
    <Box sx={{ p: 2 }}>

      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              sx={{ bgcolor: getColumnColor(columnId, theme) }}
            >
              <Typography variant="h6" gutterBottom>
                {column.title}
              </Typography>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Typography>{item.content}</Typography>
                            <IconButton
                              size="small"
                              onClick={() => deleteTask(columnId, item.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Item>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {columnId === 'todo' && (
                <Box mt={2}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    fullWidth
                  />
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={addTask}
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    Add Task
                  </Button>
                </Box>
              )}
            </Column>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  );
};
