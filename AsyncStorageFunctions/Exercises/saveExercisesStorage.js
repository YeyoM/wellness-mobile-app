import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveExercisesStorage(exercises) {
  try {
    const jsonValue = JSON.stringify(exercises);
    await AsyncStorage.setItem("@exercises", jsonValue);
  } catch (e) {
    console.log(e);
    throw new Error("Error saving exercises to storage");
  }
}
