import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getExercisesStorage
 * @param {void}
 * @returns {Promise} Promise object represents the exercises from storage or null if there is no exercises in storage
 * @throws {Error} Error getting exercises from storage
 * @description Get the exercises from async storage
 */
export default async function getExercisesStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem("@exercises");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting exercises from storage");
  }
}
