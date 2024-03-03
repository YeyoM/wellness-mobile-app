import { runTransaction, doc, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * addExerciseToUser
 * @param {string} userId - the user's id
 * @param {object} exercise - the exercise object
 * @param {string} exercise.exerciseName - the exercise's name
 * @param {number} exercise.defaultNumberOfSets - the exercise's default number of sets
 * @param {number} exercise.defaultNumberOfReps - the exercise's default number of reps
 * @param {number} exercise.defaultWeight - the exercise's default weight
 * @param {string} exercise.defaultWeightSystem - the exercise's default weight system
 * @param {number} exercise.defaultRestTime - the exercise's default rest time
 * @param {string} exercise.muscle - the exercise's muscle
 * @param {string} exercise.equipment - the exercise's equipment
 * @param {string} exercise.type - the exercise's type
 * @param {string} exercise.userId - the exercise's user id
 * @returns {array} - the updated exercises array
 * @throws {Error} - if the exercise is already in the user's exercises or if the exercise object is not valid
 */
export default async function addExerciseToUser(userId, exercise) {
  if (!userId) {
    throw new Error("No user id provided");
  }

  if (!exercise) {
    throw new Error("No exercise provided");
  }

  if (!exercise.exerciseName) {
    throw new Error("No exercise name provided");
  }

  if (!exercise.defaultNumberOfSets) {
    throw new Error("No default number of sets provided");
  }

  if (!exercise.defaultNumberOfReps) {
    throw new Error("No default number of reps provided");
  }

  if (!exercise.defaultWeight) {
    throw new Error("No default weight provided");
  }

  if (!exercise.defaultWeightSystem) {
    throw new Error("No default weight system provided");
  }

  if (!exercise.defaultRestTime) {
    throw new Error("No default rest time provided");
  }

  if (!exercise.muscle) {
    throw new Error("No muscle provided");
  }

  if (!exercise.equipment) {
    throw new Error("No equipment provided");
  }

  if (!exercise.type) {
    throw new Error("No type provided");
  }

  if (!exercise.userId) {
    throw new Error("No user id provided");
  }

  const userRef = doc(FIRESTORE, "users", userId);
  const newExerciseRef = doc(collection(FIRESTORE, "exercises"));

  try {
    const newExercises = await runTransaction(
      FIRESTORE,
      async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const userExercisesIds = userDoc.data().exercises;
        const exercises = [];
        for (const id of userExercisesIds) {
          const exerciseDocRef = doc(FIRESTORE, "exercises", id);
          const exerciseDoc = await transaction.get(exerciseDocRef);
          const exerciseData = exerciseDoc.data();
          const userExercise = {
            id: id,
            ...exerciseData,
          };
          if (exercise.exerciseName === userExercise.exerciseName) {
            throw new Error("Exercise already saved");
          }
          exercises.push(userExercise);
        }
        console.log("GETTING EXERCISES SUCCEEDED TRANSACTION");
        const newExercise = {
          ...exercise,
        };
        const newExerciseId = newExerciseRef.id;
        transaction.set(newExerciseRef, newExercise);
        console.log("ADDING EXERCISE SUCCEEDED TRANSACTION");
        const updatedExercises = [...userExercisesIds, newExerciseId];
        transaction.update(userRef, {
          exercises: updatedExercises,
        });
        console.log("UPDATING USER SUCCEEDED TRANSACTION");
        exercises.push(newExercise);
        console.log(exercises);
        return exercises;
      },
    );
    console.log("TRANSACTION SUCCEEDED");
    console.log(newExercises);
    return newExercises;
  } catch (err) {
    console.error("TRANSACTION FAILED: ", err);
    throw new Error(err);
  }
}
