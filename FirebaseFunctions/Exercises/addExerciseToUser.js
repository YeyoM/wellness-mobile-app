import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebaseConfig.js";

export const addExerciseToUser = async (userId, exercise) => {
  // check if the exercise is not already in the user's exercises
  // if it is, don't add it, the exercises are in an array of strings
  try {
    const userDoc = doc(FIRESTORE, "users", userId);
    const userDocSnap = await getDoc(userDoc);

    const userDocData = userDocSnap.data();
    const userExercisesIds = userDocData.exercises;

    // get all the exercises from the exercises collection
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

    console.log("AFTER GETTING EXERCISES");

    // check if the exercise is already in the user's exercises
    console.log(exercise);
    const exists = exercises.find(
      (ex) => ex.exerciseName === exercise.exerciseName,
    );

    if (exists) {
      console.log("Exercise already saved");
      throw new Error("Exercise already saved");
    }

    console.log("AFTER CHECKING IF EXERCISE EXISTS");

    // if it is not, create a new document in the exercises collection
    // and add the id to the user's exercises array

    const newExerciseRef = await addDoc(collection(FIRESTORE, "exercises"), {
      ...exercise,
    });

    const newExerciseId = newExerciseRef.id;

    console.log("AFTER CREATING NEW EXERCISE");

    // update the user's exercises array
    // add the new exercise's id to the array
    // and update the user's document

    const updatedExercises = [...userExercisesIds, newExerciseId];

    await updateDoc(userDoc, {
      exercises: updatedExercises,
    });

    console.log("AFTER UPDATING USER'S EXERCISES");

    // add the new exercise to the exercises array and return that array
    const newExercise = {
      id: newExerciseId,
      ...exercise,
    };
    exercises.push(newExercise);

    console.log("AFTER ADDING NEW EXERCISE TO EXERCISES");
    console.log(exercises);

    return exercises;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
