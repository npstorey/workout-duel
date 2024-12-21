import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { ProgressBar } from './components/ProgressBar';
import { WorkoutLogger } from './components/WorkoutLogger';
import { AdminPanel } from './components/AdminPanel';
import { getStoredState, saveState, checkAndResetWeek, canLogWorkout } from './utils/storage';
import { getCurrentDate } from './utils/dateUtils';
import type { WorkoutState } from './types/workout';

function App() {
  const [state, setState] = useState<WorkoutState>(getStoredState());
  const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    const updatedState = checkAndResetWeek(state);
    if (updatedState !== state) {
      setState(updatedState);
      saveState(updatedState);
    }
  }, [state]);

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
      )
    };

    setState(newState);
    saveState(newState);
    setShowLogger(false);

    const updatedUser = newState.users.find(u => u.id === userId)!;
    if (updatedUser.workouts.length === updatedUser.weeklyGoal) {
      toast('🎉 Weekly goal achieved!', {
        icon: '🏆',
        duration: 3000,
      });
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
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neon-blue mb-2 flex items-center justify-center gap-3">
            <Dumbbell className="w-10 h-10" />
            Workout Warriors
          </h1>
          <p className="text-gray-400">Josh vs Nate - The Ultimate Showdown!</p>
        </header>

        <div className="space-y-8 mb-12">
          {state.users.map(user => (
            <ProgressBar key={user.id} user={user} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowLogger(true)}
            className="bg-neon-blue hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
          >
            Log Today's Workout
          </button>
        </div>
      </div>

      {showLogger && (
        <WorkoutLogger
          users={state.users}
          onLogWorkout={handleLogWorkout}
        />
      )}
      
      <AdminPanel onDateChange={handleDateChange} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;