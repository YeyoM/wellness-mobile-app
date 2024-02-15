import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { runTransaction, doc, addDoc, collection } from "firebase/firestore";

/**
 * SaveWorkout
 * @param {Object} workout
 * @param {String} routineId
 * @param {String} dayId
 * @param {Number} totalCalories
 * @param {Number} totalWeight
 * @param {Number} totalTime
 * @returns {Promise}
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

    // add the exerciseWeight to the user's exercise history (it is an array in the exercise document)
    // for each exercise in the workout we need to add the weight to the user's exercise history with the date
  } catch (error) {
    throw error;
  }
}
