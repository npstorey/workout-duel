import React from 'react';
import { User } from '../types/workout';
import { Flame } from 'lucide-react';

interface ProgressBarProps {
  user: User;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ user }) => {
  const progress = user.workouts.length;
  const segments = Array.from({ length: 7 }, (_, i) => i < user.weeklyGoal);
  const isOnFire = user.workouts.length >= 3;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-neon-blue">{user.name}</span>
          {isOnFire && (
            <Flame className="w-6 h-6 text-yellow-400 animate-pulse" />
          )}
        </div>
        <span className="text-sm text-gray-400">
          Goal: {user.weeklyGoal} days/week
        </span>
      </div>
      <div className="flex gap-1 h-8">
        {segments.map((active, idx) => (
          <div
            key={idx}
            className={`flex-1 border-2 ${
              idx < progress
                ? 'bg-neon-pink border-pink-600 animate-pulse'
                : active
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-800 bg-gray-900'
            }`}
          />
        ))}
      </div>
    </div>
  );
};