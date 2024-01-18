import React, { createContext, useState, useEffect } from "react";

export const EditRoutineContext = createContext();

import { FIREBASE_AUTH } from "../firebaseConfig";

export const EditRoutineProvider = ({ children }) => {
  const [routine, setRoutine] = useState({});

  const [routineBeforeEdit, setRoutineBeforeEdit] = useState({});
  const [routineBeforeEditIndex, setRoutineBeforeEditIndex] = useState(0);

  const [numberOfDays, setNumberOfDays] = useState(3);
  const [currentDay, setCurrentDay] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  // Initialize the current exercise to null and then
  // set it to the exercise that is clicked on on the
  // underlay left function in EditExerciseList.js
  // If you go back, set it back to null or if
  const [currentExercise, setCurrentExercise] = useState(null);

  // Add this to the handleEdit button in the accordion
  const initializeEditRoutine = (routine, index) => {
    setRoutine(routine);
    setRoutineBeforeEdit(routine);
    setRoutineBeforeEditIndex(index);
    setNumberOfDays(routine.days.length);
    setTotalDays(routine.days.length);
  };

  // Add this to the handleBack button in the edit routine page
  const clenUpEditRoutine = () => {
    setRoutine({});
    setRoutineBeforeEdit({});
    setRoutineBeforeEditIndex(0);
    setNumberOfDays(3);
    setCurrentDay(0);
    setTotalDays(0);
    setCurrentExercise(null);
  };

  const updateRoutineNames = (routineName, daysNames, setRoutine) => {
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.routineName = routineName;
      newRoutine.days = newRoutine.days.map((day, index) => {
        day.dayName = daysNames[index];
        return day;
      });
      return newRoutine;
    });
  };

  return (
    <EditRoutineContext.Provider
      value={{
        routine,
        setRoutine,
        routineBeforeEdit,
        setRoutineBeforeEdit,
        routineBeforeEditIndex,
        setRoutineBeforeEditIndex,
        numberOfDays,
        setNumberOfDays,
        currentDay,
        setCurrentDay,
        totalDays,
        setTotalDays,
        currentExercise,
        setCurrentExercise,
        initializeEditRoutine,
        clenUpEditRoutine,
        updateRoutineNames,
      }}
    >
      {children}
    </EditRoutineContext.Provider>
  );
};
