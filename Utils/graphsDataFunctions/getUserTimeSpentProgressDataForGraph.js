import React from "react";
import { View, Text } from "react-native";
import firebasDateToDate from "../firebasDateToDate";

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
    return [];
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

  while (currentDate <= today) {
    let time = null;
    if (currentTotalTime) {
      time = readableTimeToMinutes(currentTotalTime);
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
    } else {
      currentTotalTime = 0;
    }
  }

  return timeProgressData;
}

/** readbleTimeToMinutes
 * @param {string} time - a string representing a time in the format "MM:SS"
 * @returns {number} - the time in minutes
 * @description - This function will take a string representing a time in the format "MM:SS" and return the time in minutes
 * @example - readableTimeToMinutes("10:30") => 10.5
 * @example - readableTimeToMinutes("10:00") => 10
 */
const readableTimeToMinutes = (time) => {
  const [minutes, seconds] = time.split(":");
  return parseInt(minutes) + parseInt(seconds) / 60;
};
