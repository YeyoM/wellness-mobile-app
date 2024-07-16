export default function getUserCaloriesProgressDataByWeekForWebGraph({
  caloriesProgressData,
}) {
  if (caloriesProgressData.length === 0) {
    return [];
  }

  const caloriesProgressDataByWeek = [];
  let week = [];
  let maxCaloriesWeekly = 0;

  for (let i = 0; i < caloriesProgressData.length; i++) {
    week.push(caloriesProgressData[i]);
    if (week.length === 7) {
      let weekCalories = 0;
      for (let j = 0; j < week.length; j++) {
        weekCalories += week[j].y;
      }
      weekDate = new Date(week[0].x);
      caloriesProgressDataByWeek.push({
        x: weekDate,
        y: weekCalories,
      });
      week = [];
      if (weekCalories > maxCaloriesWeekly) {
        maxCaloriesWeekly = weekCalories;
      }
    }
  }

  const remainingDays = week.length;
  if (remainingDays > 0) {
    let weekCalories = 0;
    for (let j = 0; j < week.length; j++) {
      weekCalories += week[j].y;
    }
    const weekDate = new Date(week[0].x);
    caloriesProgressDataByWeek.push({
      x: weekDate,
      y: weekCalories,
    });
    if (weekCalories > maxCaloriesWeekly) {
      maxCaloriesWeekly = weekCalories;
    }
  }

  maxCaloriesWeekly = maxCaloriesWeekly + maxCaloriesWeekly * 0.1;

  return { caloriesProgressDataByWeek, maxCaloriesWeekly };
}
