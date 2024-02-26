import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveUserStorage(user) {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.log(e);
    throw new Error("Error saving user");
  }
}
