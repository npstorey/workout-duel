import React from 'react';
import { User } from '../types/workout';
import scratchMetallic from '/assets/images/scratch-off-metallic.jpg';
import chiliLights from '/assets/images/chili-lights.gif';

interface ScoreboardProps {
  users: User[];
  lastWeekWinner?: string;
  onLogWorkout: (userId: string) => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  users,
  lastWeekWinner,
  onLogWorkout,
}) => {
  return (
    <div className="relative">
      {/* Decorative chili lights strip above scoreboard */}
      <div 
        className="absolute -top-8 left-0 right-0 overflow-hidden"
        style={{
          width: '100%',
          height: '24px',
        }}
      >
        <div className="flex animate-scroll" style={{ gap: '0' }}>
          {[...Array(12)].map((_, i) => (
            <img 
              key={i}
              src={chiliLights} 
              alt="Blinking Chili Lights" 
              className="h-6"
              style={{
                width: '16.66%',
                objectFit: 'cover',
                flexShrink: 0,
                transform: 'scale(0.7)',
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main scoreboard */}
      <div
        className="relative mx-auto mb-12"
        style={{
          backgroundImage: 'url("/assets/images/scoreboard-frame.jpg")',
          minHeight: '250px',
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '30px',
          backgroundColor: '#4a0049',
        }}
      >
        {/* Checkerboard border at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{
            background: 'repeating-linear-gradient(90deg, #000 0, #000 50px, #ffd700 50px, #ffd700 100px)',
            opacity: 0.8
          }}
        />

        {/* Content container */}
        <div className="relative z-10">
          {/* Winner announcement */}
          {lastWeekWinner && (
            <div className="text-center mb-4">
              <p className="text-yellow-300 text-2xl font-arcade">
                Last week's winner: <span className="text-neon-yellow">{lastWeekWinner}</span>
              </p>
            </div>
          )}

          {/* User rows */}
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-6"
              >
                <span className="text-neon-blue text-xl font-arcade">
                  {user.name} — Workouts: {user.workouts.length}
                </span>
                <button
                  onClick={() => onLogWorkout(user.id)}
                  className="bg-neon-yellow hover:bg-yellow-200 
                           text-black font-bold px-6 py-2 rounded
                           shadow-neon"
                >
                  Log Workout
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Neon border effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '4px solid #ff69b4',
            boxShadow: `
              0 0 10px #ff69b4,
              0 0 20px #ff69b4,
              inset 0 0 10px #ff69b4,
              inset 0 0 20px #ff69b4
            `,
            borderRadius: '12px'
          }}
        />
      </div>
    </div>
  );
};