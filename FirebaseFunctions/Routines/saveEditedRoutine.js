import { doc, runTransaction } from "firebase/firestore";
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
export default async function saveEditedRoutine(routine) {
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

  // Getting all the refs for the documents to update
  const routineRef = doc(FIRESTORE, "routines", routine.id);
  const daysRefs = routine.days.map((day) => doc(FIRESTORE, "days", day.id));

  if (!routineRef || !daysRefs) {
    throw new Error("Couldn't get the document references");
  }

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      transaction.update(routineRef, {
        routineName: routine.routineName,
        updatedAt: new Date(),
      });
      console.log("ROUTINE UPDATE WRITTEN TO TRANSACTION");
      for (const day of routine.days) {
        transaction.update(doc(FIRESTORE, "days", day.id), {
          dayName: day.dayName,
          exercises: day.exercises,
          totalCalories: day.totalCalories,
          totalSets: day.totalSets,
          totalDuration: day.totalDuration,
        });
      }
      console.log("DAYS UPDATE WRITTEN TO TRANSACTION");
    });
    console.log("TRANSACTION SUCCESSFUL");
  } catch (err) {
    console.log("TRANSACTION FAILED", err);
    throw new Error("Couldn't save the edited routine", err);
  }
}
