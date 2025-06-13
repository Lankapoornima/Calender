import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  addMonths, 
  subMonths,
  isSameDay,
  parseISO,
  isAfter,
  isBefore
} from 'date-fns';
import { CalendarEvent, EventConflict } from '../types/event';

export const getCalendarDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const getEventsForDate = (date: Date, events: CalendarEvent[]) => {
  const dateString = format(date, 'yyyy-MM-dd');
  return events.filter(event => event.date === dateString);
};

export const detectEventConflicts = (events: CalendarEvent[]): EventConflict[] => {
  const eventsByDate = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return Object.entries(eventsByDate).map(([date, dateEvents]) => {
    let conflictLevel: 'none' | 'partial' | 'full' = 'none';
    
    if (dateEvents.length > 1) {
      // Sort events by start time
      const sortedEvents = dateEvents.sort((a, b) => 
        a.startTime.localeCompare(b.startTime)
      );

      // Check for overlaps
      for (let i = 0; i < sortedEvents.length - 1; i++) {
        const current = sortedEvents[i];
        const next = sortedEvents[i + 1];
        
        const currentEnd = parseTime(current.endTime);
        const nextStart = parseTime(next.startTime);
        
        if (currentEnd > nextStart) {
          conflictLevel = currentEnd === nextStart ? 'partial' : 'full';
          break;
        }
      }
    }

    return {
      date,
      events: dateEvents,
      conflictLevel
    };
  });
};

const parseTime = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatEventTime = (startTime: string, endTime: string): string => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const getCategoryColor = (category: CalendarEvent['category']): string => {
  const colors = {
    work: 'bg-blue-500 text-blue-50 border-blue-600',
    personal: 'bg-purple-500 text-purple-50 border-purple-600',
    health: 'bg-green-500 text-green-50 border-green-600',
    education: 'bg-orange-500 text-orange-50 border-orange-600',
    social: 'bg-pink-500 text-pink-50 border-pink-600'
  };
  return colors[category];
};

export const getCategoryLightColor = (category: CalendarEvent['category']): string => {
  const colors = {
    work: 'bg-blue-50 text-blue-700 border-blue-200',
    personal: 'bg-purple-50 text-purple-700 border-purple-200',
    health: 'bg-green-50 text-green-700 border-green-200',
    education: 'bg-orange-50 text-orange-700 border-orange-200',
    social: 'bg-pink-50 text-pink-700 border-pink-200'
  };
  return colors[category];
};