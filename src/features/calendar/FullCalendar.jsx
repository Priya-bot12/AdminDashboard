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

  const handleEventClick = (info) => {
    const ev = info.event;
    setCurrentEvent(ev);
    setEventTitle(ev.title);
    setEventStart(ev.start?.toISOString().slice(0, 16));
    setEventEnd(ev.end ? ev.end.toISOString().slice(0, 16) : '');
    setOpenDialog(true);
  };

  const handleDateClick = (arg) => {
    setCurrentEvent(null);
    setEventTitle('');
    setEventStart(arg.date.toISOString().slice(0, 16));
    setEventEnd('');
    setOpenDialog(true);
  };

  const handleSave = () => {
    const updatedStart = new Date(eventStart);
    const updatedEnd = eventEnd ? new Date(eventEnd) : undefined;

    if (currentEvent) {
      setEvents(events.map(ev =>
        ev.id === currentEvent.id
          ? { ...ev, title: eventTitle, start: updatedStart, end: updatedEnd }
          : ev
      ));
    } else {
      const newEvent = {
        id: `${Date.now()}`,
        title: eventTitle,
        start: updatedStart,
        end: updatedEnd,
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
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="100%"
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start"
            type="datetime-local"
            fullWidth
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End"
            type="datetime-local"
            fullWidth
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
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
