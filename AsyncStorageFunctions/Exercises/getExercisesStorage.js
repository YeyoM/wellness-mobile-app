import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getExercisesStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem("@exercises");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    throw new Error("Error getting exercises from storage");
  }
}
