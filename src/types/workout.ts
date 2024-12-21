export interface User {
  id: string;
  name: string;
  weeklyGoal: number;
  workouts: string[];
}

export interface WorkoutState {
  users: User[];
  lastReset: string;
  lastWeekWinner?: string;
}