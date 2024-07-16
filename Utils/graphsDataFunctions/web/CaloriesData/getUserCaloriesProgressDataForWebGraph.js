import firebasDateToDate from "../../../firebasDateToDate";
import getUserCaloriesProgressDataByWeekForWebGraph from "./getUserCaloriesProgressDataByWeekForWebGraph";
import getUserCaloriesProgressDataByMonthForWebGraph from "./getUserCaloriesProgressDataByMonthForWebGraph";

export default function getUserCaloriesProgressDataForWebGraph({
  caloriesRecord,
}) {
  if (caloriesRecord.length === 0) {
    return [];
  }

  caloriesRecord = caloriesRecord.map((record) => {
    record.date = firebasDateToDate(record.date);
    return record;
  });

  // order the array by date
  caloriesRecord.sort((a, b) => a.date - b.date);

  for (let i = 0; i < caloriesRecord.length; i++) {
    if (!caloriesRecord[i].calories || caloriesRecord[i].calories === 1) {
      caloriesRecord.splice(i, i);
    }
  }

  let caloriesProgressData = [];
  let maxCaloriesDaily = 0;
  let totalCalories = 0;

  let firstDate = caloriesRecord[0].date;
  let lastDate = new Date();

  let numberOfDaysBetweenDates = getNumberOfDaysBetweenDates(
    firstDate,
    lastDate,
  );

  let caloriesData = new Map();

  caloriesRecord.forEach((record) => {
    totalCalories += record.calories;

    // check if the date is already in the map and add the calories to the map
    let formattedDate = getDateString(record.date);

    if (caloriesData.has(formattedDate)) {
      caloriesData.set(
        formattedDate,
        caloriesData.get(formattedDate) + record.calories,
      );
    } else {
      caloriesData.set(formattedDate, record.calories);
    }
  });

  for (let i = 0; i <= numberOfDaysBetweenDates; i++) {
    let date = new Date(firstDate);
    date.setDate(date.getDate() + i);

    let formattedDate = getDateString(date);

    if (caloriesData.has(formattedDate)) {
      caloriesProgressData.push({
        x: date,
        y: Math.round(caloriesData.get(formattedDate)),
      });

      if (caloriesData.get(formattedDate) > maxCaloriesDaily) {
        maxCaloriesDaily = caloriesData.get(formattedDate);
      }
    } else {
      caloriesProgressData.push({
        x: date,
        y: 0,
      });
    }
  }

  let { caloriesProgressDataByWeek, maxCaloriesWeekly } =
    getUserCaloriesProgressDataByWeekForWebGraph({
      caloriesProgressData,
    });

  let { caloriesProgressDataByMonth, maxCaloriesMonthly } =
    getUserCaloriesProgressDataByMonthForWebGraph({
      caloriesProgressData,
    });

  maxCaloriesDaily = maxCaloriesDaily + maxCaloriesDaily * 0.1;

  return {
    caloriesProgressData,
    caloriesProgressDataByWeek,
    caloriesProgressDataByMonth,
    totalCalories: Math.round(totalCalories),
    maxCaloriesDaily,
    maxCaloriesWeekly,
    maxCaloriesMonthly,
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
