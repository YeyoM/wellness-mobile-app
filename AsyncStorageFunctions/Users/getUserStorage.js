import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getUserStorage
 * @param {void}
 * @returns {Promise} Promise object represents the user from storage or null if there is no user in storage
 * @throws {Error} Error getting user from storage
 * @description Get the user from async storage
 */
export default async function getUserStorage() {
  try {
    const user = await AsyncStorage.getItem("@user");
    return JSON.parse(user);
  } catch (e) {
    console.log(e);
    throw new Error("Error getting user");
  }
}
