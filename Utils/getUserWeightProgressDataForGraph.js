// This function will take in the user's weight history (record) and return an array of
// objects that can be used to create a graph of the user's weight progress over time.

// For example, if the user's weight history (record) is:
// [
// { date: '2021-01-01', weight: 200 },
// { date: '2021-01-04', weight: 199 },
// { date: '2021-02-07', weight: 198 },
// ]
//
// The function should return an array of objects, in which each object represents a weight record,
// if there is no record for a date, the weight will be the same as the previous record.
// The first record will have the same weight as the first record. The last record will have the
// date of today and the same weight as the last record. If the weight record is empty, the function
// should return an empty array.

// Suppose today is '2021-02-08', the function should return:
// [
// { date: '2021-01-01', weight: 200 },
// { date: '2021-01-02', weight: 200 },
// { date: '2021-01-03', weight: 200 },
// { date: '2021-01-04', weight: 199 },
// { date: '2021-01-05', weight: 199 },
// { date: '2021-01-06', weight: 199 },
// { date: '2021-01-07', weight: 199 },
// ...
// { date: '2021-02-07', weight: 198 },
// { date: '2021-02-08', weight: 198 },
// ]
// The date property of each object of the input array is a Date object, and the weight property is a number.
// The date property of each object of the output array is a string in the format 'YYYY-MM-DD', and the weight property is a number.
export default function getUserWeightProgressDataForGraph({ weightRecord }) {}
