import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

/**
 * getSpecificDays
 * @param {Array} daysIds - Array of day ids
 * @param {String} image - Image URL of the routine
 * @param {String} routineName - Name of the routine
 * @returns {Array} - Array of day objects from Firestore database
 * @throws {Error} - Error getting all days from Firestore
 * @description - Get all days from Firestore database
 */
export default async function getSpecificDays(daysIds, image, routineName) {
  try {
    const days = [];
    for (const id of daysIds) {
      const dayDocRef = doc(FIRESTORE, "days", id);
      const dayDocSnap = await getDoc(dayDocRef);
      const dayDocData = dayDocSnap.data();
      dayDocData.image = image;
      dayDocData.id = id;
      dayDocData.routineName = routineName;
      days.push(dayDocData);
    }
    console.log("AFTER GETTING DAYS");

    return days;
  } catch (error) {
    console.error("Error getting all days: ", error);
    throw new Error("Error getting all days");
  }
}
