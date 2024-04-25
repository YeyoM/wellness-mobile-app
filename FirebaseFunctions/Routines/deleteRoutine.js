import { FIRESTORE } from "../../firebaseConfig.js";
import { doc, runTransaction, getDoc } from "firebase/firestore";

/** deleteRoutine
 * @param {string} userId - The user id.
 * @param {object} routine - The routine object.
 * @returns {Promise<void>}
 * @throws {Error} If the user id or routine is not provided.
 * @description Deletes the routine and all its data from the database.
 */
export default async function deleteRoutine(userId, routine) {
  if (!userId) {
    throw new Error("User id is required!");
  }

  if (!routine) {
    throw new Error("Routine is required!");
  }

  if (!routine.id) {
    throw new Error("Routine id is required!");
  }

  const routineRef = doc(FIRESTORE, "routines", routine.id);
  const userRef = doc(FIRESTORE, "users", userId);

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      const routineDoc = await getDoc(routineRef);
      const userDoc = await getDoc(userRef);
      if (!routineDoc.exists()) {
        throw new Error(
          "Routine document does not exist, cannot delete routine",
        );
      }
      if (!userDoc.exists()) {
        throw new Error("User document does not exist, cannot delete routine");
      }
      if (routineDoc.data()?.days.length > 0) {
        for (const id of routineDoc.data()?.days) {
          const dayRef = doc(FIRESTORE, "days", id);
          transaction.delete(dayRef);
        }
      }
      transaction.delete(routineRef);
      const newRoutines = userDoc
        .data()
        .routines.filter((id) => id !== routine.id);
      console.log(newRoutines);
      transaction.update(userRef, { routines: newRoutines });
    });
    console.log("TRANSACTION SUCCESS: Routine deleted");
  } catch (error) {
    throw new Error(`TRANSACION ERROR: Routine delete, ${error}`);
  }
}
