import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';

export const CalendarComponent = () => {
  const theme = useTheme();
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting', start: new Date() },
    { id: '2', title: 'Lunch', start: new Date(new Date().setHours(12, 0, 0, 0)) },
    { id: '3', title: 'Conference', start: '2023-05-20', end: '2023-05-22' }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [error, setError] = useState('');

  const handleEventClick = (info) => {
    const ev = info.event;
    setCurrentEvent(ev);
    setEventTitle(ev.title);
    
    // Check if it's an all-day event
    const isAllDay = ev.allDay || (!ev.startStr.includes('T') && !ev.endStr.includes('T'));
    setAllDay(isAllDay);
    
    // Format dates based on all-day status
    if (isAllDay) {
      setEventStart(ev.startStr.split('T')[0]);
      setEventEnd(ev.endStr ? ev.endStr.split('T')[0] : '');
    } else {
      setEventStart(ev.startStr.slice(0, 16));
      setEventEnd(ev.endStr ? ev.endStr.slice(0, 16) : '');
    }
    
    setOpenDialog(true);
    setError('');
  };

  const handleDateClick = (arg) => {
    setCurrentEvent(null);
    setEventTitle('');
    setAllDay(arg.allDay);
    
    if (arg.allDay) {
      setEventStart(arg.dateStr);
      setEventEnd('');
    } else {
      // For timed events, default to 1 hour duration
      const startDate = arg.date;
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      
      setEventStart(startDate.toISOString().slice(0, 16));
      setEventEnd(endDate.toISOString().slice(0, 16));
    }
    
    setOpenDialog(true);
    setError('');
  };

  const handleSave = () => {
    // Validation
    if (!eventTitle.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!eventStart) {
      setError('Start date/time is required');
      return;
    }
    
    let updatedStart, updatedEnd;
    
    try {
      if (allDay) {
        updatedStart = new Date(eventStart);
        updatedStart.setHours(0, 0, 0, 0);
        
        if (eventEnd) {
          updatedEnd = new Date(eventEnd);
          updatedEnd.setHours(0, 0, 0, 0);
        } else {
          updatedEnd = new Date(updatedStart);
          updatedEnd.setDate(updatedEnd.getDate() + 1);
        }
      } else {
        updatedStart = new Date(eventStart);
        
        if (eventEnd) {
          updatedEnd = new Date(eventEnd);
          if (updatedEnd <= updatedStart) {
            setError('End time must be after start time');
            return;
          }
        } else {
          updatedEnd = new Date(updatedStart.getTime() + 60 * 60 * 1000); // Default 1 hour
        }
      }
    } catch (e) {
      setError('Invalid date format');
      return;
    }

    if (currentEvent) {
      // Update existing event
      setEvents(events.map(ev =>
        ev.id === currentEvent.id
          ? { 
              ...ev, 
              title: eventTitle, 
              start: updatedStart, 
              end: updatedEnd,
              allDay: allDay
            }
          : ev
      ));
    } else {
      // Add new event
      const newEvent = {
        id: `${Date.now()}`,
        title: eventTitle,
        start: updatedStart,
        end: updatedEnd,
        allDay: allDay
      };
      setEvents([...events, newEvent]);
    }

    setOpenDialog(false);
  };

  const handleDelete = () => {
    if (currentEvent) {
      setEvents(events.filter(ev => ev.id !== currentEvent.id));
    }
    setOpenDialog(false);
  };

  const handleAllDayChange = (e) => {
    setAllDay(e.target.checked);
    
    if (e.target.checked) {
      // Switching to all-day: remove time component
      if (eventStart) {
        const date = new Date(eventStart);
        setEventStart(date.toISOString().split('T')[0]);
      }
      if (eventEnd) {
        const date = new Date(eventEnd);
        setEventEnd(date.toISOString().split('T')[0]);
      }
    } else {
      // Switching to timed event: add default time
      if (eventStart) {
        const date = new Date(eventStart);
        if (isNaN(date.getTime())) {
          setEventStart(new Date().toISOString().slice(0, 16));
        } else {
          date.setHours(12, 0, 0, 0); // Default to noon
          setEventStart(date.toISOString().slice(0, 16));
        }
      }
      if (eventEnd) {
        const date = new Date(eventEnd);
        if (isNaN(date.getTime())) {
          setEventEnd('');
        } else {
          date.setHours(13, 0, 0, 0); // Default to 1 hour after start
          setEventEnd(date.toISOString().slice(0, 16));
        }
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        height: '600px',
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
      }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="100%"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            error={!!error && !eventTitle.trim()}
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={allDay}
                onChange={handleAllDayChange}
                color="primary"
              />
            }
            label="All-day event"
            sx={{ mt: 1 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              margin="dense"
              label={allDay ? "Start Date" : "Start Date & Time"}
              type={allDay ? "date" : "datetime-local"}
              fullWidth
              value={eventStart}
              onChange={(e) => setEventStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!error && !eventStart}
            />
            
            <TextField
              margin="dense"
              label={allDay ? "End Date" : "End Date & Time"}
              type={allDay ? "date" : "datetime-local"}
              fullWidth
              value={eventEnd}
              onChange={(e) => setEventEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {currentEvent && (
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
