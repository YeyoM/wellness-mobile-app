import getUserStorage from "./Users/getUserStorage";
import getWorkoutsStorage from "./Workouts/getWorkoutsStorage.js";

/** getStatsData
 * @param {void}
 * @returns {Object} - statsData
 * @description - This function returns the user's weight history and the workout data
 * from the user and the workouts storage respectively.
 * The user's weight history is extracted from the user's storage and the workout data is
 * extracted from the workouts storage.
 */
export default async function getStatsData() {
  const user = await getUserStorage();
  const workouts = await getWorkoutsStorage();

  const weightRecord = user.weightRecord;
  const caloriesRecord = [];
  const totalTimeRecord = [];
  workouts.map((workout) => {
    if (
      workout.date === undefined ||
      workout.totalCalories === undefined ||
      workout.totalTime === undefined
    ) {
      return;
    }
    const calories = {
      date: workout.date,
      calories: parseFloat(workout.totalCalories),
    };
    const totalTime = {
      date: workout.date,
      time: workout.totalTime,
    };
    caloriesRecord.push(calories);
    totalTimeRecord.push(totalTime);
  });
  const statsData = {
    weightRecord,
    caloriesRecord,
    totalTimeRecord,
  };
  return statsData;
}
