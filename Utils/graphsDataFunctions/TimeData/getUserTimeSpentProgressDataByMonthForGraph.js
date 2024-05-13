import React from "react";
import { View, Text } from "react-native";

/** getUserTimeSpentProgressDataByMonthForGraph
 * @param {object} timeProgressData - the user's time progress data
 * @returns {array} - an array of objects that can be used to create a graph of the user's time progress over time
 * @description - This function will take in the user's time progress data and return an array of
 * objects that can be used to create a graph of the user's time progress over time.
 */
export default function getUserTimeSpentProgressDataByMonthForGraph({
  timeProgressData,
}) {
  if (!timeProgressData || timeProgressData.length === 0) {
    return [];
  }

  const timeSpentProgressDataByMonth = [];

  let currentDate = new Date(timeProgressData[0].date);
  let currentMonth = currentDate.getMonth();
  let monthTotalTimeSpent = 0;

  for (let i = 0; i < timeProgressData.length; i++) {
    const date = new Date(timeProgressData[i].date);
    if (date.getMonth() === currentMonth) {
      monthTotalTimeSpent += timeProgressData[i].value;
    } else {
      timeSpentProgressDataByMonth.push({
        month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        value: monthTotalTimeSpent || 0,
        label: (
          <View style={{ width: 40, marginLeft: 20 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
          </View>
        ),
      });
      currentMonth = date.getMonth();
      monthTotalTimeSpent = timeProgressData[i].timeSpent;
    }
  }

  if (monthTotalTimeSpent > 0) {
    timeSpentProgressDataByMonth.push({
      month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
      value: monthTotalTimeSpent || 0,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
        </View>
      ),
    });
  }

  return timeSpentProgressDataByMonth;
}
