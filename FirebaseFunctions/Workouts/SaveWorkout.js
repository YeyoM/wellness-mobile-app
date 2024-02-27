import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import {
  updateDoc,
  runTransaction,
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

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

  try {
    // the name of the collection is "workouts"
    const workoutRef = await addDoc(collection(FIRESTORE, "workouts"), {
      userId,
      routineId,
      dayId,
      workout,
      totalCalories,
      totalWeight,
      totalTime,
    });
    console.log("AFTER SAVING THE WORKOUT");
    console.log("workoutRef.id: ", workoutRef.id);
    // add the workout id to the user's workout history it is an array in the user's document
    const userRef = doc(FIRESTORE, "users", userId);
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }
      const userWorkouts = userDoc.data().workouts;
      userWorkouts.push(workoutRef.id);
      transaction.update(userRef, { workouts: userWorkouts });
    });
    console.log("AFTER ADDING THE WORKOUT TO THE USER'S WORKOUT HISTORY");

    // Now, for each of the exercises in the workout, we need to add the
    // mean weight the user used to the exercise's weight history
    for (let i = 0; i < workout.length; i++) {
      const exerciseId = workout[i].exerciseId;
      const exerciseRef = doc(FIRESTORE, "exercises", exerciseId);
      const exerciseDoc = await getDoc(exerciseRef);
      const exerciseData = exerciseDoc.data();
      const weightHistory = exerciseData.weightRecord;
      const newWeightHistory = {
        date: new Date(),
        weight: workout[i].exerciseWeight,
      };
      weightHistory.push(newWeightHistory);
      await updateDoc(exerciseRef, {
        weightRecord: weightHistory,
      });
      console.log("AFTER ADDING THE WEIGHT TO THE EXERCISE'S WEIGHT HISTORY");
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
