import { FIRESTORE } from "../../firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import firebasDateToDate from "../../Utils/firebasDateToDate.js";

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
  weightRecord,
  userId,
}) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!name) {
    throw new Error("Name is required");
  }

  if (!weight) {
    throw new Error("Weight is required");
  }

  if (!height) {
    throw new Error("Height is required");
  }

  if (!weightUnit) {
    throw new Error("Weight unit is required");
  }

  if (!heightUnit) {
    throw new Error("Height unit is required");
  }

  if (weightRecord === undefined) {
    throw new Error("Weight record is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  if (weight < 0) {
    throw new Error("Weight cannot be negative");
  }

  if (height < 0) {
    throw new Error("Height cannot be negative");
  }

  if (showHeightAndWeight === undefined) {
    throw new Error("Show height and weight is required");
  }

  if (privateProfile === undefined) {
    throw new Error("Private profile is required");
  }

  if (weightUnit !== "kg" && weightUnit !== "lb") {
    throw new Error("Invalid weight unit");
  }

  if (heightUnit !== "cm" && heightUnit !== "ft") {
    throw new Error("Invalid height unit");
  }

  if (weightRecord.length > 0) {
    const lastWeightUpdate = weightRecord[weightRecord.length - 1].date;
    const today = new Date().toISOString().split("T")[0];
    console.log("today", today);
    console.log("last", lastWeightUpdate);
    const lastDate = firebasDateToDate(lastWeightUpdate)
      .toISOString()
      .split("T")[0];

    if (today === lastDate) {
      // update the weight of the last element in the weightRecord array
      weightRecord[weightRecord.length - 1].weight = weight;
    } else {
      // add the new weight to the weightRecord array
      weightRecord.push({ date: new Date(), weight });
    }
  }

  for (let i = 0; i < weightRecord.length; i++) {
    console.log("weight Record", weightRecord[i].date);
    if (
      weightRecord[i].date.seconds !== undefined &&
      weightRecord[i].date.nanoseconds !== undefined
    ) {
      weightRecord[i].date = firebasDateToDate(weightRecord[i].date);
    } else {
      weightRecord[i].date = new Date(weightRecord[i].date);
    }
  }

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
        weightRecord,
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
