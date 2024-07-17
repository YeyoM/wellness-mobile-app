import firebasDateToDate from "../../../firebasDateToDate";

import readableTimeToMinutes from "../../../readableTimeToMinutes";
import minutesToReadableTime from "../../../minutesToReadableTime";

import getUserTimeSpentProgressDataByWeekForWebGraph from "./getUserTimeSpentProgressDataByWeekForWebGraph";
import getUserTimeSpentProgressDataByMonthForWebGraph from "./getUserTimeSpentProgressDataByMonthForWebGraph";

export default function getUserTimeSpentProgressDataForWebGraph({
  timeRecord,
}) {
  if (!timeRecord || timeRecord.length === 0) {
    return {
      timeProgressData: [],
      timeProgressDataByWeek: [],
      timeProgressDataByMonth: [],
      totalTime: "0:00",
      maxTimeSpentDaily: 0,
      maxTimeSpentWeekly: 0,
      maxTimeSpentMonthly: 0,
    };
  }

  timeRecord = timeRecord.map((record) => {
    record.date = firebasDateToDate(record.date);
    return record;
  });

  // order the array by date
  timeRecord.sort((a, b) => a.date - b.date);

  for (let i = 0; i < timeRecord.length; i++) {
    if (!timeRecord[i].timeSpent || timeRecord[i].timeSpent === "0:00") {
      timeRecord.splice(i, i);
    }
  }

  let timeProgressData = [];
  let maxTimeSpentDaily = 0;
  let totalTime = 0;

  let firstDate = timeRecord[0].date;
  let lastDate = new Date();

  let numberOfDaysBetweenDates = getNumberOfDaysBetweenDates(
    firstDate,
    lastDate,
  );

  let timeData = new Map();

  console.log("timeRecord", timeRecord);

  timeRecord.forEach((record) => {
    totalTime += readableTimeToMinutes(record.time);

    // check if the date is already in the map and add the time spent to the map
    let formattedDate = getDateString(record.date);

    if (timeData.has(formattedDate)) {
      timeData.set(
        formattedDate,
        timeData.get(formattedDate) + readableTimeToMinutes(record.time),
      );
    } else {
      timeData.set(formattedDate, readableTimeToMinutes(record.time));
    }
  });

  for (let i = 0; i <= numberOfDaysBetweenDates; i++) {
    let date = new Date(firstDate);
    date.setDate(date.getDate() + i);

    let formattedDate = getDateString(date);

    if (timeData.has(formattedDate)) {
      timeProgressData.push({
        x: date,
        y: Math.round(timeData.get(formattedDate)),
      });

      if (timeData.get(formattedDate) > maxTimeSpentDaily) {
        maxTimeSpentDaily = timeData.get(formattedDate);
      }
    } else {
      timeProgressData.push({
        x: date,
        y: 0,
      });
    }
  }

  console.log("timeProgressData", timeProgressData);

  const { timeSpentProgressDataByWeek, maxTimeSpentWeekly } =
    getUserTimeSpentProgressDataByWeekForWebGraph({
      timeProgressData,
    });

  const { timeSpentProgressDataByMonth, maxTimeSpentMonthly } =
    getUserTimeSpentProgressDataByMonthForWebGraph({
      timeProgressData,
    });

  console.log("timeProgressDataByMonth", timeSpentProgressDataByMonth);

  return {
    timeProgressData,
    timeProgressDataByWeek: timeSpentProgressDataByWeek,
    timeProgressDataByMonth: timeSpentProgressDataByMonth,
    totalTime,
    maxTimeSpentDaily,
    maxTimeSpentWeekly,
    maxTimeSpentMonthly,
  };
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getNumberOfDaysBetweenDates(date1, date2) {
  return Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
}

function getDateString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getDateFromDateString(dateString) {
  let dateParts = dateString.split("-");
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
}
