/**
 * @param {number} sets - The number of sets
 * @param {number} restTime - The time spent resting between sets in minutes
 * @returns {number} - The time spent lifting in minutes
 */
export default function calculateTimeLift(sets, restTime) {
  // time = sets * 1:30min + restTime * (sets - 1)
  if (sets < 0) {
    throw new Error("sets must be a positive number");
  }

  if (restTime < 0) {
    throw new Error("restTime must be a positive number");
  }

  return sets * 1.5 + restTime * (sets - 1);
}
