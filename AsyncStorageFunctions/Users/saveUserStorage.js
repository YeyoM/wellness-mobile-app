import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * saveUserStorage
 * @param {object} User object
 * @returns {Promise} Promise object represents the user saved in storage
 * @throws {Error} Error saving user to storage
 * @description Save the user to async storage
 */
export default async function saveUserStorage(user) {
  if (!user) {
    throw new Error("User is required");
  }
  try {
    await AsyncStorage.setItem("@user", JSON.stringify(user));
  } catch (e) {
    console.log(e);
    throw new Error("Error saving user");
  }
}
