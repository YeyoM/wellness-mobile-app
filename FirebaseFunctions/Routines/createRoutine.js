import { FIRESTORE } from "../../firebaseConfig.js";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  runTransaction,
  getDoc,
} from "firebase/firestore";

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

  try {
    // 1. save the routine to firebase with auto-generated id
    const routineRef = await addDoc(collection(FIRESTORE, "routines"), routine);
    console.log("AFTER ADDING ROUTINE");

    // Create n-day objects based on the number of days
    const days_ = [];
    for (let i = 0; i < routine.numberOfDays; i++) {
      const day_ = {
        dayName: `Day ${i + 1}`,
        routineId: routineRef.id,
        totalDuration: "0",
        totalCalories: "0",
        totalSets: "0",
        exercises: [],
      };
      days_.push(day_);
    }

    // 2. save the routine id to the user's routines array
    const userRef = doc(FIRESTORE, "users", userId);
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User does not exist!");
      }
      const routines = userDoc.data().routines;
      routines.push(routineRef.id);
      transaction.update(userRef, { routines: routines });
    });
    console.log("AFTER UPDATING USER");

    const daysIds = [];

    // 3. save the days to firebase with auto-generated ids on the days collection and save the ids to the daysIds array
    const daysRef = await Promise.all(
      days_.map(async (day) => {
        const dayRef = await addDoc(collection(FIRESTORE, "days"), day);
        // console.log("dayRef");
        // console.log(dayRef);
        return dayRef;
      }),
    );
    console.log("AFTER ADDING DAYS");

    daysRef.forEach((dayRef) => {
      daysIds.push(dayRef.id);
    });

    // 4. update the routine with the daysIds array
    await setDoc(
      doc(FIRESTORE, "routines", routineRef.id),
      { days: daysIds },
      { merge: true },
    );
    console.log("AFTER UPDATING ROUTINE");

    // get the routine from firebase
    const routineSnap = await getDoc(doc(FIRESTORE, "routines", routineRef.id));
    console.log("AFTER GETTING ROUTINE");

    if (!routineSnap.exists()) {
      throw new Error("Routine does not exist!");
    }

    const routine_ = routineSnap.data();
    routine_.id = routineSnap.id;
    return routine_;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error(e);
  }
}
