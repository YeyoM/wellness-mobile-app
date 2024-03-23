import React from "react";
import { View, Text } from "react-native";

/** getUserTimeSpentProgressDataByWeekForGraph
 * @param {object} timeProgressData - the user's time progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's time progress over time grouped by week
 * @description - This function will take in the user's time progress data and return an array of
 * objects that can be used to create a graph of the user's time progress over time grouped by week.
 */
export default function getUserTimeSpentProgressDataByWeekForGraph({
  timeProgressData,
}) {
  if (!timeProgressData || timeProgressData.length === 0) {
    return [];
  }

  let timeSpentProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < timeProgressData.length; i++) {
    week.push(timeProgressData[i]);
    if (week.length === 7) {
      let weekMinutes = 0;
      for (let j = 0; j < week.length; j++) {
        weekMinutes += week[j].value;
      }
      const weekDate = new Date(week[0].date);
      timeSpentProgressDataByWeek.push({
        week: week[0].date,
        value: weekMinutes,
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
    let weekMinutes = 0;
    for (let j = 0; j < week.length; j++) {
      weekMinutes += week[j].value;
    }
    const weekDate = new Date(week[0].date);
    timeSpentProgressDataByWeek.push({
      week: week[0].date,
      value: weekMinutes,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text style={{ color: "#a0a0a0", fontSize: 10 }}>
            {`${weekDate.getMonth() + 1}/${weekDate.getDate()}`}
          </Text>
        </View>
      ),
    });
  }

  return timeSpentProgressDataByWeek;
}
