import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { advanceDate, getCurrentDate } from '../utils/dateUtils';

interface AdminPanelProps {
  onDateChange: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onDateChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [daysToAdvance, setDaysToAdvance] = useState(1);

  const handleAdvanceDate = () => {
    advanceDate(daysToAdvance);
    onDateChange();
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all"
      >
        <Clock className="w-6 h-6 text-neon-blue" />
      </button>

      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border-2 border-neon-blue p-4 rounded-lg shadow-lg w-64">
          <h3 className="text-neon-blue text-sm mb-4">Admin Tools</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-xs mb-2">Current Date:</p>
              <p className="text-white text-sm">
                {getCurrentDate().toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-2">
                Days to advance:
              </label>
              <input
                type="number"
                min="1"
                value={daysToAdvance}
                onChange={(e) => setDaysToAdvance(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
            </div>

            <button
              onClick={handleAdvanceDate}
              className="w-full bg-neon-pink hover:bg-pink-600 text-white text-sm font-bold py-2 px-4 rounded transition-all"
            >
              Advance Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};