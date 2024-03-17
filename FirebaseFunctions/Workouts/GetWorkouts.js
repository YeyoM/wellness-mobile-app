import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/** getWorkouts
 * @param {string} userId - the user's id
 * @returns {Array} - an array of the user's workouts
 * @throws {Error} - if the user id is not provided
 * @throws {Error} - if there is an error getting the user's workouts
 * @description - gets the user's workouts from the workouts collection
 * and returns them as an array
 */
export default async function getWorkouts(userId) {
  if (!userId) {
    throw new Error("User id is required!");
  }

  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userWorkoutsIds = userDocData.workouts;

    if (userWorkoutsIds.length === 0) {
      return [];
    }

    console.log("AFTER GETTING USER'S WORKOUTS IDS");
    // after getting the ids, get the routines from the routines collection
    // and store them in the state
    const workouts = [];

    for (const id of userWorkoutsIds) {
      const workoutDocRef = doc(FIRESTORE, "workouts", id);
      const workoutDocSnap = await getDoc(workoutDocRef);
      const workoutDocData = workoutDocSnap.data();
      // create a new object with the id and the dayDocData
      const workout = {
        id: id,
        ...workoutDocData,
      };
      workouts.push(workout);
    }

    console.log("AFTER GETTING WORKOUTS");
    return workouts;
  } catch (err) {
    console.error("Error getting user's workouts: ", err);
    throw new Error(err);
  }
}
