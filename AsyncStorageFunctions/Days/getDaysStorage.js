import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getDaysStorage
 * @param {void}
 * @returns {Promise} Promise object represents the days from storage or null if there is no days in storage
 * @throws {Error} Error getting days from storage
 * @description Get the days from async storage
 */
export default async function getDaysStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem("@days");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting days from storage");
  }
}
