// Store the simulated date offset in milliseconds
let dateOffset = 0;

export const getCurrentDate = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + dateOffset);
};

export const advanceDate = (days: number) => {
  dateOffset += days * 24 * 60 * 60 * 1000;
  return getCurrentDate();
};