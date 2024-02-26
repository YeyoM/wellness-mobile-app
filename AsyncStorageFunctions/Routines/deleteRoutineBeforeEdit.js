import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteRoutineBeforeEdit() {
  try {
    await AsyncStorage.removeItem("@routineBeforeEdit");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete routine before edit");
  }
}
