/** readbleTimeToMinutes
 * @param {string} time - a string representing a time in the format "MM:SS"
 * @returns {number} - the time in minutes
 * @description - This function will take a string representing a time in the format "MM:SS" and return the time in minutes
 * @example - readableTimeToMinutes("10:30") => 10.5
 * @example - readableTimeToMinutes("10:00") => 10
 */
export default function readableTimeToMinutes(time) {
  const [minutes, seconds] = time.split(":");
  return parseInt(minutes) + parseInt(seconds) / 60;
}
