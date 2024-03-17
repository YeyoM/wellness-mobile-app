/** minutesToReadableTime
 * @param {number} minutes
 * @returns {string} - the time in the format "HHh MMm"
 */

export default function minutesToReadableTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
}
