import { FIRESTORE } from "../../firebaseConfig.js";
import { collection, doc, runTransaction, getDoc } from "firebase/firestore";

/**
 * createRoutine
 * @param {string} userId - The user id
 * @param {object} routine - The routine object
 * @param {string} routine.routineName - The routine name
 * @param {number} routine.numberOfDays - The number of days
 * @param {string} routine.image - The image
 * @param {boolean} routine.generatedAI - The generated AI
 * @param {array} routine.days - The days
 * @returns {object} - The routine object
 * @throws {Error} - If the user id, routine, routine name, number of days, image, generated AI, or days is not provided
 * @description - This function creates a routine and saves it to firebase
 */
export default async function createRoutine(userId, routine) {
  // 1. save the routine to firebase with auto-generated id
  // 2. save the routine id to the user's routines array
  // 3. save the days to firebase with auto-generated ids on the days collection and save the ids to the daysIds array
  // 4. update the routine with the daysIds array
  if (!userId) {
    throw new Error("User id is required!");
  }

  if (!routine) {
    throw new Error("Routine is required!");
  }

  if (!routine.routineName) {
    throw new Error("Routine name is required!");
  }

  if (!routine.numberOfDays) {
    throw new Error("Number of days is required!");
  }

  if (!routine.image) {
    throw new Error("Image is required!");
  }

  if (routine.generatedAI === undefined) {
    throw new Error("Generated AI is required!");
  }

  if (!routine.days) {
    throw new Error("Days is required!");
  }

  const newRoutineRef = doc(collection(FIRESTORE, "routines"));
  const userRef = doc(FIRESTORE, "users", userId);
  const newDays = [];
  const newDaysRefs = [];
  for (let i = 0; i < routine.numberOfDays; i++) {
    const newDay = {
      dayName: `Day ${i + 1}`,
      routineId: newRoutineRef.id,
      totalDuration: "0",
      totalCalories: "0",
      totalSets: "0",
      exercises: [],
      userId: userId,
    };
    newDays.push(newDay);
    const newDayRef = doc(collection(FIRESTORE, "days"));
    newDaysRefs.push(newDayRef);
  }

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User does not exist!");
      }
      const routines = userDoc.data().routines;
      routines.push(newRoutineRef.id);
      transaction.update(userRef, { routines: routines });

      for (let i = 0; i < newDays.length; i++) {
        transaction.set(newDaysRefs[i], newDays[i]);
      }

      const daysIds = newDaysRefs.map((dayRef) => dayRef.id);

      transaction.set(newRoutineRef, {
        routineName: routine.routineName,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        numberOfDays: routine.numberOfDays,
        image: routine.image,
        generatedAI: routine.generatedAI,
        days: daysIds,
      });
    });
    console.log("TRANSACTION SUCCESSFUL");
    const routineSnap = await getDoc(newRoutineRef);
    if (!routineSnap.exists()) {
      throw new Error("Routine does not exist!");
    }

    const newRoutine = routineSnap.data();

    // populate the days array from the daysIds
    const days = [];
    for (let i = 0; i < routine.numberOfDays; i++) {
      const dayRef = doc(FIRESTORE, "days", routineSnap.data().days[i]);
      const daySnap = await getDoc(dayRef);
      if (!daySnap.exists()) {
        throw new Error("Day does not exist!");
      }
      const day = daySnap.data();
      day.id = daySnap.id;
      days.push(day);
    }

    newRoutine.days = days;
    newRoutine.id = newRoutineRef.id;
    console.log("NEW ROUTINE: ", newRoutine);
    return newRoutine;
  } catch (e) {
    console.error("TRANSACTION FAILED: ", e);
    throw new Error(e);
  }
}
