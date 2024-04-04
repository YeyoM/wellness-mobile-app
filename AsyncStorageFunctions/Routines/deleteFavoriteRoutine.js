import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * deleteFavoriteRoutine
 * @param {void}
 * @returns {Promise} Promise object represents the routine before edit deleted from storage
 * @throws {Error} Error deleting fav routine
 * @description Delete the fav routine from async storage
 */
export default async function deleteFavoriteRoutine() {
  try {
    await AsyncStorage.removeItem("@favoriteRoutine");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete favorite routine");
  }
}
