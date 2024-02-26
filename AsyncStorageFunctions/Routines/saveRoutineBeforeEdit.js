import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveRoutineBeforeEdit(routine) {
  try {
    const jsonValue = JSON.stringify(routine);
    await AsyncStorage.setItem("@routineBeforeEdit", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to save routine before edit");
  }
}
