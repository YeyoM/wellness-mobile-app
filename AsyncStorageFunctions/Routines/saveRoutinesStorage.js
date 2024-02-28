import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * saveRoutinesStorage
 * @param {Array} routines
 * @returns {Promise} Promise object represents the routines saved to storage
 * @throws {Error} Error saving routines to storage
 * @description Save the routines to async storage
 */
export default async function saveRoutinesStorage(routines) {
  if (!routines) {
    throw new Error("Routines must not be null");
  }
  if (!Array.isArray(routines)) {
    throw new Error("Routines must be an array");
  }
  try {
    await AsyncStorage.setItem("@routines", JSON.stringify(routines));
  } catch (e) {
    console.log(e);
    throw new Error("Error saving routines to storage");
  }
}
