import GetUser from "../FirebaseFunctions/Users/GetUser.js";
import getAllDays from "../FirebaseFunctions/Days/getAllDays.js";
import { getSavedExercises } from "../FirebaseFunctions/Exercises/getSavedExercises.js";
import { getSavedRoutines } from "../FirebaseFunctions/Routines/getSavedRoutines.js";
import getWorkouts from "../FirebaseFunctions/Workouts/GetWorkouts.js";

import saveUserStorage from "../AsyncStorageFunctions/Users/saveUserStorage.js";
import saveDaysStorage from "../AsyncStorageFunctions/Days/saveDaysStorage.js";
import saveExercisesStorage from "../AsyncStorageFunctions/Exercises/saveExercisesStorage.js";
import saveRoutinesStorage from "../AsyncStorageFunctions/Routines/saveRoutinesStorage.js";
import saveWorkoutsStorage from "../AsyncStorageFunctions/Workouts/saveWorkoutsStorage.js";

/**
 * getAppData
 * @param {string} uid - The user's uid
 * @return {void}
 * @description - This function is used to get the data from the server and
 * store it in the asyn storage. This function is called when the app is
 * opened for the first time, when the user logs in and when the user
 * refreshes the app.
 * The data is stored that is stored in the async storage is the following:
 * 1. The user's data
 * 2. The routines
 * 3. The exercises
 * 4. The days
 * 5. The workouts
 */
export default async function getAppData(uid) {
  console.log("GET APP DATA: START");
  const start = Date.now();

  if (!uid) {
    throw new Error("No uid provided");
  }

  try {
    const results = await Promise.all([
      GetUser(uid),
      getSavedExercises(uid),
      getWorkouts(uid),
      getSavedRoutines(uid),
    ]);

    const user = results[0];
    const exercises = results[1];
    const workouts = results[2];
    const routines = results[3];

    const days = [];
    routines &&
      routines.forEach((routine) => {
        routine.days.forEach((day) => {
          days.push(day);
        });
      });

    if (user) {
      await saveUserStorage(user);
    }
    if (days) {
      await saveDaysStorage(days);
    }
    if (exercises) {
      await saveExercisesStorage(exercises);
    }
    if (routines) {
      await saveRoutinesStorage(routines);
    }
    if (workouts) {
      await saveWorkoutsStorage(workouts);
    }

    const end = Date.now();
    console.log("GET APP DATA: END");
    console.log("GET APP DATA: TIME", end - start, "ms");
    return { user, days, exercises, routines, workouts };
  } catch (error) {
    console.log("Error in getAppData: ", error);
    throw new Error("Error in getAppData: ", error);
  }
}
