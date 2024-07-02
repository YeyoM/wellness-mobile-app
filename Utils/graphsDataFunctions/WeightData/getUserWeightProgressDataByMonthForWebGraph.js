import React from "react";
import { View, Text } from "react-native";

export default function getUserWeightProgressDataByMonthForGraph({
  weightProgressData,
}) {
  if (!weightProgressData || weightProgressData.length === 0) {
    return [];
  }

  const weightProgressDataByMonth = [];

  let currentDate = new Date(weightProgressData[0].date);
  let currentMonth = currentDate.getMonth();
  let currentMonthWeightData = 0;
  let currentMonthDayCount = 0;

  for (let i = 0; i < weightProgressData.length; i++) {
    const date = new Date(weightProgressData[i].date);
    if (date.getMonth() === currentMonth) {
      if (weightProgressData[i].value > 0) {
        currentMonthDayCount++;
      }
      currentMonthWeightData += weightProgressData[i].value;
    } else {
      const averageWeight = currentMonthWeightData / currentMonthDayCount;
      weightProgressDataByMonth.push({
        y: currentDate,
        x: Math.round(averageWeight) || 0,
      });
      currentMonth = date.getMonth();
      currentMonthWeightData = weightProgressData[i].value;
      currentMonthDayCount = 1;
    }
  }

  if (currentMonthWeightData > 0) {
    const averageWeight = currentMonthWeightData / currentMonthDayCount;
    weightProgressDataByMonth.push({
      y: currentDate,
      x: Math.round(averageWeight) || 0,
    });
  }

  return weightProgressDataByMonth;
}
