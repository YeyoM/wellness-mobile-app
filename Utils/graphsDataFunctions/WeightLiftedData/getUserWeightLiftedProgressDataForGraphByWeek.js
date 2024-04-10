import React from "react";
import { View, Text } from "react-native";

/** getUserWeightLiftedProgressDataByWeekForGraph
 * @param {object} - weightLiftedProgressData - an array that contains the user's weightLifted progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's weightLifted progress over time grouped by week
 * @description - This function will take in the user's weightLifted progress data and return an array of
 * objects that can be used to create a graph of the user's weightLifted progress over time grouped by week.
 */
export default function getUserWeightLiftedProgressDataByWeekForGraph({
  weightLiftedProgressData,
}) {
  if (weightLiftedProgressData.length === 0) {
    return [];
  }
  const weightLiftedProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < weightLiftedProgressData.length; i++) {
    week.push(weightLiftedProgressData[i]);
    if (week.length === 7) {
      let weekWeightLifted = 0;
      for (let j = 0; j < week.length; j++) {
        weekWeightLifted += week[j].value;
      }
      weekDate = new Date(week[0].date);
      weightLiftedProgressDataByWeek.push({
        week: week[0].date,
        value: weekWeightLifted,
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
    let weekWeightLifted = 0;
    for (let j = 0; j < week.length; j++) {
      weekWeightLifted += week[j].value;
    }
    const weekDate = new Date(week[0].date);
    weightLiftedProgressDataByWeek.push({
      week: week[0].date,
      value: weekWeightLifted,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${weekDate.getMonth() + 1}/${weekDate.getDate()}`}</Text>
        </View>
      ),
    });
  }

  return weightLiftedProgressDataByWeek;
}
