import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
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
export const addExerciseToUser = async (userId, exercise) => {
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

  try {
    const userDoc = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDoc);

    const userDocData = userDocSnap.data();
    const userExercisesIds = userDocData.exercises;

    // get all the exercises from the exercises collection
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

    console.log("AFTER GETTING EXERCISES");

    // check if the exercise is already in the user's exercises
    console.log(exercise);
    const exists = exercises.find(
      (ex) => ex.exerciseName === exercise.exerciseName,
    );

    if (exists) {
      console.log("Exercise already saved");
      throw new Error("Exercise already saved");
    }

    console.log("AFTER CHECKING IF EXERCISE EXISTS");

    // if it is not, create a new document in the exercises collection
    // and add the id to the user's exercises array

    const newExerciseRef = await addDoc(collection(FIRESTORE, "exercises"), {
      ...exercise,
    });

    const newExerciseId = newExerciseRef.id;

    console.log("AFTER CREATING NEW EXERCISE");

    // update the user's exercises array
    // add the new exercise's id to the array
    // and update the user's document

    const updatedExercises = [...userExercisesIds, newExerciseId];

    await updateDoc(userDoc, {
      exercises: updatedExercises,
    });

    console.log("AFTER UPDATING USER'S EXERCISES");

    // add the new exercise to the exercises array and return that array
    const newExercise = {
      id: newExerciseId,
      ...exercise,
    };
    exercises.push(newExercise);

    console.log("AFTER ADDING NEW EXERCISE TO EXERCISES");
    console.log(exercises);

    return exercises;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
