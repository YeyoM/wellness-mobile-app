export default function getUserTimeSpentProgressDataByMonthForGraph({
  timeProgressData,
}) {
  if (!timeProgressData || timeProgressData.length === 0) {
    return [];
  }

  let timeSpentProgressDataByMonth = [];
  let maxTimeSpentMonthly = 0;

  let currentDate = new Date(timeProgressData[0].x);
  let currentMonth = currentDate.getMonth();
  let monthTotalTimeSpent = 0;

  for (let i = 0; i < timeProgressData.length; i++) {
    const date = new Date(timeProgressData[i].x);
    if (date.getMonth() === currentMonth) {
      monthTotalTimeSpent += timeProgressData[i].y;
    } else {
      timeSpentProgressDataByMonth.push({
        x: date.toISOString(),
        y: monthTotalTimeSpent,
      });
      if (monthTotalTimeSpent > maxTimeSpentMonthly) {
        maxTimeSpentMonthly = monthTotalTimeSpent;
      }
      currentMonth = date.getMonth();
      monthTotalTimeSpent = timeProgressData[i].y;
    }
  }

  if (monthTotalTimeSpent > 0) {
    timeSpentProgressDataByMonth.push({
      x: currentDate.toISOString(),
      y: monthTotalTimeSpent,
    });
    if (monthTotalTimeSpent > maxTimeSpentMonthly) {
      maxTimeSpentMonthly = monthTotalTimeSpent;
    }
  }

  maxTimeSpentMonthly = maxTimeSpentMonthly + maxTimeSpentMonthly * 0.1;

  return { timeSpentProgressDataByMonth, maxTimeSpentMonthly };
}
