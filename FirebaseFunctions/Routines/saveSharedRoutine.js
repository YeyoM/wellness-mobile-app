import { FIRESTORE } from "../../firebaseConfig.js";
import { collection, doc, runTransaction, getDoc } from "firebase/firestore";

/**
 * saveSharedRoutine
 * @param {string} userId - The user id
 * @param {array} alreadySavedExercises - The set of already saved exercises
 * @param {object} routine - The routine object
 * @param {string} routine.routineName - The routine name
 * @param {number} routine.numberOfDays - The number of days
 * @param {string} routine.image - The image
 * @param {boolean} routine.generatedAI - The generated AI
 * @param {boolean} routine.shared - True if the routine is shared
 * @param {array} routine.days - The days
 * @returns {object} - The routine object
 * @throws {Error} - If the user id, routine, routine name, number of days, image, generated AI, or days is not provided
 * @description - This function takes a routine object and saves it to firebase
 */
export default async function saveSharedRoutine(
  userId,
  routine,
  alreadySavedExercises,
) {
  if (!userId) {
    throw new Error("User id is required!");
  }

  if (!routine) {
    throw new Error("Routine is required!");
  }

  if (!routine.routineName) {
    throw new Error("Routine name is required!");
  }

  if (!routine.numberOfDays) {
    throw new Error("Number of days is required!");
  }

  if (!routine.image) {
    throw new Error("Image is required!");
  }

  if (routine.generatedAI === undefined) {
    throw new Error("Generated AI is required!");
  }

  if (!routine.days) {
    throw new Error("Days is required!");
  }

  const newRoutineRef = doc(collection(FIRESTORE, "routines"));
  const userRef = doc(FIRESTORE, "users", userId);

  const exercisesNames = new Set();
  alreadySavedExercises.forEach((exercise) => {
    exercisesNames.add(exercise.exerciseName);
  });

  const newExercises = [];
  const newExercisesRefs = [];

  for (let i = 0; i < routine.days.length; i++) {
    for (let j = 0; j < routine.days[i].exercises.length; j++) {
      const exercise = routine.days[i].exercises[j];
      if (!exercisesNames.has(exercise.exerciseName)) {
        const newExercise = {
          defaultNumberOfReps: exercise.reps,
          defaultNumberOfSets: exercise.sets,
          defaultRestTime: exercise.restTime,
          defaultWeight: exercise.weight,
          defaultWeightSystem: exercise.weightSystem,
          equipment: exercise.equipment,
          exerciseName: exercise.exerciseName,
          muscle: exercise.muscle,
          type: exercise.type,
          oneRepMax: 0,
          userId: userId,
          weightRecord: [],
        };
        newExercises.push(newExercise);
        const newExerciseRef = doc(collection(FIRESTORE, "exercises"));
        newExercisesRefs.push(newExerciseRef);
        exercise.exerciseId = newExerciseRef.id;
      } else {
        // this means the exercise is already saved, so we need to find the id
        const savedExercise = alreadySavedExercises.find(
          (savedExercise) =>
            savedExercise.exerciseName === exercise.exerciseName,
        );
        if (!savedExercise) {
          throw new Error("Exercise not found!");
        }
        if (savedExercise.id) {
          exercise.exerciseId = savedExercise.id;
        } else if (savedExercise.exerciseId) {
          exercise.exerciseId = savedExercise.exerciseId;
        } else {
          throw new Error("Exercise id not found!");
        }
      }
    }
  }

  const newDays = [];
  const newDaysRefs = [];
  for (let i = 0; i < routine.numberOfDays; i++) {
    console.log(routine.days[i]);
    const newDay = {
      dayName: `Day ${i + 1}`,
      cardioExercises: routine.days[i].cardioExercises || [],
      routineId: newRoutineRef.id,
      totalDuration: routine.days[i].totalDuration,
      totalCalories: routine.days[i].totalCalories,
      totalSets: routine.days[i].totalSets,
      exercises: routine.days[i].exercises.map((exercise) => {
        return {
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          numberOfSets: exercise.sets,
          numberOfReps: exercise.reps,
          restTime: exercise.restTime,
          weight: exercise.weight,
          weightSystem: exercise.weightSystem,
          equipment: exercise.equipment,
          muscle: exercise.muscle,
          type: exercise.type,
        };
      }),
      userId: userId,
    };
    newDays.push(newDay);
    const newDayRef = doc(collection(FIRESTORE, "days"));
    newDaysRefs.push(newDayRef);
  }

  try {
    await runTransaction(FIRESTORE, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User does not exist!");
      }
      const routines = userDoc.data().routines;
      routines.push(newRoutineRef.id);
      transaction.update(userRef, { routines: routines });

      const exercises = userDoc.data().exercises;
      for (let i = 0; i < newExercises.length; i++) {
        exercises.push(newExercisesRefs[i].id);
      }
      transaction.update(userRef, { exercises: exercises });

      for (let i = 0; i < newExercises.length; i++) {
        transaction.set(newExercisesRefs[i], newExercises[i]);
      }

      for (let i = 0; i < newDays.length; i++) {
        transaction.set(newDaysRefs[i], newDays[i]);
      }

      const daysIds = newDaysRefs.map((dayRef) => dayRef.id);

      transaction.set(newRoutineRef, {
        routineName: routine.routineName,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        numberOfDays: routine.numberOfDays,
        image: routine.image,
        generatedAI: routine.generatedAI,
        shared: true,
        originalRoutineId: routine.originalRoutineId,
        days: daysIds,
      });
    });
    console.log("TRANSACTION SUCCESSFUL");
    const routineSnap = await getDoc(newRoutineRef);
    if (!routineSnap.exists()) {
      throw new Error("Routine does not exist!");
    }

    const newRoutine = routineSnap.data();

    // populate the days array from the daysIds
    const days = [];
    for (let i = 0; i < routine.numberOfDays; i++) {
      const dayRef = doc(FIRESTORE, "days", routineSnap.data().days[i]);
      const daySnap = await getDoc(dayRef);
      if (!daySnap.exists()) {
        throw new Error("Day does not exist!");
      }
      const day = daySnap.data();
      day.id = daySnap.id;
      days.push(day);
    }

    const exercises = [];
    for (let i = 0; i < newExercisesRefs.length; i++) {
      const exerciseRef = newExercisesRefs[i];
      const exerciseSnap = await getDoc(exerciseRef);
      if (!exerciseSnap.exists()) {
        throw new Error("Exercise does not exist!");
      }
      const exercise = exerciseSnap.data();
      exercise.id = exerciseSnap.id;
      exercises.push(exercise);
    }

    const daysFromFirebase = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      // get the day using day.id
      const dayRef = doc(FIRESTORE, "days", day.id);
      const daySnap = await getDoc(dayRef);
      if (!daySnap.exists()) {
        throw new Error("Day does not exist!");
      }
      const dayFromFirebase = daySnap.data();
      dayFromFirebase.id = daySnap.id;
      daysFromFirebase.push(dayFromFirebase);
    }

    newRoutine.days = daysFromFirebase;
    newRoutine.id = newRoutineRef.id;

    for (let i = 0; i < newRoutine.days.length; i++) {
      newRoutine.days[i].image = newRoutine.image;
    }

    return { newRoutine, newExercises: exercises };
  } catch (e) {
    console.error("TRANSACTION FAILED: ", e);
    throw new Error(e);
  }
}
