import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../firebasDateToDate";
// This function will take in the user's calories history (record) and return an array of
// objects that can be used to create a graph of the user's calories progress over time.

// For example, if the user's calories history (record) is:
// [
// { date: '2021-01-01', calories: 2000 },
// { date: '2021-01-04', calories: 1800 },
// { date: '2021-02-07', calories: 1600 },
// ]
//
// The function should return an array of objects, in which each object represents a calorie record,
// if there is no record for a date, the calorie record for that date should be 0
// The first record will have the same calories as the first record.
// If the calories record is empty, the function should return an empty array.
const customLabel = (val) => {
  return (
    <View style={{ width: 20, marginLeft: 10 }}>
      <Text style={{ color: "#a0a0a0", fontSize: 10 }}>{val}</Text>
    </View>
  );
};
export default async function getUserCaloriesProgressDataForGraph({
  caloriesRecord,
}) {
  let caloriesProgressData = [];
  if (caloriesRecord.length === 0) {
    return caloriesProgressData;
  }
  const today = new Date();
  const firstRecordDate = firebasDateToDate(caloriesRecord[0].date);
  const lastRecordDate = firebasDateToDate(
    caloriesRecord[caloriesRecord.length - 1].date,
  );
  let currentDate = firstRecordDate;
  let currentCalories = caloriesRecord[0].calories;
  while (currentDate <= today) {
    caloriesProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: currentCalories,
      labelComponent: () =>
        customLabel(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`),
    });
    currentDate.setDate(currentDate.getDate() + 1);
    const record = caloriesRecord.find(
      (record) =>
        firebasDateToDate(record.date).getTime() === currentDate.getTime(),
    );
    if (record) {
      currentCalories = record.calories;
    }
  }
  return caloriesProgressData;
}
