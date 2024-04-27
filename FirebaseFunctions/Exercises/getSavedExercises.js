import { FIRESTORE } from "../../firebaseConfig.js";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

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
    const exercisesCollectionRef = collection(FIRESTORE, "exercises");

    if (!exercisesCollectionRef) {
      throw new Error("Error getting collection references");
    }

    const exerciseQuery = query(
      exercisesCollectionRef,
      where("__name__", "in", userExercisesIds),
    );
    const exerciseQuerySnapshot = await getDocs(exerciseQuery);

    exerciseQuerySnapshot.forEach((doc) => {
      const exerciseDocData = doc.data();
      const exercise = {
        id: doc.id,
        ...exerciseDocData,
      };
      exercises.push(exercise);
    });

    console.log("GET SAVED EXERCISES: AFTER GETTING EXERCISES");

    return exercises;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting saved exercises");
  }
};
