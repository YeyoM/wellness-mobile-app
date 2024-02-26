import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveRoutinesStorage(routines) {
  try {
    await AsyncStorage.setItem("@routines", JSON.stringify(routines));
  } catch (e) {
    console.log(e);
    throw new Error("Error saving routines to storage");
  }
}
