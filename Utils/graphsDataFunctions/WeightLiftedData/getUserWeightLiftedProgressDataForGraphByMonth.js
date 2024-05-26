import React from "react";
import { View, Text } from "react-native";

/** getUserWeightLiftedProgressDataByMonthForGraph
 * @param {object} - weightLiftedProgressData - an array that contains the user's weightLifted progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's weightLifted progress over time grouped by month
 * @description - This function will take in the user's weightLifted progress data and return an array of
 * objects that can be used to create a graph of the user's weightLifted progress over time grouped by month.
 */
export default function getUserWeightLiftedProgressDataByMonthForGraph({
  weightLiftedProgressData,
}) {
  if (weightLiftedProgressData.length === 0) {
    return [];
  }
  const weightLiftedProgressDataByMonth = [];

  let currentDate = new Date(weightLiftedProgressData[0].date);
  let currentMonth = currentDate.getMonth();
  let monthWeightLifted = 0;

  for (let i = 0; i < weightLiftedProgressData.length; i++) {
    const date = new Date(weightLiftedProgressData[i].date);
    if (date.getMonth() === currentMonth) {
      monthWeightLifted += weightLiftedProgressData[i].value;
    } else {
      weightLiftedProgressDataByMonth.push({
        month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        value: monthWeightLifted,
        dataPointText: monthWeightLifted,
        label: (
          <View style={{ width: 40, marginLeft: 20 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
          </View>
        ),
      });
      currentMonth = date.getMonth();
      monthWeightLifted = weightLiftedProgressData[i].value;
    }
  }

  if (monthWeightLifted > 0) {
    weightLiftedProgressDataByMonth.push({
      month: `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
      value: monthWeightLifted,
      dataPointText: monthWeightLifted,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
        </View>
      ),
    });
  }

  return weightLiftedProgressDataByMonth;
}
