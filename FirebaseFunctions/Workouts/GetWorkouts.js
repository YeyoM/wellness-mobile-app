import { FIRESTORE } from "../../firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

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

  const workoutsCollectionRef = collection(FIRESTORE, "workouts");

  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userWorkoutsIds = userDocData.workouts;
    console.log("GET WORKOUTS: AFTER GETTING USER DATA");

    if (userWorkoutsIds.length === 0) {
      return [];
    }
    const workouts = [];

    const workoutQuery = query(
      workoutsCollectionRef,
      where("__name__", "in", userWorkoutsIds),
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
