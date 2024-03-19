import React from "react";
import { View, Text } from "react-native";

/** getUserCaloriesProgressDataByWeekForGraph
 * @param {object} - caloriesProgressData - an array that contains the user's calories progress data by day
 * @returns {array} - an array of objects that can be used to create a graph of the user's calories progress over time grouped by week
 * @description - This function will take in the user's calories progress data and return an array of
 * objects that can be used to create a graph of the user's calories progress over time grouped by week.
 * @example
 *                - caloriesProgressData = [
 *                { date: "2021-01-01", calories: 60 },
 *                { date: "2021-01-02", calories: 0 },
 *                { date: "2021-01-03", calories: 0 },
 *                ...
 *                { date: "2021-01-07", calories: 80 },
 *                { date: "2021-01-08", calories: 0 },
 *                ...
 *                { date: "2021-01-14", calories: 0 },
 *                { date: "2021-01-15", calories: 0 },
 *                ]
 *                - getUserCaloriesProgressDataByWeekForGraph({caloriesProgressData}) = [
 *                { week: "2021-01-01", calories: 60 },
 *                { week: "2021-01-08", calories: 80 },
 *                { week: "2021-01-15", calories: 0 },
 *                ]
 */
export default function getUserCaloriesProgressDataByWeekForGraph({
  caloriesProgressData,
}) {
  if (caloriesProgressData.length === 0) {
    return [];
  }
  const caloriesProgressDataByWeek = [];
  let week = [];

  for (let i = 0; i < caloriesProgressData.length; i++) {
    week.push(caloriesProgressData[i]);
    if (week.length === 7) {
      let weekCalories = 0;
      for (let j = 0; j < week.length; j++) {
        weekCalories += week[j].value;
      }
      caloriesProgressDataByWeek.push({
        week: week[0].date,
        value: weekCalories,
        label: (
          <View style={{ width: 20, marginLeft: 10 }}>
            <Text
              style={{ color: "#a0a0a0", fontSize: 10 }}
            >{`${week[0].date}`}</Text>
          </View>
        ),
      });
      week = [];
    }
  }

  const remainingDays = week.length;
  if (remainingDays > 0) {
    let weekCalories = 0;
    for (let j = 0; j < week.length; j++) {
      weekCalories += week[j].value;
    }
    const weekDate = new Date(week[0].date);
    caloriesProgressDataByWeek.push({
      week: week[0].date,
      value: weekCalories,
      label: (
        <View style={{ width: 20, marginLeft: 10 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${weekDate.getMonth() + 1}/${weekDate.getDate()}`}</Text>
        </View>
      ),
    });
  }

  console.log("caloriesProgressDataByWeek", caloriesProgressDataByWeek);

  return caloriesProgressDataByWeek;
}
