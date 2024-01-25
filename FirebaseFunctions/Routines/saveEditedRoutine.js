import { doc, updateDoc } from "firebase/firestore";

export const saveEditedRoutine = async (
  userId,
  routine,
  setError,
  setLoading,
) => {
  console.log("saving edited routine");
  console.log(routine);
  console.log(userId);

  setLoading(true);
  setError(null);

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
      });
    }

    console.log("updated days");

    setLoading(false);
    return;
  } catch (err) {
    setError(err);
    setLoading(false);
    console.log(err);
    return;
  }
};
