import { FIRESTORE } from "../../firebaseConfig.js";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  runTransaction,
  getDoc,
} from "firebase/firestore";

export default async function createRoutine(userId, routine) {
  // 1. save the routine to firebase with auto-generated id
  // 2. save the routine id to the user's routines array
  // 3. save the days to firebase with auto-generated ids on the days collection and save the ids to the daysIds array
  // 4. update the routine with the daysIds array

  try {
    // 1. save the routine to firebase with auto-generated id
    const routineRef = await addDoc(collection(FIRESTORE, "routines"), routine);
    // console.log("routineRef");
    // console.log(routineRef);

    // Create n-day objects based on the number of days
    const days_ = [];
    for (let i = 0; i < numberOfDays; i++) {
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
        throw "Document does not exist!";
        return;
      }
      const routines = userDoc.data().routines;
      routines.push(routineRef.id);
      transaction.update(userRef, { routines: routines });
    });

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
    // console.log("daysRef");
    // console.log(daysRef);
    daysRef.forEach((dayRef) => {
      daysIds.push(dayRef.id);
    });

    // 4. update the routine with the daysIds array
    await setDoc(
      doc(FIRESTORE, "routines", routineRef.id),
      { days: daysIds },
      { merge: true },
    );

    // get the routine from firebase
    const routineSnap = await getDoc(doc(FIRESTORE, "routines", routineRef.id));

    if (!routineSnap.exists()) {
      navigation.navigate("Home");
    }

    const routine_ = routineSnap.data();
    routine_.id = routineSnap.id;
    return routine_;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
