import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { doc, runTransaction } from "firebase/firestore";
import { signOut, deleteUser } from "firebase/auth";

/**
 * DeleteUser
 * @param {void}
 * @returns {Promise<void>}
 * @throws {Error} If there is an error deleting the user or its data.
 * @description Deletes the user and all its data from the database.
 */
export default async function DeleteUserTransaction() {
  const user = FIREBASE_AUTH.currentUser;
  if (!user) throw new Error("User is not logged in, cannot delete user");

  const userRef = doc(FIRESTORE, "users", user.uid);

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist, cannot delete user");
      }
      const routinesDocs = [];
      if (userDoc.data()?.routines.length > 0) {
        for (const routineId of userDoc.data()?.routines) {
          const routineRef = doc(FIRESTORE, "routines", routineId);
          const routineDoc = await transaction.get(routineRef);
          if (routineDoc.exists()) {
            routinesDocs.push(routineDoc);
          }
        }
        for (const routineDoc of routinesDocs) {
          if (routineDoc.data()?.days.length > 0) {
            for (const id of routineDoc.data()?.days) {
              const dayRef = doc(FIRESTORE, "days", id);
              transaction.delete(dayRef);
            }
          }
          transaction.delete(routineDoc.ref);
        }
      }
      if (userDoc.data()?.exercises.length > 0) {
        for (const exerciseId of userDoc.data()?.exercises) {
          const exerciseRef = doc(FIRESTORE, "exercises", exerciseId);
          transaction.delete(exerciseRef);
        }
      }
      if (userDoc.data()?.workouts.length > 0) {
        for (const workoutId of userDoc.data()?.workouts) {
          const workoutRef = doc(FIRESTORE, "workouts", workoutId);
          transaction.delete(workoutRef);
        }
      }
      transaction.delete(userRef);
    });
    console.log("TRANSACTION SUCCESS: User deleted");
    await signOut(FIREBASE_AUTH);
    await deleteUser(user);
  } catch (error) {
    console.log("TRANSACTION ERROR: ", error);
    throw new Error("Error running transaction: " + error);
  }
}
