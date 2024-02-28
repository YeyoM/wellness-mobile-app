import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getRoutinesStorage
 * @param {void}
 * @returns {Promise} Promise object represents the routines from storage or null if there is no routines in storage
 * @throws {Error} Error getting routines from storage
 * @description Get the routines from async storage
 */
export default async function getRoutinesStorage() {
  try {
    const value = await AsyncStorage.getItem("@routines");
    return value !== null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting routines from storage");
  }
}
