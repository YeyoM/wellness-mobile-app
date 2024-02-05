import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * SaveNotificationSettingsChanges
 * @param {string} userId - The user's unique ID.
 * @param {boolean} pushNotifications - The user's preference for push notifications.
 * @param {boolean} workoutReminders - The user's preference for workout reminders.
 * @param {boolean} sound - The user's preference for sound.
 * @param {boolean} vibration - The user's preference for vibration.
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - If the user is not found or if there is an error updating the document.
 * @description Updates the user's notification settings in the database.
 */
export default async function SaveNotificationSettingsChanges({
  userId,
  pushNotifications,
  workoutReminders,
  sound,
  vibrations,
}) {
  try {
    const docRef = doc(FIRESTORE, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        pushNotifications: pushNotifications,
        workoutReminders: workoutReminders,
        sound: sound,
        vibrations: vibrations,
      });
      console.log("Notification settings updated successfully!");
    } else {
      throw new Error("User not found!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
