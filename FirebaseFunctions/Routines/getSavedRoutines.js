import { FIRESTORE } from "../../firebaseConfig.js";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * getSavedRoutines
 * @param {string} userId - The user id
 * @returns {array} - The routines array
 * @throws {Error} - If the user id is not provided
 * @description - This function gets the user's saved routines from firebase
 * and returns them as an array
 */
export const getSavedRoutines = async (userId) => {
  if (!userId) {
    throw new Error("User id is required!");
  }

  const routineCollectionRef = collection(FIRESTORE, "routines");
  const daysCollectionRef = collection(FIRESTORE, "days");

  if (!routineCollectionRef || !daysCollectionRef) {
    throw new Error("Error getting collection references");
  }

  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userRoutinesIds = userDocData.routines;
    console.log("GET SAVED ROUTINES: AFTER GETTING USER DATA");

    if (userRoutinesIds.length === 0) {
      console.log("GET SAVED ROUTINES: NO ROUTINES");
      return [];
    }

    const routines = [];

    const routineQuery = query(
      routineCollectionRef,
      where("__name__", "in", userRoutinesIds),
    );

    const routineQuerySnapshot = await getDocs(routineQuery);
    routineQuerySnapshot.forEach((doc) => {
      const routineDocData = doc.data();
      const routine = {
        id: doc.id,
        ...routineDocData,
      };
      routines.push(routine);
    });
    console.log(routines);
    console.log("GET SAVED ROUTINES: AFTER GETTING ROUTINES");

    for (const routine of routines) {
      const days = [];
      const daysIds = routine.days;
      const image = routine.image;
      const routineName = routine.routineName;

      const dayQuery = query(
        daysCollectionRef,
        where("__name__", "in", daysIds),
      );

      const dayQuerySnapshot = await getDocs(dayQuery);
      dayQuerySnapshot.forEach((doc) => {
        const dayDocData = doc.data();
        dayDocData.image = image;
        dayDocData.id = doc.id;
        dayDocData.routineName = routineName;
        days.push(dayDocData);
      });
      console.log(days);

      routine.days = days;
    }
    console.log("GET SAVED ROUTINES: AFTER GETTING DAYS");

    return routines;
  } catch (err) {
    console.error("Error getting routines", err);
    throw new Error(err);
  }
};
