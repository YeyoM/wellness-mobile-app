import React, { createContext, useState } from "react";

export const InitialScreensContext = createContext();

export const InitialScreensProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("16");
  const [preferredSystem, setpreferredSystem] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [prevExperience, setPrevExperience] = useState(false);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [physicalLimitations, setPhysicalLimitations] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [exerciseDays, setExerciseDays] = useState([]);
  const [reminders, setReminders] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState("");
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
        exercises,
        setExercises,
        exerciseFrequency,
        setExerciseFrequency,
        exerciseDays,
        setExerciseDays,
        reminders,
        setReminders,
        exerciseDuration,
        setExerciseDuration,
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
