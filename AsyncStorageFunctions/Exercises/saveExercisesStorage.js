import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * saveExercisesStorage
 * @param {Array} exercises - The exercises to save to storage
 * @returns {Promise} Promise object represents the exercises saved to storage
 * @throws {Error} Error saving exercises to storage
 * @description Save the exercises to async storage
 */
export default async function saveExercisesStorage(exercises) {
  if (!exercises) {
    throw new Error("Exercises must not be null");
  }
  try {
    const jsonValue = JSON.stringify(exercises);
    await AsyncStorage.setItem("@exercises", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Error saving exercises to storage");
  }
}
