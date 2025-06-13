import React from 'react';
import { CalendarEvent } from '../types/event';
import { formatEventTime, getCategoryColor, getCategoryLightColor } from '../utils/dateUtils';
import { Clock, AlertTriangle } from 'lucide-react';

interface EventCardProps {
  event: CalendarEvent;
  isConflicted?: boolean;
  size?: 'small' | 'normal';
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isConflicted = false, 
  size = 'normal' 
}) => {
  const colorClass = isConflicted ? getCategoryLightColor(event.category) : getCategoryColor(event.category);
  const sizeClass = size === 'small' ? 'p-1 text-xs' : 'p-2 text-sm';

  return (
    <div
      className={`
        ${colorClass} ${sizeClass}
        rounded-md border border-l-4 
        transition-all duration-200 hover:shadow-md hover:scale-105
        cursor-pointer group relative
        ${isConflicted ? 'ring-2 ring-yellow-300' : ''}
      `}
      title={event.description}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className={`font-medium truncate ${size === 'small' ? 'leading-tight' : ''}`}>
            {event.title}
          </p>
          <div className="flex items-center mt-1 space-x-1">
            <Clock className="w-3 h-3 opacity-75 flex-shrink-0" />
            <span className="text-xs opacity-90 truncate">
              {formatEventTime(event.startTime, event.endTime)}
            </span>
          </div>
        </div>
        {isConflicted && (
          <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 ml-1" />
        )}
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-0 mb-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg min-w-48 max-w-64">
        <div className="font-medium mb-1">{event.title}</div>
        <div className="text-gray-300 mb-2">
          {formatEventTime(event.startTime, event.endTime)}
        </div>
        {event.description && (
          <div className="text-gray-300">{event.description}</div>
        )}
        <div className="absolute top-full left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </div>
  );
};