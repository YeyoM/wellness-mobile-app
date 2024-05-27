import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../../firebasDateToDate";

import getUserWeightProgressDataByWeekForGraph from "./getUserWeightProgressDataByWeekForGraph";
import getUserWeightProgressDataByMonthForGraph from "./getUserWeightProgressDataByMonthForGraph";

/** getUserWeightProgressDataForGraph
 * @param {object} weightRecord - the user's weight record object
 * @returns {array} - an array of objects that can be used to create a graph of the user's weight progress over time
 * @description - This function will take in the user's weight history (record) and return an array of
 * objects that can be used to create a graph of the user's weight progress over time.
 * The function should return an array of objects, in which each object represents a weight record,
 * if there is no record for a date, the weight record for that date should be the same as the last record.
 * The first record will have the same weight as the first record.
 * If the weight record is empty, the function should return an empty array.
 */
export default function getUserWeightProgressDataForGraph({ weightRecord }) {
  if (weightRecord.length === 0) {
    return [];
  }

  const today = new Date();
  const firstDate = firebasDateToDate(weightRecord[0].date);
  const lastDate = firebasDateToDate(
    weightRecord[weightRecord.length - 1].date,
  );
  const weightProgressData = [];
  let currentWeight = weightRecord[0].weight;
  const currentDate = firstDate;
  while (currentDate <= today) {
    weightProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: currentWeight,
      dataPointText: currentWeight,
      label: (
        <View style={{ width: 20, marginLeft: 10 }}>
          <Text
            style={{ color: "#a0a0a0", fontSize: 10 }}
          >{`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}</Text>
        </View>
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate > lastDate) {
      currentWeight = weightRecord[weightRecord.length - 1].weight;
    } else {
      for (let i = 0; i < weightRecord.length; i++) {
        let currentDateCompare = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        let date_ = firebasDateToDate(weightRecord[i].date);
        let compareDate = `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`;
        if (currentDateCompare === compareDate) {
          currentWeight = weightRecord[i].weight;
        }
      }
    }
  }

  const weightProgressDataByWeekForGraph =
    getUserWeightProgressDataByWeekForGraph({
      weightProgressData,
    });

  const weightProgressDataByMonthForGraph =
    getUserWeightProgressDataByMonthForGraph({
      weightProgressData,
    });

  currentWeight = weightRecord[weightRecord.length - 1].weight;

  return {
    weightProgressData,
    weightProgressDataByWeekForGraph,
    weightProgressDataByMonthForGraph,
    currentWeight,
  };
}
