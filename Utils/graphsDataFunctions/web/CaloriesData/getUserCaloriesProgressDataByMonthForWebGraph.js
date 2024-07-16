export default function getUserCaloriesProgressDataByMonthForWebGraph({
  caloriesProgressData,
}) {
  if (caloriesProgressData.length === 0) {
    return [];
  }
  let caloriesProgressDataByMonth = [];
  let maxCaloriesMonthly = 0;

  let currentDate = new Date(caloriesProgressData[0].x);
  let currentMonth = currentDate.getMonth();
  let monthCalories = 0;

  for (let i = 0; i < caloriesProgressData.length; i++) {
    const date = new Date(caloriesProgressData[i].x);
    if (date.getMonth() === currentMonth) {
      monthCalories += caloriesProgressData[i].y;
    } else {
      caloriesProgressDataByMonth.push({
        x: date,
        y: monthCalories,
      });
      currentMonth = date.getMonth();
      if (monthCalories > maxCaloriesMonthly) {
        maxCaloriesMonthly = monthCalories;
      }
      monthCalories = caloriesProgressData[i].y;
    }
  }

  if (monthCalories > 0) {
    caloriesProgressDataByMonth.push({
      x: currentDate,
      y: monthCalories,
    });
    if (monthCalories > maxCaloriesMonthly) {
      maxCaloriesMonthly = monthCalories;
    }
  }

  maxCaloriesMonthly = maxCaloriesMonthly + maxCaloriesMonthly * 0.1;

  return { caloriesProgressDataByMonth, maxCaloriesMonthly };
}
