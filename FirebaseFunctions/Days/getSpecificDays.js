import { FIRESTORE } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  const daysCollectionRef = collection(FIRESTORE, "days");

  if (!daysCollectionRef) {
    throw new Error("Error getting collection references");
  }

  try {
    const days = [];

    const dayQuery = query(daysCollectionRef, where("__name__", "in", daysIds));
    const dayQuerySnapshot = await getDocs(dayQuery);

    dayQuerySnapshot.forEach((doc) => {
      const dayDocData = doc.data();
      dayDocData.id = doc.id;
      dayDocData.image = image;
      dayDocData.routineName = routineName;
      days.push(dayDocData);
    });
    console.log("AFTER GETTING DAYS");

    return days;
  } catch (error) {
    console.error("Error getting all days: ", error);
    throw new Error("Error getting all days");
  }
}
