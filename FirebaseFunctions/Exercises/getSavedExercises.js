import { doc, getDoc } from "firebase/firestore";

export const getSavedExercises = async (
  userId,
  setExercises,
  setError,
  setRefreshing,
) => {
  // from the user document, get the ids of the exercises
  // and then get the exercises from the exercises collection

  setRefreshing(true);
  setError(null);

  try {
    const userDocRef = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    const userExercisesIds = userDocData.exercises;

    if (userExercisesIds.length === 0) {
      setExercises([]);
      setRefreshing(false);
      return;
    }

    const exercises = [];

    for (const id of userExercisesIds) {
      const exerciseDocRef = doc(FIRESTORE, "exercises", id);
      const exerciseDocSnap = await getDoc(exerciseDocRef);
      const exerciseDocData = exerciseDocSnap.data();
      // create a new object with the id and the data
      const exercise = {
        id: id,
        ...exerciseDocData,
      };
      exercises.push(exercise);
    }

    setExercises(exercises);
    setRefreshing(false);
    return exercises;
  } catch (err) {
    setError(err);
    setRefreshing(false);
    return;
  }
};
