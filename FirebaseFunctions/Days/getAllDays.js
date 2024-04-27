import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * getAllDays
 * @param {void}
 * @returns {Array} - Array of day objects from Firestore database
 * @throws {Error} - Error getting all days from Firestore
 * @description - Get all days from Firestore database
 */
export default async function getAllDays() {
  const user = FIREBASE_AUTH.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }

  const routineCollectionRef = collection(FIRESTORE, "routines");
  const daysCollectionRef = collection(FIRESTORE, "days");

  if (!routineCollectionRef || !daysCollectionRef) {
    throw new Error("Error getting collection references");
  }

  try {
    const userDocRef = doc(FIRESTORE, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const routineIds = userDocData.routines;
    console.log("GET ALL DAYS: AFTER GETTING USER DATA");

    const routines = [];

    const routineQuery = query(
      routineCollectionRef,
      where("__name__", "in", routineIds),
    );

    const routineQuerySnapshot = await getDocs(routineQuery);
    routineQuerySnapshot.forEach((doc) => {
      const routineDocData = doc.data();
      routines.push(routineDocData);
    });
    console.log("GET ALL DAYS: AFTER GETTING ROUTINES");

    const days = [];
    for (const routine of routines) {
      const dayIds = routine.days;
      const image = routine.image;
      const routineName = routine.routineName;

      const dayQuery = query(
        daysCollectionRef,
        where("__name__", "in", dayIds),
      );

      const dayQuerySnapshot = await getDocs(dayQuery);
      dayQuerySnapshot.forEach((doc) => {
        const dayDocData = doc.data();
        dayDocData.image = image;
        dayDocData.id = doc.id;
        dayDocData.routineName = routineName;
        days.push(dayDocData);
      });
    }
    console.log("GET ALL DAYS: AFTER GETTING DAYS");

    return days;
  } catch (error) {
    console.error("Error getting all days: ", error);
    throw new Error("Error getting all days");
  }
}
