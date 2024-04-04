import AsyncStorage from "@react-native-async-storage/async-storage";
/** getFavoriteRoutine
 * @param {void}
 * @returns {Promise} Promise object represents the fav routine from storage or null if there is no routine before edit in storage
 * @throws {Error} Error getting fav routine from storage
 * @description - This functions returns the user's favorite routine stored in async storage
 */
export default async function getFavoriteRoutine() {
  try {
    const jsonValue = await AsyncStorage.getItem("@favoriteRoutine");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get favorite routine");
  }
}
