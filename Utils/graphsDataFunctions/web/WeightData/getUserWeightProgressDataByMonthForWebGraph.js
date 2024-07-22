export default function getUserWeightProgressDataByMonthForGraph({
  weightProgressData,
}) {
  if (!weightProgressData || weightProgressData.length === 0) {
    return [];
  }

  const weightProgressDataByMonth = [];

  let currentDate = new Date(weightProgressData[0].x);
  let currentMonth = currentDate.getMonth();
  let currentMonthWeightData = 0;
  let currentMonthDayCount = 0;

  for (let i = 0; i < weightProgressData.length; i++) {
    const date = new Date(weightProgressData[i].x);
    if (date.getMonth() === currentMonth) {
      if (weightProgressData[i].y > 0) {
        currentMonthDayCount++;
      }
      currentMonthWeightData += weightProgressData[i].y;
    } else {
      const averageWeight = currentMonthWeightData / currentMonthDayCount;
      weightProgressDataByMonth.push({
        x: currentDate.toISOString(),
        y: Math.round(averageWeight) || 0,
      });
      currentDate = date;
      currentMonth = currentDate.getMonth();
      currentMonthWeightData = weightProgressData[i].y;
      currentMonthDayCount = 1;
    }
  }

  if (currentMonthWeightData > 0) {
    const averageWeight = currentMonthWeightData / currentMonthDayCount;
    weightProgressDataByMonth.push({
      x: currentDate.toISOString(),
      y: Math.round(averageWeight) || 0,
    });
  }

  return weightProgressDataByMonth;
}
