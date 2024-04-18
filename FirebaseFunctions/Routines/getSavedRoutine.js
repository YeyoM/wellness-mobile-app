import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * getSavedRoutine
 * @param {string} routineId - The routine id
 * @returns {Array} - Array of routine objects
 * @throws {Error} - If the routine id is not provided
 * @description - This function gets a specific routine from Firestore
 */
export const getSavedRoutine = async (routineId) => {
  if (!routineId) {
    throw new Error("Routine id is required!");
  }

  try {
    const routineDocRef = doc(FIRESTORE, "routines", routineId);
    const routineDocSnap = await getDoc(routineDocRef);
    const routineDocData = routineDocSnap.data();

    const routine = {
      id: routineId,
      ...routineDocData,
    };

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

    return routine;
  } catch (err) {
    console.error("Error getting routine", err);
    throw new Error(err);
  }
};
