import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * getSavedRoutines
 * @param {string} userId - The user id
 * @returns {array} - The routines array
 * @throws {Error} - If the user id is not provided
 * @description - This function gets the user's saved routines from firebase
 * and returns them as an array
 */
export const getSavedRoutines = async (userId) => {
  if (!userId) {
    throw new Error("User id is required!");
  }

  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userRoutinesIds = userDocData.routines;

    if (userRoutinesIds.length === 0) {
      return [];
    }

    console.log("AFTER GETTING USER'S ROUTINES' IDS");
    // after getting the ids, get the routines from the routines collection
    // and store them in the state
    const routines = [];

    for (const id of userRoutinesIds) {
      const routineDocRef = doc(FIRESTORE, "routines", id);
      const routineDocSnap = await getDoc(routineDocRef);
      const routineDocData = routineDocSnap.data();
      // create a new object with the id and the dayDocData
      const routine = {
        id: id,
        ...routineDocData,
      };
      routines.push(routine);
    }

    console.log("AFTER GETTING ROUTINES");
    // after getting the routines, we need to get all the day's ids
    // and then get the days from the days collection
    for (const routine of routines) {
      const days = [];

      for (const id of routine.days) {
        const dayDocRef = doc(FIRESTORE, "days", id);
        const dayDocSnap = await getDoc(dayDocRef);
        const dayDocData = dayDocSnap.data();
        // create a new object with the id and the dayDocData
        const day = {
          id: id,
          ...dayDocData,
        };
        days.push(day);
      }

      routine.days = days;
    }

    console.log("AFTER GETTING DAYS");

    // after getting the days, we need to get all the exercise's ids
    // and then get the exercises from the exercises collection
    // and then add them to the days
    return routines;
  } catch (err) {
    console.error("Error getting routines", err);
    throw new Error(err);
  }
};
