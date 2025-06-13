import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        </div>
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Today
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center space-x-1">
          <button
            onClick={onPreviousMonth}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};