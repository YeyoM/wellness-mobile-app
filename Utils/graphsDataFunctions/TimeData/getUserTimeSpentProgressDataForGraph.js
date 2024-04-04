import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../../firebasDateToDate";

import readableTimeToMinutes from "../../readableTimeToMinutes";
import minutesToReadableTime from "../../minutesToReadableTime";

import getUserTimeSpentProgressDataByWeekForGraph from "./getUserTimeSpentProgressDataByWeekForGraph";
import getUserTimeSpentProgressDataByMonthForGraph from "./getUserTimeSpentProgressDataByMonthForGraph";

/** getUserTimeSpentProgressDataForGraph
 * @param {object} timeRecord - the user's time record object
 * @returns {array} - an array of objects that can be used to create a graph of the user's time progress over time
 * @description - This function will take in the user's time history (record) and return an array of
 * objects that can be used to create a graph of the user's time progress over time.
 * The function should return an array of objects, in which each object represents a time record,
 * if there is no record for a date, the time record for that date should be 0
 * The first record will have the same time as the first record.
 * If the time record is empty, the function should return an empty array.
 */
export default function getUserTimeSpentProgressDataForGraph({ timeRecord }) {
  if (!timeRecord || timeRecord.length === 0) {
    return {
      timeProgressData: [],
      totalTime: "0:00",
      timeProgressDataByWeek: [],
      timeProgressDataByMonth: [],
    };
  }

  let timeProgressData = [];
  const today = new Date();
  let currentDate = firebasDateToDate(timeRecord[0].date);
  let currentTotalTime = timeRecord[0].time;

  let nextRecordIndex = 1;
  let nextRecordDate = null;
  if (nextRecordIndex < timeRecord.length) {
    nextRecordDate = firebasDateToDate(timeRecord[nextRecordIndex].date);
  }

  let totalTime = 0;

  while (currentDate <= today) {
    let time = null;
    if (currentTotalTime) {
      time = readableTimeToMinutes(currentTotalTime);
      totalTime += time;
    } else {
      time = 0;
    }

    timeProgressData.push({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      value: time,
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
      currentTotalTime = timeRecord[nextRecordIndex].time;
      nextRecordIndex++;
      if (nextRecordIndex < timeRecord.length) {
        nextRecordDate = firebasDateToDate(timeRecord[nextRecordIndex].date);
      }
      // check if there are no more records with the same date
      while (
        nextRecordDate &&
        currentDate.getFullYear() === nextRecordDate.getFullYear() &&
        currentDate.getMonth() === nextRecordDate.getMonth() &&
        currentDate.getDate() === nextRecordDate.getDate()
      ) {
        nextRecordIndex++;
        if (nextRecordIndex < timeRecord.length) {
          nextRecordDate = firebasDateToDate(timeRecord[nextRecordIndex].date);
        } else {
          nextRecordDate = null;
        }
      }
    } else {
      currentTotalTime = 0;
    }
  }

  const timeProgressDataByWeek = getUserTimeSpentProgressDataByWeekForGraph({
    timeProgressData,
  });

  const timeProgressDataByMonth = getUserTimeSpentProgressDataByMonthForGraph({
    timeProgressData,
  });

  const readableTotalTime = minutesToReadableTime(totalTime);
  return {
    timeProgressData,
    totalTime: readableTotalTime,
    timeProgressDataByWeek,
    timeProgressDataByMonth,
  };
}
