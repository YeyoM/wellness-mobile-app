import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * getSavedExercises
 * @param {string} userId - the user's id
 * @returns {array} - the user's saved exercises
 * @throws {Error} - if there is an error getting the saved exercises
 * @description - gets the user's saved exercises from the database
 */
export const getSavedExercises = async (userId) => {
  if (!userId) {
    throw new Error("No user id provided");
  }

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
