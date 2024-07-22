import firebasDateToDate from "../../../firebasDateToDate";
import getUserWeightLiftedProgressDataByWeekForWebGraph from "./getUserWeightLiftedProgressDataByWeekForWebGraph";
import getUserWeightLiftedProgressDataByMonthForWebGraph from "./getUserWeightLiftedProgressDataByMonthForWebGraph";

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
export default function getUserWeightLiftedProgressDataForWebGraph({
  weightLiftedRecord,
}) {
  if (weightLiftedRecord.length === 0) {
    return [];
  }

  weightLiftedRecord = weightLiftedRecord.map((record) => {
    record.date = firebasDateToDate(record.date);
    return record;
  });

  // order the array by date
  weightLiftedRecord.sort((a, b) => a.date - b.date);

  for (let i = 0; i < weightLiftedRecord.length; i++) {
    if (
      !weightLiftedRecord[i].weightLifted ||
      weightLiftedRecord[i].weightLifted === 1
    ) {
      weightLiftedRecord.splice(i, i);
    }
  }

  let weightLiftedProgressData = [];
  let maxWeightLiftedDaily = 0;
  let totalWeightLifted = 0;

  let firstDate = weightLiftedRecord[0].date;
  let lastDate = new Date();

  let numberOfDaysBetweenDates = getNumberOfDaysBetweenDates(
    firstDate,
    lastDate,
  );

  let weightLiftedData = new Map();

  weightLiftedRecord.forEach((record) => {
    totalWeightLifted += record.weightLifted;

    // check if the date is already in the map and add the weight lifted to the map
    let formattedDate = getDateString(record.date);

    if (weightLiftedData.has(formattedDate)) {
      weightLiftedData.set(
        formattedDate,
        weightLiftedData.get(formattedDate) + record.weightLifted,
      );
    } else {
      weightLiftedData.set(formattedDate, record.weightLifted);
    }
  });

  for (let i = 0; i <= numberOfDaysBetweenDates; i++) {
    let date = new Date(firstDate);
    date.setDate(date.getDate() + i);

    let formattedDate = getDateString(date);

    if (weightLiftedData.has(formattedDate)) {
      weightLiftedProgressData.push({
        x: date.toISOString(),
        y: weightLiftedData.get(formattedDate),
      });

      if (weightLiftedData.get(formattedDate) > maxWeightLiftedDaily) {
        maxWeightLiftedDaily = weightLiftedData.get(formattedDate);
      }
    } else {
      weightLiftedProgressData.push({
        x: date.toISOString(),
        y: 0,
      });
    }
  }

  let { weightLiftedProgressDataByWeek, maxWeightLiftedWeekly } =
    getUserWeightLiftedProgressDataByWeekForWebGraph({
      weightLiftedProgressData: weightLiftedProgressData,
    });

  let { weightLiftedProgressDataByMonth, maxWeightLiftedMonthly } =
    getUserWeightLiftedProgressDataByMonthForWebGraph({
      weightLiftedProgressData: weightLiftedProgressData,
    });

  return {
    weightLiftedProgressData: weightLiftedProgressData,
    weightLiftedProgressDataByWeek: weightLiftedProgressDataByWeek,
    weightLiftedProgressDataByMonth: weightLiftedProgressDataByMonth,
    totalWeightLifted: Math.round(totalWeightLifted),
    maxWeightLiftedDaily: maxWeightLiftedDaily + maxWeightLiftedDaily * 0.2,
    maxWeightLiftedWeekly: maxWeightLiftedWeekly + maxWeightLiftedWeekly * 0.2,
    maxWeightLiftedMonthly:
      maxWeightLiftedMonthly + maxWeightLiftedMonthly * 0.2,
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
