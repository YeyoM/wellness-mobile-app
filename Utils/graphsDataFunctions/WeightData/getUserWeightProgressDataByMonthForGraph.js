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
        month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        value: Math.round(averageWeight),
        label: (
          <View style={{ width: 40, marginLeft: 20 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
          </View>
        ),
      });
      currentMonth = date.getMonth();
      currentMonthWeightData = weightProgressData[i].value;
      currentMonthDayCount = 1;
    }
  }

  if (currentMonthWeightData > 0) {
    const averageWeight = currentMonthWeightData / currentMonthDayCount;
    weightProgressDataByMonth.push({
      month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
      value: Math.round(averageWeight),
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
        </View>
      ),
    });
  }

  return weightProgressDataByMonth;
}
