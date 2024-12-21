import React from 'react';
import { User } from '../types/workout';
import pixelFlame from '/assets/images/pixel-flame.jpg';
import admitTicket from '/assets/images/admit-ticket.jpg';

interface ProgressBarProps {
  user: User;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ user }) => {
  const MAX_WORKOUTS_PER_WEEK = 7;
  // Calculate progress based on actual workouts out of 7 possible days
  const progress = (user.workouts.length / MAX_WORKOUTS_PER_WEEK) * 100;
  const isOnFire = user.workouts.length >= 3;
  const hasReachedGoal = user.workouts.length >= user.weeklyGoal;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-neon-blue font-arcade">
          {user.name}
        </span>
        {isOnFire && (
          <img 
            src={pixelFlame} 
            alt="On Fire" 
            className="w-6 h-6 animate-pulse" 
          />
        )}
        {hasReachedGoal && (
          <img 
            src={admitTicket} 
            alt="Ticket" 
            className="w-6 h-6 animate-bounce" 
          />
        )}
        <span className="text-gray-400">
          Goal: {user.weeklyGoal} days/week ({user.workouts.length}/{MAX_WORKOUTS_PER_WEEK} days)
        </span>
      </div>

      <div className="h-4 bg-gray-700 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            hasReachedGoal ? 'bg-neon-yellow' : 'bg-neon-blue'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        {/* Optional: Add goal marker */}
        <div 
          className="absolute h-full w-1 bg-yellow-300 top-0"
          style={{ 
            left: `${(user.weeklyGoal / MAX_WORKOUTS_PER_WEEK) * 100}%`,
            opacity: 0.7
          }}
        />
      </div>
    </div>
  );
};