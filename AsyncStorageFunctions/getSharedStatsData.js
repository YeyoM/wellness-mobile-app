/** getSharedStatsData
 * @param {Array} workouts - an array of the user's workouts
 * @param {Object} user - the user's data
 * @returns {Object} - statsData
 * @description - This function returns the user's weight history and the workout data
 * from the user and the workouts storage respectively.
 * The user's weight history is extracted from the user's storage and the workout data is
 * extracted from the workouts storage.
 */
export default function getSharedStatsData(workouts, user) {
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
