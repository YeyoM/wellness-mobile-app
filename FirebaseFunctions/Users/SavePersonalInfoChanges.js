import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * @param {string} uid - User ID
 * @param {string} gym - Gym name
 * @returns {Promise<void>} - No return value
 * @throws {Error} - If the user is not found or if there is an error updating the document
 * @description Saves the user's gym name to the database
 */
export default async function SavePersonalInfoChanges({ uid, gym }) {
  if (!uid) {
    throw new Error("No user ID provided!");
  }
  if (!gym) {
    throw new Error("No gym provided!");
  }
  try {
    const docRef = doc(FIRESTORE, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        gym: gym,
      });
      console.log("Document successfully updated!");
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    throw new Error(error);
  }
}
