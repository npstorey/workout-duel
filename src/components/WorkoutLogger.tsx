import React from 'react';
import { User } from '../types/workout';
import { canLogWorkout } from '../utils/storage';

interface WorkoutLoggerProps {
  users: User[];
  onLogWorkout: (userId: string) => void;
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ users, onLogWorkout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-4 border-neon-blue p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl text-center text-neon-blue mb-6">Who's working out?</h2>
        <div className="space-y-4">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => onLogWorkout(user.id)}
              disabled={!canLogWorkout(user)}
              className={`w-full py-4 px-6 rounded-lg text-xl font-bold transition-all
                ${
                  canLogWorkout(user)
                    ? 'bg-neon-pink hover:bg-pink-600 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
              {user.name}
              {!canLogWorkout(user) && ' (Already logged today)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};