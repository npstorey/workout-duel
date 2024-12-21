import { WorkoutState, User } from '../types/workout';
import { getCurrentDate, nextSundayAfter } from './dateUtils';

const STORAGE_KEY = 'workout_tracker_state';
const DEFAULT_STATE: WorkoutState = {
  users: [
    { id: 'josh', name: 'Josh', weeklyGoal: 5, workouts: [] },
    { id: 'nate', name: 'Nate', weeklyGoal: 5, workouts: [] }
  ],
  lastReset: getCurrentDate().toISOString(),
};

function determineLastWeekWinner(users: User[]): string {
  if (!users.length) return '';
  let max = -1;
  let winner = '';
  for (const user of users) {
    if (user.workouts.length > max) {
      max = user.workouts.length;
      winner = user.name;
    }
  }
  return winner;
}

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

/**
 * Resets the week's progress if the current date is on or after
 * the next Sunday from the last reset date.
 */
export const checkAndResetWeek = (state: WorkoutState): WorkoutState => {
  const now = getCurrentDate();
  const lastReset = new Date(state.lastReset);
  const nextSun = nextSundayAfter(lastReset);

  // If we've reached/passed the next Sunday, reset
  if (now >= nextSun) {
    const lastWeekWinner = determineLastWeekWinner(state.users);
    return {
      ...state,
      lastWeekWinner,
      users: state.users.map(user => ({ ...user, workouts: [] })),
      lastReset: now.toISOString(),
    };
  }
  return state;
};

export const canLogWorkout = (user: User): boolean => {
  const today = getCurrentDate().toISOString().split('T')[0];
  const MAX_WORKOUTS_PER_WEEK = 7;
  
  return (
    // Allow workouts if under the max per week
    user.workouts.length < MAX_WORKOUTS_PER_WEEK &&
    // And hasn't already logged one today
    !user.workouts.includes(today)
  );
};

export const resetAllWorkouts = (state: WorkoutState): WorkoutState => {
  return {
    ...state,
    users: state.users.map(u => ({ ...u, workouts: [] })),
    lastReset: getCurrentDate().toISOString(),
    lastWeekWinner: undefined,
  };
};