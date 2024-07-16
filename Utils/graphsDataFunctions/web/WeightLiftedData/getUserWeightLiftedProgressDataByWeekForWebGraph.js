/** getUserWeightLiftedProgressDataByWeekForWebGraph
 * @param {object} - weightLiftedProgressData - an array that contains the user's weightLifted progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's weightLifted progress over time grouped by week
 * @description - This function will take in the user's weightLifted progress data and return an array of
 * objects that can be used to create a graph of the user's weightLifted progress over time grouped by week.
 */
export default function getUserWeightLiftedProgressDataByWeekForWebGraph({
  weightLiftedProgressData,
}) {
  let maxWeightLiftedWeekly = 0;
  if (weightLiftedProgressData.length === 0) {
    return [];
  }
  const weightLiftedProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < weightLiftedProgressData.length; i++) {
    week.push(weightLiftedProgressData[i]);
    if (week.length === 7) {
      let weekWeightLifted = 0;
      for (let j = 0; j < week.length; j++) {
        weekWeightLifted += week[j].y;
      }
      weekDate = new Date(week[0].x);
      weightLiftedProgressDataByWeek.push({
        x: weekDate,
        y: weekWeightLifted,
      });
      if (weekWeightLifted > maxWeightLiftedWeekly) {
        maxWeightLiftedWeekly = weekWeightLifted;
      }
      week = [];
    }
  }

  const remainingDays = week.length;
  if (remainingDays > 0) {
    let weekWeightLifted = 0;
    for (let j = 0; j < week.length; j++) {
      weekWeightLifted += week[j].y;
    }
    const weekDate = new Date(week[0].x);
    weightLiftedProgressDataByWeek.push({
      x: weekDate,
      y: weekWeightLifted,
    });
    if (weekWeightLifted > maxWeightLiftedWeekly) {
      maxWeightLiftedWeekly = weekWeightLifted;
    }
  }

  return { weightLiftedProgressDataByWeek, maxWeightLiftedWeekly };
}
