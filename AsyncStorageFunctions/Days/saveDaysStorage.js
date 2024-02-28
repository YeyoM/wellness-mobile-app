import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * saveDaysStorage
 * @param {Array} days - The days to save to storage
 * @returns {Promise} Promise object represents the days saved to storage
 * @throws {Error} Error saving days to storage
 * @description Save the days to async storage
 */
export default async function saveDaysStorage(days) {
  if (!days) {
    throw new Error("Days must not be null");
  }
  try {
    const jsonValue = JSON.stringify(days);
    await AsyncStorage.setItem("@days", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Error saving days to storage");
  }
}
