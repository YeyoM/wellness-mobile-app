import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../firebasDateToDate";

import getUserCaloriesProgressDataByWeekForGraph from "./CaloriesData/getUserCaloriesProgressDataByWeekForGraph";

/** getUserCaloriesProgressDataForGraph
 * @param {object} caloriesRecord - the user's calories record object
 * @returns {array} - an array of objects that can be used to create a graph of the user's calories progress over time
 * @description - This function will take in the user's calories history (record) and return an array of
 * objects that can be used to create a graph of the user's calories progress over time.
 * The function should return an array of objects, in which each object represents a calories record,
 * if there is no record for a date, the calories record for that date should be 0
 * The first record will have the same calories as the first record.
 * If the calories record is empty, the function should return an empty array.
 */
export default function getUserCaloriesProgressDataForGraph({
  caloriesRecord,
}) {
  if (caloriesRecord.length === 0) {
    return [];
  }
  let caloriesProgressData = [];
  const today = new Date();
  let currentDate = firebasDateToDate(caloriesRecord[0].date);
  let currentCalories = caloriesRecord[0].calories;

  let nextRecordIndex = 1;
  let nextRecordDate = null;
  if (nextRecordIndex < caloriesRecord.length) {
    nextRecordDate = firebasDateToDate(caloriesRecord[nextRecordIndex].date);
  }

  let totalCalories = currentCalories;

  while (currentDate <= today) {
    caloriesProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: currentCalories,
      label: (
        <View style={{ width: 20, marginLeft: 10 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}</Text>
        </View>
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
    if (
      nextRecordDate &&
      currentDate.getFullYear() === nextRecordDate.getFullYear() &&
      currentDate.getMonth() === nextRecordDate.getMonth() &&
      currentDate.getDate() === nextRecordDate.getDate()
    ) {
      currentCalories = caloriesRecord[nextRecordIndex].calories;
      totalCalories += currentCalories;
      nextRecordIndex++;
      if (nextRecordIndex < caloriesRecord.length) {
        nextRecordDate = firebasDateToDate(
          caloriesRecord[nextRecordIndex].date,
        );
      }
    } else {
      currentCalories = 0;
    }
  }

  const caloriesProgressDataByWeek = getUserCaloriesProgressDataByWeekForGraph({
    caloriesProgressData,
  });

  return { caloriesProgressData, totalCalories: Math.round(totalCalories) };
}
