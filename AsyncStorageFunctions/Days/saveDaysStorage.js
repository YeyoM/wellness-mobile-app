import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveDaysStorage(days) {
  try {
    const jsonValue = JSON.stringify(days);
    await AsyncStorage.setItem("@days", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Error saving days to storage");
  }
}
