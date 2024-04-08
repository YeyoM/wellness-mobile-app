/**
 * calculateTimeLiftWithoutRest
 * @param {number} reps - The number of reps
 * @param {number} sets - The number of sets
 * @returns {number} - The time spent lifting in minutes
 */
export default function calculateTimeLiftWithoutRest(reps, sets) {
  if (reps < 0) {
    throw new Error("reps must be a positive number");
  }

  if (sets < 0) {
    throw new Error("sets must be a positive number");
  }

  return (5 * reps * sets) / 60;
}
