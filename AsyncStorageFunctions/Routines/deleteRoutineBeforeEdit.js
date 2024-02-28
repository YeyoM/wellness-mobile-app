import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * deleteRoutineBeforeEdit
 * @param {void}
 * @returns {Promise} Promise object represents the routine before edit deleted from storage
 * @throws {Error} Error deleting routine before edit
 * @description Delete the routine before edit from async storage
 */
export default async function deleteRoutineBeforeEdit() {
  try {
    await AsyncStorage.removeItem("@routineBeforeEdit");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete routine before edit");
  }
}
