import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { runTransaction, doc, collection } from "firebase/firestore";

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
}) {
  const userId = FIREBASE_AUTH.currentUser.uid;

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

  // Create references for the documents we are going to update/modify
  const userRef = doc(FIRESTORE, "users", userId);
  const newWorkoutRef = doc(collection(FIRESTORE, "workouts"));
  const exerciseRefs = [];
  for (let i = 0; i < workout.length; i++) {
    const exerciseId = workout[i].exerciseId;
    const exerciseRef = doc(FIRESTORE, "exercises", exerciseId);
    exerciseRefs.push(exerciseRef);
  }

  if (!userRef) {
    throw new Error("User does not exist!");
  }

  if (!exerciseRefs) {
    throw new Error("Exercises do not exist!");
  }

  if (exerciseRefs.length !== workout.length) {
    throw new Error("Some exercises do not exist!");
  }

  if (!newWorkoutRef) {
    throw new Error("Error creating reference for new workout");
  }

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const exercisesDocs = [];
      for (let i = 0; i < exerciseRefs.length; i++) {
        const exerciseDoc = await transaction.get(exerciseRefs[i]);
        exercisesDocs.push(exerciseDoc);
      }
      // workout
      transaction.set(newWorkoutRef, {
        userId,
        routineId,
        dayId,
        workout,
        totalCalories,
        totalWeight,
        totalTime,
      });
      console.log("WORKOUT WRITTEN TO TRANSACTION");
      const userWorkouts = userDoc.data().workouts;
      userWorkouts.push(newWorkoutRef.id);
      transaction.update(userRef, { workouts: userWorkouts });
      console.log("USER WORKOUTS UPDATE WRITTEN TO TRANSACTION");
      for (let i = 0; i < exerciseRefs.length; i++) {
        const weightHistory = exercisesDocs[i].data().weightRecord;
        const newWeightHistory = {
          date: new Date(),
          weight: workout[i].exerciseWeight,
        };
        weightHistory.push(newWeightHistory);
        transaction.update(exerciseRefs[i], {
          weightRecord: weightHistory,
        });
      }
      console.log("EXERCISES WEIGHT HISTORY WRITTEN TO TRANSACTION");
    });
    console.log("Transaction executed correctly");
  } catch (error) {
    console.error("Error running transaction: ", error);
    throw new Error("Error running transaction: ", error);
  }
}
