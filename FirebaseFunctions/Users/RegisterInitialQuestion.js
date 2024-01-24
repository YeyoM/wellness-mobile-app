import { FIRESTORE, FIREBASE_AUTH } from "../../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";

export const registerInitialQuestions = async (
  questions,
  setLoading,
  setError,
) => {
  const userId = FIREBASE_AUTH.currentUser.uid;
  const email = FIREBASE_AUTH.currentUser.email;

  if (!userId) {
    setError("No user found");
    return;
  }

  if (!email) {
    setError("No email found");
    return;
  }

  if (!checkQuestion(questions, setError)) {
    return;
  }

  setLoading(true);
  try {
    await setDoc(doc(FIRESTORE, "users", userId), {
      name: questions.name,
      gender: questions.gender,
      age: questions.age,
      weight: questions.weight,
      weightUnit: questions.weightUnit,
      height: questions.height,
      heightUnit: questions.heightUnit,
      prevExperience: questions.prevExperience,
      fitnessLevel: questions.fitnessLevel,
      physicalLimitations: questions.physicalLimitations,
      objectives: questions.objectives,
      dietPreference: questions.dietPreference,
      trainingFrequency: questions.trainingFrequency,
      trainingDuration: questions.trainingDuration,
      trainingHours: questions.trainingHours,
      email: email,
      weightRecord: [],
      workouts: [],
      routines: [],
      exercises: [],
    });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }

  return;
};

const checkQuestion = (questions, setError) => {
  if (questions.name === "") {
    setError("Please enter your name");
    return false;
  }
  if (questions.gender === "") {
    setError("Please enter you gender");
    return false;
  }
  if (questions.age === "") {
    setError("Please enter your age");
    return false;
  }
  if (questions.weight === "") {
    setError("Please enter your weight");
    return false;
  }
  if (questions.weightUnit === "") {
    setError("Please enter your weight unit");
    return false;
  }
  if (questions.height === "") {
    setError("Please enter your height");
    return false;
  }
  if (questions.heightUnit === "") {
    setError("Please enter your height unit");
    return false;
  }
  if (questions.prevExperience === "") {
    setError("Please enter your previous experience");
    return false;
  }
  if (questions.fitnessLevel === "") {
    setError("Please enter your fitness level");
    return false;
  }
  if (questions.physicalLimitations === "") {
    setError("Please enter your physical limitations");
    return false;
  }
  if (questions.objectives === "") {
    setError("Please enter your objectives");
    return false;
  }
  if (questions.dietPreference === "") {
    setError("Please enter your diet preference");
    return false;
  }
  if (questions.trainingFrequency === "") {
    setError("Please enter your training frequency");
    return false;
  }
  if (questions.trainingDuration === "") {
    setError("Please enter your training duration");
    return false;
  }
  if (questions.trainingHours === "") {
    setError("Please enter your training hours");
    return false;
  }
  return true;
};
