/**
 * calculateTimeLift
 * @param {number} reps - The number of reps
 * @param {number} sets - The number of sets
 * @param {number} restTime - The time spent resting between sets in seconds
 * @returns {number} - The time spent lifting in minutes
 */
export default function calculateTimeLift(reps, sets, restTime) {
  if (reps < 0) {
    throw new Error("reps must be a positive number");
  }

  if (sets < 0) {
    throw new Error("sets must be a positive number");
  }

  if (restTime < 0) {
    throw new Error("restTime must be a positive number");
  }

  return ((5 * reps + restTime) * sets) / 60;
}
