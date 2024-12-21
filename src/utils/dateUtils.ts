let dateOffset = 0;

export const getCurrentDate = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + dateOffset);
};

export const advanceDate = (days: number) => {
  dateOffset += days * 24 * 60 * 60 * 1000;
  return getCurrentDate();
};

export const resetDateOffset = (): Date => {
  dateOffset = 0;
  return getCurrentDate();
};

/**
 * Returns the next Sunday strictly after the given date.
 * If the date is already Sunday, it moves one day forward first
 * so that it doesn't reset immediately on Sunday itself.
 */
export function nextSundayAfter(date: Date): Date {
  const next = new Date(date);
  // If it's Sunday, move forward by 1 day to ensure next Sunday is in the future
  if (next.getDay() === 0) {
    next.setDate(next.getDate() + 1);
  }
  // Move forward until day is Sunday (0)
  while (next.getDay() !== 0) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}