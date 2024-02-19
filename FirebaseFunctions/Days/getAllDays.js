import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

/**
 * getAllDays
 * @param {void}
 * @returns {Array} - Array of day objects from Firestore database
 * @throws {Error} - Error getting all days from Firestore
 * @description - Get all days from Firestore database
 */
export default async function getAllDays() {
  const user = FIREBASE_AUTH.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }
  try {
    const userDocRef = doc(FIRESTORE, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const routineIds = userDocData.routines;
    console.log("AFTER GETTING USER DATA");

    // Once we have the routine IDs, we can get the days ids, which are
    // stored in each routine document, it is an array of strings
    const routines = [];
    for (const id of routineIds) {
      const routineDocRef = doc(FIRESTORE, "routines", id);
      const routineDocSnap = await getDoc(routineDocRef);
      const routineDocData = routineDocSnap.data();
      routines.push(routineDocData);
    }
    console.log("AFTER GETTING ROUTINES");

    const days = [];
    for (const routine of routines) {
      const dayIds = routine.days;
      const image = routine.image;
      for (const id of dayIds) {
        const dayDocRef = doc(FIRESTORE, "days", id);
        const dayDocSnap = await getDoc(dayDocRef);
        const dayDocData = dayDocSnap.data();
        dayDocData.image = image;
        // add the id to the day object
        dayDocData.dayId = id;
        days.push(dayDocData);
      }
    }
    console.log("AFTER GETTING DAYS");

    return days;
  } catch (error) {
    console.error("Error getting all days: ", error);
    throw new Error("Error getting all days");
  }
}
