import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../../firebasDateToDate";
import getUserWeightLiftedProgressDataByMonthForGraph from "./getUserWeightLiftedProgressDataForGraphByMonth";
import getUserWeightLiftedProgressDataByWeekForGraph from "./getUserWeightLiftedProgressDataForGraphByWeek";

/** getUserWeightLiftedProgressDataForGraph
 * @param {object} weightLiftedRecord - the user's weight lifted record object
 * @returns {array} - an array of objects that can be used to create a graph of the user's weight lifted progress over time
 * @description - This function will take in the user's weight lifted history (record) and return an array of
 * objects that can be used to create a graph of the user's weight lifted progress over time.
 * The function should return an array of objects, in which each object represents a weight lifted record,
 * if there is no record for a date, the weight lifted record for that date should be 0
 * The first record will have the same weight lifted as the first record.
 * If the weight lifted record is empty, the function should return an empty array.
 */
export default function getUserWeightLiftedProgressDataForGraph({
  weightLiftedRecord,
}) {
  if (weightLiftedRecord.length === 0) {
    return [];
  }
  let weightLiftedProgressData = [];
  const today = new Date();
  let currentDate = firebasDateToDate(weightLiftedRecord[0].date);
  let currentWeightLifted = weightLiftedRecord[0].weightLifted;

  let nextRecordIndex = 1;
  let nextRecordDate = null;
  if (nextRecordIndex < weightLiftedRecord.length) {
    nextRecordDate = firebasDateToDate(
      weightLiftedRecord[nextRecordIndex].date,
    );
  }

  let totalWeightLifted = currentWeightLifted;

  while (currentDate <= today) {
    weightLiftedProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: currentWeightLifted,
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
      currentWeightLifted = weightLiftedRecord[nextRecordIndex].weightLifted;
      totalWeightLifted += currentWeightLifted;
      nextRecordIndex++;
      if (nextRecordIndex < weightLiftedRecord.length) {
        nextRecordDate = firebasDateToDate(
          weightLiftedRecord[nextRecordIndex].date,
        );
      }
      // check if there are no more records with the same date
      while (
        nextRecordDate &&
        currentDate.getFullYear() === nextRecordDate.getFullYear() &&
        currentDate.getMonth() === nextRecordDate.getMonth() &&
        currentDate.getDate() === nextRecordDate.getDate()
      ) {
        nextRecordIndex++;
        if (nextRecordIndex < weightLiftedRecord.length) {
          nextRecordDate = firebasDateToDate(
            weightLiftedRecord[nextRecordIndex].date,
          );
        } else {
          nextRecordDate = null;
        }
      }
    } else {
      currentWeightLifted = 0;
    }
  }

  const weightLiftedProgressDataByWeek =
    getUserWeightLiftedProgressDataByWeekForGraph({
      weightLiftedProgressData,
    });

  const weightLiftedProgressDataByMonth =
    getUserWeightLiftedProgressDataByMonthForGraph({
      weightLiftedProgressData,
    });

  return {
    weightLiftedProgressData,
    totalWeightLifted: Math.round(totalWeightLifted),
    weightLiftedProgressDataByWeek,
    weightLiftedProgressDataByMonth,
  };
}
