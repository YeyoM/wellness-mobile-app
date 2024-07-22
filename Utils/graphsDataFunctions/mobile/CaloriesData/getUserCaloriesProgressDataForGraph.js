import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../../../firebasDateToDate";
import getUserCaloriesProgressDataByWeekForGraph from "./getUserCaloriesProgressDataByWeekForGraph";
import getUserCaloriesProgressDataByMonthForGraph from "./getUserCaloriesProgressDataByMonthForGraph";

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

  for (let i = 0; i < caloriesRecord.length; i++) {
    caloriesRecord[i].date = firebasDateToDate(caloriesRecord[i].date);
  }

  caloriesRecord.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  let caloriesProgressData = [];
  const today = new Date();
  let currentDate = caloriesRecord[0].date;
  let currentCalories = caloriesRecord[0].calories;

  let nextRecordIndex = 1;
  let nextRecordDate = null;
  if (nextRecordIndex < caloriesRecord.length) {
    nextRecordDate = caloriesRecord[nextRecordIndex].date;
  }

  let totalCalories = currentCalories;

  while (currentDate <= today) {
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
        nextRecordDate = caloriesRecord[nextRecordIndex].date;
      }
      // check if there are no more records with the same date
      while (
        nextRecordDate &&
        currentDate.getFullYear() === nextRecordDate.getFullYear() &&
        currentDate.getMonth() === nextRecordDate.getMonth() &&
        currentDate.getDate() === nextRecordDate.getDate()
      ) {
        nextRecordIndex++;
        if (nextRecordIndex < caloriesRecord.length) {
          nextRecordDate = caloriesRecord[nextRecordIndex].date;
        } else {
          nextRecordDate = null;
        }
      }
    } else {
      currentCalories = 0;
    }
    caloriesProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: currentCalories,
      dataPointText: currentCalories.toString(),
      label: (
        <View style={{ width: 20, marginLeft: 10 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}</Text>
        </View>
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const caloriesProgressDataByWeek = getUserCaloriesProgressDataByWeekForGraph({
    caloriesProgressData,
  });

  const caloriesProgressDataByMonth =
    getUserCaloriesProgressDataByMonthForGraph({
      caloriesProgressData,
    });

  return {
    caloriesProgressData,
    totalCalories: Math.round(totalCalories),
    caloriesProgressDataByWeek,
    caloriesProgressDataByMonth,
  };
}
