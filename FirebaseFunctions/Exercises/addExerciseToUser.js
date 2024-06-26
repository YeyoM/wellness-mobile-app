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
 * @param {array} exercise.images - the exercise's images
 * @param {array} exercise.instructions - the exercise's instructions
 * @param {string} exercise.level - the exercise's level
 * @param {string} exercise.category - the exercise's category
 * @param {string} exercise.mechanic - the exercise's mechanic
 * @param {string} exercise.force - the exercise's force
 * @param {string} exercise.oneRepMax - the exercise's one rep max
 * @param {string} exercise.userId - the exercise's user id
 * @returns {object} - the new exercise object
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

  if (!exercise.images) {
    throw new Error("No images provided");
  }

  if (!exercise.instructions) {
    throw new Error("No instructions provided");
  }

  if (!exercise.level) {
    throw new Error("No level provided");
  }

  if (!exercise.category) {
    throw new Error("No category provided");
  }

  if (!exercise.mechanic) {
    throw new Error("No mechanic provided");
  }

  if (!exercise.force) {
    throw new Error("No force provided");
  }

  // one rep max can be 0
  if (exercise.oneRepMax === undefined) {
    throw new Error("No one rep max provided");
  }

  if (!exercise.userId) {
    throw new Error("No user id provided");
  }

  const userRef = doc(FIRESTORE, "users", userId);
  const newExerciseRef = doc(collection(FIRESTORE, "exercises"));

  try {
    const newExercise = await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const userExercisesIds = userDoc.data().exercises;
      const newExerciseId = newExerciseRef.id;
      const newExercise = {
        ...exercise,
        exerciseId: newExerciseId,
      };
      transaction.set(newExerciseRef, newExercise);
      console.log("ADDING EXERCISE SUCCEEDED TRANSACTION");
      const updatedExercises = [...userExercisesIds, newExerciseId];
      transaction.update(userRef, {
        exercises: updatedExercises,
      });
      console.log("UPDATING USER SUCCEEDED TRANSACTION");
      return newExercise;
    });
    console.log("TRANSACTION SUCCEEDED");
    return newExercise;
  } catch (err) {
    console.error("TRANSACTION FAILED: ", err);
    throw new Error(err);
  }
}
