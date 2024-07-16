export default function getUserWeightProgressDataByWeekForWebGraph({
  weightProgressData,
}) {
  if (!weightProgressData || weightProgressData.length === 0) {
    return [];
  }

  const weightProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < weightProgressData.length; i++) {
    week.push(weightProgressData[i].y);
    if (week.length === 7) {
      let weight = 0;
      for (let j = 0; j < week.length; j++) {
        weight += week[j];
      }
      const averageWeight = weight / week.length;
      const weekDate = new Date(weightProgressData[i].x);
      weightProgressDataByWeek.push({
        x: weekDate,
        y: Math.round(averageWeight * 10) / 10,
      });
      week = [];
    }
  }

  const remainingDays = week.length;
  if (remainingDays > 0) {
    let weight = 0;
    for (let j = 0; j < week.length; j++) {
      weight += week[j];
    }
    const averageWeight = weight / week.length;
    const weekDate = new Date(
      weightProgressData[weightProgressData.length - 1].x,
    );
    weightProgressDataByWeek.push({
      x: weekDate,
      y: Math.round(averageWeight * 10) / 10,
    });
  }

  return weightProgressDataByWeek;
}
