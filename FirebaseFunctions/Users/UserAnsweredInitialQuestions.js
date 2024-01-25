import { FIRESTORE } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const UserAnsweredInitialQuestions = async (uid) => {
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
