import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getRoutinesStorage() {
  try {
    const value = await AsyncStorage.getItem("@routines");
    return value !== null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting routines from storage");
  }
}
