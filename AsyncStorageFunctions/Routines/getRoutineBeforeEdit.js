import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getRoutineBeforeEdit
 * @param {void}
 * @returns {Promise} Promise object represents the routine before edit from storage or null if there is no routine before edit in storage
 * @throws {Error} Error getting routine before edit from storage
 * @description Get the routine before edit from async storage
 */
export default async function getRoutineBeforeEdit() {
  try {
    const jsonValue = await AsyncStorage.getItem("@routineBeforeEdit");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get routine before edit");
  }
}
