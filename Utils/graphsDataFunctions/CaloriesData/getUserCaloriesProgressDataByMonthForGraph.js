import React from "react";
import { View, Text } from "react-native";

/** getUserCaloriesProgressDataByMonthForGraph
 * @param {object} - caloriesProgressData - an array that contains the user's calories progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's calories progress over time grouped by month
 * @description - This function will take in the user's calories progress data and return an array of
 * objects that can be used to create a graph of the user's calories progress over time grouped by month.
 * @example
 *                - caloriesProgressData = [
 *                { date: "2021-01-01", calories: 60 },
 *                { date: "2021-01-02", calories: 0 },
 *                { date: "2021-01-03", calories: 0 },
 *                ...
 *                { date: "2021-01-07", calories: 80 },
 *                { date: "2021-01-08", calories: 0 },
 *                ...
 *                { date: "2021-02-14", calories: 80 },
 *                { date: "2021-02-15", calories: 0 },
 *                ]
 *                - getUserCaloriesProgressDataByWeekForGraph({caloriesProgressData}) = [
 *                { month: "2021-01-01", value: 140 },
 *                { month: "2021-02-01", value: 80 },
 *                ]
 */
export default function getUserCaloriesProgressDataByMonthForGraph({
  caloriesProgressData,
}) {
  if (caloriesProgressData.length === 0) {
    return [];
  }
  const caloriesProgressDataByMonth = [];

  let currentDate = new Date(caloriesProgressData[0].date);
  let currentMonth = currentDate.getMonth();
  let monthCalories = 0;

  for (let i = 0; i < caloriesProgressData.length; i++) {
    const date = new Date(caloriesProgressData[i].date);
    if (date.getMonth() === currentMonth) {
      monthCalories += caloriesProgressData[i].value;
    } else {
      caloriesProgressDataByMonth.push({
        month: `${currentDate.getFullYear()}-${currentMonth + 1}-01`,
        value: monthCalories,
        label: (
          <View style={{ width: 40, marginLeft: 20 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
          </View>
        ),
      });
      currentMonth = date.getMonth();
      monthCalories = caloriesProgressData[i].value;
    }
  }

  if (monthCalories > 0) {
    caloriesProgressDataByMonth.push({
      month: `${currentDate.getFullYear()}-${currentMonth + 1}-01`,
      value: monthCalories,
      label: (
        <View style={{ width: 40, marginLeft: 20 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentMonth + 1}/${currentDate.getFullYear()}`}</Text>
        </View>
      ),
    });
  }

  return caloriesProgressDataByMonth;
}
