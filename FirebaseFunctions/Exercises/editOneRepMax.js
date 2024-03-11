import { runTransaction, doc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

/**
 * updateOneRepMax
 * @param {Object} exercise - The exercise object to update
 * @param {Number} oneRepMax - The new one rep max to set
 * @returns {Promise} - A promise that resolves when the transaction is complete
 * @throws {Error} - An error
 */
export default async function updateOneRepMax(exercise, oneRepMax) {
  if (!exercise) {
    throw new Error("No exercise provided");
  }

  if (oneRepMax === undefined) {
    throw new Error("No one rep max provided");
  }

  console.log(exercise);
  console.log(oneRepMax);

  try {
    const db = FIRESTORE;
    const exerciseRef = doc(db, "exercises", exercise.exerciseId);
    await runTransaction(db, async (transaction) => {
      const exerciseDoc = await transaction.get(exerciseRef);
      if (!exerciseDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(exerciseRef, {
        oneRepMax: oneRepMax,
      });
    });
    console.log("TRANSACTION COMPLETE");
  } catch (e) {
    console.error("Error updating document: ", e);
    throw new Error("Error updating document: ", e);
  }
}
