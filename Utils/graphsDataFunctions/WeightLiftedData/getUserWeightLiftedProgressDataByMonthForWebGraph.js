/** getUserWeightLiftedProgressDataByMonthForGraph
 * @param {object} - weightLiftedProgressData - an array that contains the user's weightLifted progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's weightLifted progress over time grouped by month
 * @description - This function will take in the user's weightLifted progress data and return an array of
 * objects that can be used to create a graph of the user's weightLifted progress over time grouped by month.
 */
export default function getUserWeightLiftedProgressDataByMonthForWebGraph({
  weightLiftedProgressData,
}) {
  let maxWeightLiftedMonthly = 0;
  if (weightLiftedProgressData.length === 0) {
    return [];
  }
  const weightLiftedProgressDataByMonth = [];

  let currentDate = new Date(weightLiftedProgressData[0].x);
  let currentMonth = currentDate.getMonth();
  let monthWeightLifted = 0;

  weightLiftedProgressData.map((data) => {
    if (data.y === NaN) {
      data.y = 0;
    }
  });

  for (let i = 0; i < weightLiftedProgressData.length; i++) {
    const date = new Date(weightLiftedProgressData[i].x);
    if (date.getMonth() === currentMonth) {
      monthWeightLifted += weightLiftedProgressData[i].y;
    } else {
      weightLiftedProgressDataByMonth.push({
        x: currentDate,
        y: monthWeightLifted,
      });
      if (monthWeightLifted > maxWeightLiftedMonthly) {
        maxWeightLiftedMonthly = monthWeightLifted;
      }
      currentDate = date;
      currentMonth = currentDate.getMonth();
      monthWeightLifted = weightLiftedProgressData[i].y;
    }
  }

  if (monthWeightLifted > 0) {
    weightLiftedProgressDataByMonth.push({
      x: currentDate,
      y: monthWeightLifted,
    });
  }

  weightLiftedProgressDataByMonth.map((data) => {
    if (data.y === NaN) {
      data.y = 0;
    }
  });

  return { weightLiftedProgressDataByMonth, maxWeightLiftedMonthly };
}
