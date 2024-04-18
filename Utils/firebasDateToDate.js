/**
 * firebasDateToDate
 * @param {Object} date - Firebase date object
 * @returns {Date} - Date object
 */
export default function firebasDateToDate(date) {
  if (!date) {
    throw new Error("Date is required");
  }

  if (date.seconds === undefined || date.nanoseconds === undefined) {
    return new Date(date);
  }
  return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
}
