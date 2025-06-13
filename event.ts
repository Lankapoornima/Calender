export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  category: 'work' | 'personal' | 'health' | 'education' | 'social';
  description?: string;
}

export interface EventConflict {
  date: string;
  events: CalendarEvent[];
  conflictLevel: 'none' | 'partial' | 'full';
}