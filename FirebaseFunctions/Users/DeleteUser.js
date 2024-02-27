import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { signOut, deleteUser } from "firebase/auth";

/**
 * DeleteUser
 * @param {void}
 * @returns {Promise<void>}
 * @throws {Error} If there is an error deleting the user or its data.
 * @description Deletes the user and all its data from the database.
 */
export default async function DeleteUser() {
  // Things to delete:
  /**
   * The user document
   * The user's exercises (get from user's doc)
   * The user's routines (get from user's doc)
   * Each day from the user's routines (get from each routine)
   * The user's workouts history
   * The user itself
   */
  try {
    // get the user document
    console.log("GETTING USER DOC");
    const user = FIREBASE_AUTH.currentUser;
    const userRef = doc(FIRESTORE, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userDocData = userDoc.data();
    if (!userDoc.exists())
      throw new Error("User document does not exist, cannot delete user");
    if (!userDocData)
      throw new Error("User document has no data, cannot delete user");
    console.log(userDocData);

    // get the user's exercises, it is an array of references in the user's doc
    console.log("GETTING USER EXERCISES");
    const userExercises = userDocData.exercises;
    console.log(userExercises);
    // delete each exercise
    console.log("DELETING USER EXERCISES");
    if (userExercises.length > 0) {
      for (const exerciseId of userExercises) {
        await deleteDoc(doc(FIRESTORE, "exercises", exerciseId));
        console.log("DELETING EXERCISE: " + exerciseId);
      }
    }

    // get the user's routines, it is an array of references in the user's doc
    console.log("GETTING USER ROUTINES");
    const userRoutines = userDocData.routines;

    // get each routine, then get each day, then delete each day and the routine
    // itself
    console.log("DELETING USER ROUTINES");
    console.log("DELETING USER DAYS");
    if (userRoutines.length > 0) {
      for (const routineId of userRoutines) {
        const routineRef = doc(FIRESTORE, "routines", routineId);
        const routineDoc = await getDoc(routineRef);
        const routineDocData = routineDoc.data();
        if (routineDoc.exists() && routineDocData) {
          const routineDays = routineDocData.days;
          if (routineDays.length > 0) {
            for (const dayId of routineDays) {
              await deleteDoc(doc(FIRESTORE, "days", dayId));
              console.log("DELETING DAY: " + dayId);
            }
          }
          await deleteDoc(routineRef);
          console.log("DELETING ROUTINE: " + routineId);
        }
      }
    }

    // get the user's workouts history, it is an array of references in the user's doc
    // (each reference is a document in the workouts collection)
    // delete each workout document
    console.log("DELETING USER WORKOUTS HISTORY");
    const userWorkouts = userDocData.workouts;
    if (userWorkouts.length > 0) {
      for (const workoutId of userWorkouts) {
        await deleteDoc(doc(FIRESTORE, "workouts", workoutId));
        console.log("DELETING WORKOUT: " + workoutId);
      }
    }

    // delete the user document
    console.log("DELETING USER DOC");
    await deleteDoc(userRef);

    // delete the user itself and log out
    console.log("DELETING USER");
    await deleteUser(user);
    await signOut(FIREBASE_AUTH);

    console.log("USER DELETED");

    console.log("DELETION SUCCESSFUL");
  } catch (error) {
    throw new Error("Error getting user's exercises: " + error);
  }
}
