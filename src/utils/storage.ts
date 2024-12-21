import { WorkoutState, User } from '../types/workout';
import { getCurrentDate } from './dateUtils';

const STORAGE_KEY = 'workout_tracker_state';
const DEFAULT_STATE: WorkoutState = {
  users: [
    { id: 'josh', name: 'Josh', weeklyGoal: 5, workouts: [] },
    { id: 'nate', name: 'Nate', weeklyGoal: 5, workouts: [] }
  ],
  lastReset: getCurrentDate().toISOString()
};

export const getStoredState = (): WorkoutState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return DEFAULT_STATE;
  }
  return JSON.parse(stored);
};

export const saveState = (state: WorkoutState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const checkAndResetWeek = (state: WorkoutState): WorkoutState => {
  const lastReset = new Date(state.lastReset);
  const now = getCurrentDate();
  const weekDiff = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24 * 7));
  
  if (weekDiff >= 1) {
    return {
      ...state,
      users: state.users.map(user => ({ ...user, workouts: [] })),
      lastReset: now.toISOString()
    };
  }
  return state;
};

export const canLogWorkout = (user: User): boolean => {
  const today = getCurrentDate().toISOString().split('T')[0];
  return !user.workouts.includes(today);
};