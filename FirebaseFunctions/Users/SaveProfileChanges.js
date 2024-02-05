import { FIRESTORE } from "../../firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * SaveProfileChanges
 * @param {string} name
 * @param {string} bio
 * @param {number} weigh
 * @param {number} height
 * @param {boolean} showHeightAndWeight
 * @param {string} weightUnit
 * @param {string} heightUnit
 * @param {boolean} privateProfile
 * @param {string} userId
 * @returns {Promise<void>}
 * @description Save the changes made to the user's profile to the database
 */
export default async function SaveProfileChanges({
  name,
  bio,
  weight,
  height,
  showHeightAndWeight,
  weightUnit,
  heightUnit,
  privateProfile,
  userId,
}) {
  try {
    const docRef = doc(FIRESTORE, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        name,
        bio,
        weight,
        height,
        showHeightAndWeight,
        weightUnit,
        heightUnit,
        privateProfile,
      });
      console.log("Document successfully updated!");
    } else {
      throw new Error("No such document!");
    }
  } catch (e) {
    console.error("Error updating document: ", e);
    throw new Error(e);
  }
}
