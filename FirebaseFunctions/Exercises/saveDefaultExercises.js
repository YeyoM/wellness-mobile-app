import { runTransaction, doc, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

const defaultExercises = [
  {
    userId: null,
    exerciseName: "Barbell Bench Press",
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Chest",
    equipment: "Barbell",
    type: "Strength",
    oneRepMax: 0,
  },
  {
    userId: null,
    exerciseName: "Barbell Squat",
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Legs",
    equipment: "Barbell",
    type: "Strength",
    oneRepMax: 0,
  },
  {
    userId: null,
    exerciseName: "Barbell Deadlift",
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Back",
    equipment: "Barbell",
    type: "Strength",
    oneRepMax: 0,
  },
  {
    userId: null,
    exerciseName: "Barbell Seated Shoulder Press",
    defaultNumberOfSets: 4,
    defaultNumberOfReps: 10,
    defaultWeight: 50,
    defaultWeightSystem: "kg",
    defaultRestTime: 60,
    muscle: "Shoulders",
    equipment: "Barbell",
    type: "Strength",
    oneRepMax: 0,
  },
];

/**
 * saveDefaultExercises
 * @param {string} userId - the user's id
 * @param {object} currentSavedExercises - the user's current saved exercises
 * @returns {object} - the new exercises
 * @throws {Error} - if the exercise is already in the user's exercises or if the exercise object is not valid
 */
export default async function saveDefaultExercises(
  userId,
  currentSavedExercises,
) {
  if (!userId) {
    throw new Error("No user id provided");
  }

  const userRef = doc(FIRESTORE, "users", userId);
  const newExercisesRefs = [];

  const defaultExercisesToAdd = defaultExercises.filter(
    (exercise) =>
      !currentSavedExercises.some(
        (savedExercise) => savedExercise.exerciseName === exercise.exerciseName,
      ),
  );

  for (const exercise of defaultExercisesToAdd) {
    exercise.userId = userId;
    const newExerciseRef = doc(collection(FIRESTORE, "exercises"));
    newExercisesRefs.push(newExerciseRef);
  }

  try {
    const newExercises = await runTransaction(
      FIRESTORE,
      async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const userExercisesIds = userDoc.data().exercises;
        const newExercisesIds = [];
        const newExercises = defaultExercisesToAdd.map((exercise, index) => {
          const newExerciseId = newExercisesRefs[index].id;
          newExercisesIds.push(newExerciseId);
          return {
            ...exercise,
            exerciseId: newExerciseId,
          };
        });
        for (const newExercise of newExercises) {
          transaction.set(newExercisesRefs.shift(), newExercise);
        }
        console.log("ADDING DEFAULT EXERCISES SUCCEEDED TRANSACTION");
        const updatedExercises = [...userExercisesIds, ...newExercisesIds];
        transaction.update(userRef, {
          exercises: updatedExercises,
        });
        console.log("UPDATING USER SUCCEEDED TRANSACTION");
        return newExercises;
      },
    );
    console.log("TRANSACTION SUCCEEDED");
    return newExercises;
  } catch (err) {
    console.error("TRANSACTION FAILED: ", err);
    throw new Error(err);
  }
}
