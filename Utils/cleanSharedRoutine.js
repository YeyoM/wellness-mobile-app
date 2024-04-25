import { getDoc, doc } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";

/** CleanSharedRoutine
 * @param {object} routine - The routine object
 * @returns {object} - The routine object, but cleaned
 * @throws {Error} - If the routine object is not provided or invalid
 * @description - This function takes a routine object and cleans it, used
 * when saving a shared routine to the database, deletes the ids and other
 * unnecessary data
 */
export default async function cleanSharedRoutine(routine) {
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

  const cleanedRoutine = {
    routineName: routine.routineName,
    numberOfDays: routine.numberOfDays,
    image: routine.image,
    generatedAI: routine.generatedAI,
    shared: true,
    originalRoutineId: routine.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    days: await Promise.all(
      routine.days.map(async (day) => {
        const cleanedDay = {
          dayName: day.dayName,
          totalDuration: day.totalDuration,
          totalCalories: day.totalCalories,
          totalSets: day.totalSets,
          cardioExercises: day.cardioExercises || [],
          exercises: await Promise.all(
            day.exercises.map(async (exercise) => {
              if (!exercise.muscle || !exercise.equipment || !exercise.type) {
                const exerciseDoc = await getDoc(
                  doc(FIRESTORE, "exercises", exercise.exerciseId),
                );
                const exerciseData = exerciseDoc.data();
                return {
                  exerciseName: exerciseData.exerciseName,
                  sets: exercise.numberOfSets,
                  reps: exercise.numberOfReps,
                  weight: exercise.weight,
                  weightSystem: exercise.weightSystem,
                  restTime: exercise.restTime,
                  equipment: exerciseData.equipment,
                  muscle: exerciseData.muscle,
                  type: exerciseData.type,
                };
              } else {
                return {
                  exerciseName: exercise.exerciseName,
                  sets: exercise.numberOfSets,
                  reps: exercise.numberOfReps,
                  weight: exercise.weight,
                  weightSystem: exercise.weightSystem,
                  restTime: exercise.restTime,
                  equipment: exercise.equipment,
                  muscle: exercise.muscle,
                  type: exercise.type,
                };
              }
            }),
          ),
        };
        return cleanedDay;
      }),
    ),
  };

  // display the cleaned routine console.log("CLEANED ROUTINE: ", cleanedRoutine);
  console.log("CLEANED ROUTINE: ", cleanedRoutine);
  for (let i = 0; i < cleanedRoutine.days.length; i++) {
    console.log("CLEANED ROUTINE DAY: ", cleanedRoutine.days[i]);
  }

  return cleanedRoutine;
}
