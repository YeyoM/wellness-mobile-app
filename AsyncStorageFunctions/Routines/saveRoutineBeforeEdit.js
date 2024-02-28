import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * saveRoutineBeforeEdit
 * @param {object} routine - The routine to be saved before edit
 * @returns {Promise} Promise object represents the routine before edit saved to storage
 * @throws {Error} Error saving routine before edit
 * @description Save the routine before edit to async storage
 */
export default async function saveRoutineBeforeEdit(routine) {
  if (routine === null) {
    throw new Error("Routine must not be null");
  }
  if (typeof routine !== "object") {
    throw new Error("Routine must be an object");
  }
  try {
    const jsonValue = JSON.stringify(routine);
    await AsyncStorage.setItem("@routineBeforeEdit", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to save routine before edit");
  }
}
