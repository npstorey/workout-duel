import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { advanceDate, getCurrentDate } from '../utils/dateUtils';
import { User } from '../types/workout';

interface AdminPanelProps {
  onDateChange: () => void;
  onReset: () => void;
  users: User[];
  onGoalChange: (userId: string, newGoal: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onDateChange,
  onReset,
  users,
  onGoalChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [daysToAdvance, setDaysToAdvance] = useState(1);
  const [updateKey, setUpdateKey] = useState(0);

  const handleAdvanceDate = () => {
    advanceDate(daysToAdvance);
    onDateChange();
    setUpdateKey(prev => prev + 1);
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
        <div
          key={updateKey}
          className="absolute bottom-16 right-0 bg-gray-900 border-2 border-neon-blue p-4 rounded-lg shadow-lg w-64"
        >
          <h3 className="text-neon-blue text-sm mb-4">
            Time Machine Tools (24-Hour Diner Edition)
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-xs mb-2">Current Date:</p>
              <p className="text-white text-sm">
                {getCurrentDate().toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-2">
                How many days to skip? (Late-night shift change vibes!)
              </label>
              <input
                type="number"
                min="1"
                value={daysToAdvance}
                onChange={e =>
                  setDaysToAdvance(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
            </div>

            <button
              onClick={handleAdvanceDate}
              className="w-full bg-neon-pink hover:bg-pink-600 text-white text-sm font-bold py-2 px-4 rounded transition-all"
            >
              Advance Time
            </button>

            <button
              onClick={onReset}
              className="w-full bg-arcade-purple hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded transition-all"
            >
              Reset to System Date
            </button>

            <div className="mt-4">
              <p className="text-neon-blue text-xs mb-2">Set Weekly Goals</p>
              {users.map(user => (
                <div key={user.id} className="mb-2">
                  <label className="text-white text-xs block mb-1">
                    {user.name} Goal:
                  </label>
                  <input
                    type="number"
                    value={user.weeklyGoal}
                    onChange={e =>
                      onGoalChange(
                        user.id,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};