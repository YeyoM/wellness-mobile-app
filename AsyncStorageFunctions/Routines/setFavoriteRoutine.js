import AsyncStorage from "@react-native-async-storage/async-storage";
/** setFavoriteRoutine
 * @param {Object} routine - routine object
 * @throws {Error} - if routine is not an Object
 * @description - This function sets a routine as a favorite routine inside
 * the asyncstorage
 */
export default function setFavoriteRoutine(routine) {
  if (routine === null) {
    throw new Error("Routine must not be null");
  }

  if (typeof routine !== "object") {
    throw new Error("Routine must be an object");
  }

  try {
    const jsonValue = JSON.stringify(routine);
    AsyncStorage.setItem("@favoriteRoutine", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to save favorite routine");
  }
}
