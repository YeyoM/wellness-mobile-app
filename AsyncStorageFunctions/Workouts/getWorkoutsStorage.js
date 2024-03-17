import AsyncStorage from "@react-native-async-storage/async-storage";

/** getWorkoutsStorage
 * @returns {Array} - an array of the user's workouts
 * @throws {Error} - if there is an error getting the workouts from storage
 * @description - gets the user's workouts from storage and returns them as an array
 */
export default async function getWorkoutsStorage() {
  try {
    const value = await AsyncStorage.getItem("@workouts");
    return value !== null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting workouts from storage");
  }
}
