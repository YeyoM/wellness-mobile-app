import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getUserStorage() {
  try {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (e) {
    console.log(e);
    throw new Error("Error getting user");
  }
}
