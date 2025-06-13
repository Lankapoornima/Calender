import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventLegend } from './EventLegend';
import { getCalendarDays } from '../utils/dateUtils';
import { staticEvents } from '../data/events';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const days = getCalendarDays(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <CalendarGrid
              days={days}
              currentDate={currentDate}
              events={staticEvents}
            />
          </div>
          
          <div className="xl:col-span-1">
            <EventLegend events={staticEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};