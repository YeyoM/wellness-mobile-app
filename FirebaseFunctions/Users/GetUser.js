import { FIRESTORE } from "../../firebaseConfig.js";
import { doc, getDoc, or } from "firebase/firestore";

/**
 * Get user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} - User data
 * @throws {Error} - Error if no user ID provided or no such document
 * @description - Get user data from Firestore
 */
export default async function GetUser(uid) {
  if (!uid) {
    throw new Error("No user ID provided!");
  }
  try {
    const docRef = doc(FIRESTORE, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("GET USER: AFTER GETTING USER");
      return docSnap.data();
    } else {
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (e) {
    throw new Error(e);
  }
}
