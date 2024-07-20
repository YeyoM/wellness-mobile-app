export default function getUserTimeSpentProgressDataByWeekForGraph({
  timeProgressData,
}) {
  if (!timeProgressData || timeProgressData.length === 0) {
    return [];
  }

  let maxTimeSpentWeekly = 0;

  let timeSpentProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < timeProgressData.length; i++) {
    week.push(timeProgressData[i]);
    if (week.length === 7) {
      let weekMinutes = 0;
      for (let j = 0; j < week.length; j++) {
        weekMinutes += week[j].y;
      }
      const weekDate = new Date(week[0].x);
      timeSpentProgressDataByWeek.push({
        x: weekDate.toISOString(),
        y: weekMinutes,
      });
      if (weekMinutes > maxTimeSpentWeekly) {
        maxTimeSpentWeekly = weekMinutes;
      }
      week = [];
    }
  }

  const remainingDays = week.length;
  if (remainingDays > 0) {
    let weekMinutes = 0;
    for (let j = 0; j < week.length; j++) {
      weekMinutes += week[j].y;
    }
    const weekDate = new Date(week[0].x);
    timeSpentProgressDataByWeek.push({
      x: weekDate.toISOString(),
      y: weekMinutes,
    });
    if (weekMinutes > maxTimeSpentWeekly) {
      maxTimeSpentWeekly = weekMinutes;
    }
  }

  return { timeSpentProgressDataByWeek, maxTimeSpentWeekly };
}
