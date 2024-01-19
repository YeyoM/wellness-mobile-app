import React, { createContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditRoutineContext = createContext();

export const EditRoutineProvider = ({ children }) => {
  const [routine, setRoutine] = useState({});
  const [routineName, setRoutineName] = useState("");
  const [daysNames, setDaysNames] = useState([]);

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
  const initializeEditRoutine = async (routine, index) => {
    setRoutine(routine);
    setRoutineName(routine.routineName);
    setDaysNames(routine.days.map((day) => day.dayName));
    // set the routine before edit in the async storage
    await AsyncStorage.setItem("@routineBeforeEdit", JSON.stringify(routine));
    setRoutineBeforeEditIndex(index);
    setNumberOfDays(routine.days.length);
    setTotalDays(routine.days.length);
    setCurrentDay(0);
  };

  // Add this to the handleBack button in the edit routine page
  const clenUpEditRoutine = async () => {
    setRoutine({});
    setRoutineName("");
    setDaysNames([]);
    await AsyncStorage.removeItem("@routineBeforeEdit");
    setRoutineBeforeEditIndex(0);
    setNumberOfDays(3);
    setCurrentDay(0);
    setTotalDays(0);
    setCurrentExercise(null);
  };

  const getRoutineBeforeEdit = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@routineBeforeEdit");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
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
        routineName,
        setRoutineName,
        daysNames,
        setDaysNames,
        getRoutineBeforeEdit,
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
