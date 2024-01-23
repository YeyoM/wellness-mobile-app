import React, { createContext, useState } from "react";

export const InitialScreensContext = createContext();

export const InitialScreensProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("21");
  const [preferredSystem, setpreferredSystem] = useState("");
  const [weight, setWeight] = useState("55");
  const [height, setHeight] = useState("");
  const [prevExperience, setPrevExperience] = useState(false);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [physicalLimitations, setPhysicalLimitations] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [dietPreference, setDietPreference] = useState("");
  const [trainingFrequency, setTrainingFrequency] = useState("");
  const [trainingDuration, setTrainingDuration] = useState("");
  const [trainingHours, setTrainingHours] = useState("");

  const [exerciseDays, setExerciseDays] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [reminders, setReminders] = useState(false);
  const [activityLevel, setActivityLevel] = useState("");

  return (
    <InitialScreensContext.Provider
      value={{
        name,
        setName,
        gender,
        setGender,
        age,
        setAge,
        preferredSystem,
        setpreferredSystem,
        weight,
        setWeight,
        height,
        setHeight,
        prevExperience,
        setPrevExperience,
        physicalLimitations,
        setPhysicalLimitations,
        objectives,
        setObjectives,
        dietPreference,
        setDietPreference,
        exercises,
        setExercises,
        trainingFrequency,
        setTrainingFrequency,
        trainingDuration,
        setTrainingDuration,
        trainingHours,
        setTrainingHours,
        exerciseDays,
        setExerciseDays,
        reminders,
        setReminders,
        fitnessLevel,
        setFitnessLevel,
        activityLevel,
        setActivityLevel,
      }}
    >
      {children}
    </InitialScreensContext.Provider>
  );
};
