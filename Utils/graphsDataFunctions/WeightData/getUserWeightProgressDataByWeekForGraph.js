import React from "react";
import { View, Text } from "react-native";

export default function getUserWeightProgressDataByWeekForGraph({
  weightProgressData,
}) {
  if (!weightProgressData || weightProgressData.length === 0) {
    return [];
  }

  let weightProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < weightProgressData.length; i++) {
    week.push(weightProgressData[i].value);
    if (week.length === 7) {
      let weight = 0;
      for (let j = 0; j < week.length; j++) {
        weight += week[j];
      }
      const averageWeight = weight / week.length;
      const weekDate = new Date(weightProgressData[i].date);
      weightProgressDataByWeek.push({
        week: weekDate,
        value: averageWeight,
        label: (
          <View style={{ width: 40, marginLeft: 20 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${weekDate.getMonth() + 1}/${weekDate.getDate()}`}</Text>
          </View>
        ),
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
      weightProgressData[weightProgressData.length - 1].date,
    );
    weightProgressDataByWeek.push({
      week: weekDate,
      value: averageWeight,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${weekDate.getMonth() + 1}/${weekDate.getDate()}`}</Text>
        </View>
      ),
    });
  }

  return weightProgressDataByWeek;
}
