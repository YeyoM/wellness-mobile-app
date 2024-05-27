/**
 * @typedef {object} capacity
 * @property {string} label - the label
 * @property {number} value - the current capacity or emptyness of the gym
 */

/**
 * @typedef {object} currentCapacity
 * @property {number} percentage - the current percentage of the gym
 * @property {number} capacity - the current capacity of the gym
 * @property {date} timestamp - the timestamp of the current capacity
 */

/** getCurrentCapacity
 * @param {void}
 * @return {currentCapacity} - the current capacity of the gym
 * @throws {Error} - if there is an error with the API request
 * @description - gets the current capacity of the gym
 */

import { EXPO_PUBLIC_WELLNESS_CROWDMETER_API_KEY } from "@env";
import { EXPO_PUBLIC_WELLNESS_CROWDMETER_LIVE_ENDPOINT } from "@env";

export default async function getCurrentCapacity() {
  const response = await fetch(EXPO_PUBLIC_WELLNESS_CROWDMETER_LIVE_ENDPOINT, {
    method: "GET",
    headers: {
      apikey: EXPO_PUBLIC_WELLNESS_CROWDMETER_API_KEY,
    },
  });
  const data = await response.json();

  if (!data || (await data.length) === 0) {
    throw new Error("No data found");
  }

  const capacity = data[0];
  const emptyness = data[1];

  if (!capacity || !emptyness) {
    throw new Error("Invalid data");
  }

  if (!capacity.value || !emptyness.value) {
    throw new Error("Invalid data");
  }

  if (capacity.value < 0 || emptyness.value < 0) {
    throw new Error("Invalid data");
  }

  const percentage = capacity.value / (capacity.value + emptyness.value);

  return {
    percentage: percentage,
    capacity: capacity.value,
    timestamp: new Date(),
  };
}
