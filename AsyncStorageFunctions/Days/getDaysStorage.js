import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getDaysStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem("@days");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting days from storage");
  }
}
