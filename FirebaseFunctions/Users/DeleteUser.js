import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

export default async function DeleteUser() {
  // Things to delete:
  /**
   * The user document
   * The user's exercises (get from user's doc)
   * The user's routines (get from user's doc)
   * Each day from the user's routines (get from each routine)
   * The user's workouts history
   * The user itself
   */
}
