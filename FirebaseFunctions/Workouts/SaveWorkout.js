import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { runTransaction, doc, collection } from "firebase/firestore";

const cardioExercises = new Set([
  "Treadmill",
  "Elliptical",
  "Stationary Bike",
  "Rowing Machine",
]);

/**
 * SaveWorkout
 * @param {Object} workout
 * @param {String} routineId
 * @param {String} dayId
 * @param {Number} totalCalories
 * @param {Number} totalWeight
 * @param {Number} totalTime
 * @param {Object} day
 * @param {Object} workoutInfo
 * @param {Object} date
 * @returns {Promise}
 * @throws {Error} iff there is no user logged in, routineId, dayId, workout, totalCalories, totalWeight, or totalTime is missing
 * @description Saves a workout to the database
 */
export default async function SaveWorkout({
  workout,
  routineId,
  dayId,
  totalCalories,
  totalWeight,
  totalTime,
  date,
}) {
  const userId = FIREBASE_AUTH.currentUser.uid;

  console.log(workout);

  console.log("hello?");
  console.log(FIRESTORE);

  if (!userId) {
    throw new Error("User is not logged in!");
  }

  if (!routineId) {
    throw new Error("Routine ID is missing!");
  }

  if (!dayId) {
    throw new Error("Day ID is missing!");
  }

  if (!workout) {
    throw new Error("Workout is missing!");
  }

  if (!totalCalories) {
    throw new Error("Total calories is missing!");
  }

  if (!totalWeight) {
    throw new Error("Total weight is missing!");
  }

  if (!totalTime) {
    throw new Error("Total time is missing!");
  }
  console.log("hello?");

  if (!date) {
    throw new Error("Date is missing!");
  }

  console.log("hello?");

  // Create references for the documents we are going to update/modify
  const userRef = doc(FIRESTORE, "users", userId);
  const newWorkoutRef = doc(collection(FIRESTORE, "workouts"));
  const exerciseRefs = [];
  for (let i = 0; i < workout.length; i++) {
    if (!cardioExercises.has(workout[i].exerciseName)) {
      exerciseRefs.push(doc(FIRESTORE, "exercises", workout[i].exerciseId));
    }
  }

  if (!userRef) {
    throw new Error("User does not exist!");
  }

  if (!exerciseRefs) {
    throw new Error("Exercises do not exist!");
  }

  if (!newWorkoutRef) {
    throw new Error("Error creating reference for new workout");
  }

  try {
    const savedWorkout = await runTransaction(
      FIRESTORE,
      async (transaction) => {
        console.log("Transaction started");
        const userDoc = await transaction.get(userRef);
        const exercisesDocs = [];
        console.log("USER DOC RETRIEVED");
        for (let i = 0; i < exerciseRefs.length; i++) {
          const exerciseDoc = await transaction.get(exerciseRefs[i]);
          exercisesDocs.push(exerciseDoc);
        }
        console.log("EXERCISES DOCS RETRIEVED");
        transaction.set(newWorkoutRef, {
          userId,
          routineId,
          dayId,
          workout,
          totalCalories,
          totalWeight,
          totalTime,
          date,
        });
        console.log("WORKOUT WRITTEN TO TRANSACTION");
        const userWorkouts = userDoc.data().workouts;
        userWorkouts.push(newWorkoutRef.id);
        transaction.update(userRef, { workouts: userWorkouts });
        console.log("USER WORKOUTS UPDATE WRITTEN TO TRANSACTION");
        console.log(exerciseRefs);
        console.log(exercisesDocs);
        exerciseRefs.forEach((exerciseRef, index) => {
          console.log(exercisesDocs[index].data());
          const weightHistory = exercisesDocs[index].data().weightRecord;
          const newWeightHistory = {
            date: new Date(),
            weight: workout[index].exerciseWeight,
          };
          weightHistory.push(newWeightHistory);
          console.log("Weight history: ", weightHistory);
          console.log("New weight history: ", newWeightHistory);

          transaction.update(exerciseRef, {
            weightRecord: weightHistory,
          });
        });
        console.log("EXERCISES WEIGHT HISTORY WRITTEN TO TRANSACTION");
        return {
          id: newWorkoutRef.id,
          userId,
          routineId,
          dayId,
          workout,
          totalCalories,
          totalWeight,
          totalTime,
          date,
        };
      },
    );
    console.log("Transaction executed correctly");
    return savedWorkout;
  } catch (error) {
    console.error("Error running transaction: ", error);
    throw new Error("Error running transaction: ", error);
  }
}
