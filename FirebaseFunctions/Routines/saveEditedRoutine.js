import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

export const saveEditedRoutine = async (routine) => {
  console.log("saving edited routine");
  try {
    // for the routine document, we only need to update the name and the updatedAt fields
    const routineDocRef = doc(FIRESTORE, "routines", routine.id);
    await updateDoc(routineDocRef, {
      routineName: routine.routineName,
      updatedAt: new Date(),
    });

    console.log("updated routine");

    // for the days documents, for each day we need to update the name and the exercises fields
    // the exercises array is the same as the one in the object in the routine.days array
    // so we can just update the whole array
    for (const day of routine.days) {
      const dayDocRef = doc(FIRESTORE, "days", day.id);
      await updateDoc(dayDocRef, {
        dayName: day.dayName,
        exercises: day.exercises,
        totalCalories: day.totalCalories,
        totalSets: day.totalSets,
        totalDuration: day.totalDuration,
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't save the edited routine");
  }
};
