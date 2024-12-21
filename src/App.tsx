import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ProgressBar } from './components/ProgressBar';
import { AdminPanel } from './components/AdminPanel';
import { Scoreboard } from './components/Scoreboard';
import {
  getStoredState,
  saveState,
  checkAndResetWeek,
  canLogWorkout,
  resetAllWorkouts,
} from './utils/storage';
import {
  getCurrentDate,
  resetDateOffset,
} from './utils/dateUtils';
import type { WorkoutState } from './types/workout';

import neonDumbbell from '/assets/images/neon-dumbbell.jpg';
import fireworksArcade from '/assets/images/fireworks-arcade.gif';
import chiliBg from '/assets/images/panna-ii-chili-ceiling.png';
import './styles/global.css';

function App() {
  const [state, setState] = useState<WorkoutState>(getStoredState());
  const [appDate, setAppDate] = useState<Date>(getCurrentDate());
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    document.body.style.minHeight = '100vh';
    document.body.style.backgroundImage = `url(${chiliBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  useEffect(() => {
    const updatedState = checkAndResetWeek(state);
    if (updatedState !== state) {
      setState(updatedState);
      saveState(updatedState);
    }
  }, [state]);

  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  const handleLogWorkout = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (!user || !canLogWorkout(user)) return;

    const today = getCurrentDate().toISOString().split('T')[0];
    const newState: WorkoutState = {
      ...state,
      users: state.users.map(u =>
        u.id === userId
          ? { ...u, workouts: [...u.workouts, today] }
          : u
      ),
    };

    setState(newState);
    saveState(newState);

    const updatedUser = newState.users.find(u => u.id === userId)!;
    if (updatedUser.workouts.length === updatedUser.weeklyGoal) {
      toast('🎉 Weekly goal achieved!', {
        icon: '🏆',
        duration: 3000,
      });
      setShowFireworks(true);
    } else if (updatedUser.workouts.length === 3) {
      toast(`${updatedUser.name} is on fire!`, {
        icon: '🔥',
        duration: 3000,
      });
    }
  };

  const handleDateChange = () => {
    const updatedState = checkAndResetWeek(state);
    setState(updatedState);
    saveState(updatedState);
    setAppDate(getCurrentDate());
  };

  const handleGoalChange = (userId: string, newGoal: number) => {
    const newState: WorkoutState = {
      ...state,
      users: state.users.map(u =>
        u.id === userId
          ? { ...u, weeklyGoal: newGoal }
          : u
      ),
    };
    setState(newState);
    saveState(newState);
  };

  const handleFullReset = () => {
    resetDateOffset();
    const newState = resetAllWorkouts(state);
    setState(newState);
    saveState(newState);
    setAppDate(getCurrentDate());
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = appDate;
  const dayOfWeek = dayNames[now.getDay()];
  const daysLeftInWeek = (7 - now.getDay()) === 0 ? 7 : (7 - now.getDay());

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12">
          <p className="text-neon-yellow text-sm mb-2">
            Today is {dayOfWeek}. {daysLeftInWeek} days left in the week.
          </p>
          <h1 className="text-4xl font-bold text-neon-blue mb-2 flex items-center justify-center gap-3">
            <img 
              src={neonDumbbell} 
              alt="Neon Dumbbell" 
              className="w-10 h-10 hover:scale-110 transition-transform animate-pulse" 
            />
            Neon Gains & Chili Flames
          </h1>
          <p className="text-gray-400">
            Insert coin, log reps, and bask in the glow of your victory.
          </p>
        </header>

        <Scoreboard
          users={state.users}
          lastWeekWinner={state.lastWeekWinner}
          onLogWorkout={handleLogWorkout}
        />

        <div className="space-y-8 mb-12">
          {state.users.map(user => (
            <ProgressBar key={user.id} user={user} />
          ))}
        </div>
      </div>

      <AdminPanel
        onDateChange={handleDateChange}
        onReset={handleFullReset}
        users={state.users}
        onGoalChange={handleGoalChange}
      />

      <Toaster position="top-center" />

      {showFireworks && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <img 
            src={fireworksArcade} 
            alt="Arcade Fireworks" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
    </div>
  );
}

export default App;