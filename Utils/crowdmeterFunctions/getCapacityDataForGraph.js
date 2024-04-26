/**
 * @typedef {Object} CapacityData
 * @property {string} label - the hour of the day in format HH:MM PM/AM
 * @property {number} value - the capacity of the gym at that hour
 * @projection {boolean} - whether the data is projected or not
 * @description - the capacity of the gym at a given hour
 */

/**
 * @typedef {Object} CapacityDataForGraph
 * @property {string} label - the hour of the day
 * @property {number} value - the capacity in percentage of the gym at that hour
 */

/** getCapacityDataForGraph
 * @param {void}
 * @return {Array<CapacityDataForGraph>} - the capacity data for the graph
 * @throws {Error} - if there is an error with the API request
 * @description - gets the capacity data for the graph
 */

import { WELLNESS_CROWDMETER_API_KEY } from "@env";
import { WELLNESS_CROWDMETER_HISTORY_ENDPOINT } from "@env";
/** FULL_CAPACITY
 * @type {number}
 * @description - the full capacity of the gym
 */
const FULL_CAPACITY = 400;

export default async function getCapacityDataForGraph() {
  try {
    const response = await fetch(WELLNESS_CROWDMETER_HISTORY_ENDPOINT, {
      method: "GET",
      headers: {
        apikey: WELLNESS_CROWDMETER_API_KEY,
      },
    });
    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No data found");
    }

    const capacityData = data.map((capacity) => {
      return {
        label: capacity.label,
        value: (capacity.value / FULL_CAPACITY) * 100,
        labelWidth: 30,
        labelTextStyle: { color: "gray" },
      };
    });

    return capacityData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching capacity data for graph");
  }
}
