import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { CalendarEvent } from '../types/event';
import { getEventsForDate, detectEventConflicts } from '../utils/dateUtils';
import { EventCard } from './EventCard';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  events: CalendarEvent[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  currentDate,
  events
}) => {
  const conflicts = detectEventConflicts(events);
  const conflictMap = conflicts.reduce((acc, conflict) => {
    acc[conflict.date] = conflict;
    return acc;
  }, {} as Record<string, typeof conflicts[0]>);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-semibold text-gray-700 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day, events);
          const dateString = format(day, 'yyyy-MM-dd');
          const conflict = conflictMap[dateString];
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`
                min-h-32 p-2 border-r border-b border-gray-200 relative
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                hover:bg-blue-50 transition-colors duration-200
                ${index % 7 === 6 ? 'border-r-0' : ''}
              `}
            >
              {/* Date number */}
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`
                    inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full
                    ${isCurrentDay
                      ? 'bg-blue-600 text-white shadow-lg'
                      : isCurrentMonth
                      ? 'text-gray-900 hover:bg-gray-100'
                      : 'text-gray-400'
                    }
                    transition-colors duration-200
                  `}
                >
                  {format(day, 'd')}
                </span>
                
                {/* Conflict indicator */}
                {conflict && conflict.conflictLevel !== 'none' && (
                  <div
                    className={`
                      w-3 h-3 rounded-full
                      ${conflict.conflictLevel === 'full' ? 'bg-red-500' : 'bg-yellow-500'}
                    `}
                    title={`${conflict.events.length} overlapping events`}
                  />
                )}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isConflicted={conflict?.conflictLevel !== 'none'}
                    size="small"
                  />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 font-medium pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};