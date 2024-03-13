import AsyncStorage from "@react-native-async-storage/async-storage";

/** saveWorkoutsStorage
 * @param {Array} workouts - an array of the user's workouts
 * @throws {Error} - if the workouts are null
 * @throws {Error} - if the workouts are not an array
 * @throws {Error} - if there is an error saving the workouts to storage
 * @description - saves the user's workouts to storage
 * @returns {undefined}
 */
export default async function saveWorkoutsStorage(workouts) {
  if (!workouts) {
    throw new Error("Routines must not be null");
  }
  if (!Array.isArray(workouts)) {
    throw new Error("Routines must be an array");
  }
  try {
    await AsyncStorage.setItem("@workouts", JSON.stringify(routines));
  } catch (e) {
    console.log(e);
    throw new Error("Error saving workouts to storage");
  }
}
