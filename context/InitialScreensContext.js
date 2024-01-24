import React, { createContext, useState } from "react";
import { registerInitialQuestions } from "../FirebaseFunctions/Users/RegisterInitialQuestion";

export const InitialScreensContext = createContext();

export const InitialScreensProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("21");
  const [weight, setWeight] = useState("70");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("170");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [prevExperience, setPrevExperience] = useState(false);
  const [fitnessLevel, setFitnessLevel] = useState("Intermediate");
  const [physicalLimitations, setPhysicalLimitations] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [dietPreference, setDietPreference] = useState("");
  const [trainingFrequency, setTrainingFrequency] = useState("");
  const [trainingDuration, setTrainingDuration] = useState("");
  const [trainingHours, setTrainingHours] = useState("");

  const printState = () => {
    console.log("name: ", name);
    console.log("gender: ", gender);
    console.log("age: ", age);
    console.log("weight: ", weight);
    console.log("weightUnit: ", weightUnit);
    console.log("height: ", height);
    console.log("heightUnit: ", heightUnit);
    console.log("prevExperience: ", prevExperience);
    console.log("fitnessLevel: ", fitnessLevel);
    console.log("physicalLimitations: ", physicalLimitations);
    console.log("objectives: ", objectives);
    console.log("dietPreference: ", dietPreference);
    console.log("trainingFrequency: ", trainingFrequency);
    console.log("trainingDuration: ", trainingDuration);
    console.log("trainingHours: ", trainingHours);
  };

  const registerInitialQuestionsFunction = async (setLoading, setError) => {
    const questions = {
      name,
      gender,
      age,
      weight,
      weightUnit,
      height,
      heightUnit,
      prevExperience,

      fitnessLevel,
      physicalLimitations,
      objectives,
      dietPreference,
      trainingFrequency,
      trainingDuration,
      trainingHours,
    };
    console.log("registerInitialQuestionsFunction");
    console.log(questions);
    await registerInitialQuestions(questions, setLoading, setError);
  };

  return (
    <InitialScreensContext.Provider
      value={{
        name,
        setName,
        gender,
        setGender,
        age,
        setAge,
        weight,
        setWeight,
        weightUnit,
        setWeightUnit,
        height,
        setHeight,
        heightUnit,
        setHeightUnit,
        prevExperience,
        setPrevExperience,
        physicalLimitations,
        setPhysicalLimitations,
        objectives,
        setObjectives,
        dietPreference,
        setDietPreference,
        trainingFrequency,
        setTrainingFrequency,
        trainingDuration,
        setTrainingDuration,
        trainingHours,
        setTrainingHours,
        fitnessLevel,
        setFitnessLevel,
        printState,
        registerInitialQuestionsFunction,
      }}
    >
      {children}
    </InitialScreensContext.Provider>
  );
};
