import { FIRESTORE } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/**
 * UserAnsweredInitialQuestions
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<boolean>} - True if the user has answered the initial questions, false if not.
 * @throws {Error} - If there is an error getting the document.
 * @description Checks if the user has answered the initial questions.
 */
export const UserAnsweredInitialQuestions = async (uid) => {
  if (!uid) {
    throw new Error("No user ID provided!");
  }
  try {
    const docRef = doc(FIRESTORE, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
