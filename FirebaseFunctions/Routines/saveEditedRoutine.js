import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * saveEditedRoutine
 * @param {object} routine - The routine object
 * @param {string} routine.id - The routine id
 * @param {string} routine.routineName - The routine name
 * @param {array} routine.days - The days array
 * @returns {boolean} - True if the routine was saved successfully
 * @throws {Error} - If the routine object is not provided or if it is not valid
 * @description - This function saves the edited routine to firebase
 */
export const saveEditedRoutine = async (routine) => {
  if (!routine) {
    throw new Error("Routine is required!");
  }

  if (!routine.id) {
    throw new Error("Routine id is required!");
  }

  if (!routine.routineName) {
    throw new Error("Routine name is required!");
  }

  if (!routine.days) {
    throw new Error("Days is required!");
  }

  if (routine.days.length === 0) {
    throw new Error("Days array is empty!");
  }

  if (routine.days.some((day) => !day.id)) {
    throw new Error("Day id is required!");
  }

  if (routine.days.some((day) => !day.dayName)) {
    throw new Error("Day name is required!");
  }

  if (routine.days.some((day) => !day.exercises)) {
    throw new Error("Exercises is required!");
  }

  try {
    // for the routine document, we only need to update the name and the updatedAt fields
    const routineDocRef = doc(FIRESTORE, "routines", routine.id);
    await updateDoc(routineDocRef, {
      routineName: routine.routineName,
      updatedAt: new Date(),
    });

    console.log("updated routine");

    // for the days documents, for each day we need to update the name and the exercises fields
    // the exercises array is the same as the one in the object in the routine.days array
    // so we can just update the whole array
    for (const day of routine.days) {
      const dayDocRef = doc(FIRESTORE, "days", day.id);
      await updateDoc(dayDocRef, {
        dayName: day.dayName,
        exercises: day.exercises,
        totalCalories: day.totalCalories,
        totalSets: day.totalSets,
        totalDuration: day.totalDuration,
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't save the edited routine");
  }
};
