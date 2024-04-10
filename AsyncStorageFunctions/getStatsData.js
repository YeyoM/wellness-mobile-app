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
  const weightLiftedRecord = [];
  workouts.map((workout) => {
    if (
      workout.date === undefined ||
      workout.totalCalories === undefined ||
      workout.totalTime === undefined ||
      workout.totalWeight === undefined
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
    const weightLifted = {
      date: workout.date,
      weightLifted: parseFloat(workout.totalWeight),
    };
    caloriesRecord.push(calories);
    totalTimeRecord.push(totalTime);
    weightLiftedRecord.push(weightLifted);
  });
  const statsData = {
    weightRecord,
    caloriesRecord,
    totalTimeRecord,
    weightLiftedRecord,
  };
  return statsData;
}
