import React from 'react';
import { CalendarEvent } from '../types/event';
import { getCategoryColor } from '../utils/dateUtils';

interface EventLegendProps {
  events: CalendarEvent[];
}

export const EventLegend: React.FC<EventLegendProps> = ({ events }) => {
  const categories = Array.from(new Set(events.map(event => event.category)));
  
  const categoryLabels = {
    work: 'Work',
    personal: 'Personal',
    health: 'Health',
    education: 'Education',
    social: 'Social'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${getCategoryColor(category).split(' ')[0]}`}
            />
            <span className="text-sm font-medium text-gray-700">
              {categoryLabels[category]}
            </span>
            <span className="text-xs text-gray-500">
              ({events.filter(e => e.category === category).length})
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Conflict Indicators</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-xs text-gray-600">Partial time overlap</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-xs text-gray-600">Full time conflict</span>
          </div>
        </div>
      </div>
    </div>
  );
};