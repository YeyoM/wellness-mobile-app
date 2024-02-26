import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getRoutineBeforeEdit() {
  try {
    const jsonValue = await AsyncStorage.getItem("@routineBeforeEdit");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get routine before edit");
  }
}
