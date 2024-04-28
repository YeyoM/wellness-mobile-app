import { FIRESTORE } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

/** getSpecificWorkouts
 * @param {Array} workoutsIds - the user's workout ids
 * @returns {Array} - an array of the user's workouts
 * @throws {Error} - if there is an error getting the user's workouts
 * @description - gets the user's workouts from the workouts collection
 * and returns them as an array
 */
export default async function getSpecificWorkouts(workoutsIds) {
  try {
    const workoutsCollectionRef = collection(FIRESTORE, "workouts");

    if (workoutsIds.length === 0) {
      return [];
    }
    const workouts = [];

    const workoutQuery = query(
      workoutsCollectionRef,
      where("__name__", "in", workoutsIds),
    );

    const workoutQuerySnapshot = await getDocs(workoutQuery);

    workoutQuerySnapshot.forEach((doc) => {
      const workoutDocData = doc.data();
      const workout = {
        id: doc.id,
        ...workoutDocData,
      };
      workouts.push(workout);
    });
    console.log("GET WORKOUTS: AFTER GETTING WORKOUTS");

    return workouts;
  } catch (err) {
    console.error("Error getting user's workouts: ", err);
    throw new Error(err);
  }
}
