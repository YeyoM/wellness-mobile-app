import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";
export const getSavedExercises = async (userId) => {
  // from the user document, get the ids of the exercises
  // and then get the exercises from the exercises collection
  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userExercisesIds = userDocData.exercises;

    if (userExercisesIds.length === 0) {
      return [];
    }

    const exercises = [];

    for (const id of userExercisesIds) {
      const exerciseDocRef = doc(FIRESTORE, "exercises", id);
      const exerciseDocSnap = await getDoc(exerciseDocRef);
      const exerciseDocData = exerciseDocSnap.data();
      // create a new object with the id and the data
      const exercise = {
        id: id,
        ...exerciseDocData,
      };
      exercises.push(exercise);
    }

    return exercises;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting saved exercises");
  }
};
