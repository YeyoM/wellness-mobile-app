import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

import { FIREBASE_AUTH } from "../firebaseConfig";

// User Related Imports
import getUserStorage from "../AsyncStorageFunctions/Users/getUserStorage.js";
import saveUserStorage from "../AsyncStorageFunctions/Users/saveUserStorage.js";
import GetUser from "../FirebaseFunctions/Users/GetUser.js";

// Exercise Related Imports
import { getSavedExercises } from "../FirebaseFunctions/Exercises/getSavedExercises.js";
import getExercisesStorage from "../AsyncStorageFunctions/Exercises/getExercisesStorage.js";
import saveExercisesStorage from "../AsyncStorageFunctions/Exercises/saveExercisesStorage.js";

// Workout Related Imports
import getWorkouts from "../FirebaseFunctions/Workouts/GetWorkouts.js";
import getWorkoutsStorage from "../AsyncStorageFunctions/Workouts/getWorkoutsStorage.js";
import saveWorkoutsStorage from "../AsyncStorageFunctions/Workouts/saveWorkoutsStorage.js";

// Days Related Imports
import getAllDays from "../FirebaseFunctions/Days/getAllDays.js";
import getDaysStorage from "../AsyncStorageFunctions/Days/getDaysStorage.js";
import saveDaysStorage from "../AsyncStorageFunctions/Days/saveDaysStorage.js";

// Routines Related Imports
import { getSavedRoutines } from "../FirebaseFunctions/Routines/getSavedRoutines.js";
import { getRoutine } from "../FirebaseFunctions/Routines/getRoutine.js";
import getRoutinesStorage from "../AsyncStorageFunctions/Routines/getRoutinesStorage.js";
import saveRoutinesStorage from "../AsyncStorageFunctions/Routines/saveRoutinesStorage.js";

// Favorite Routine Related Imports
import getFavoriteRoutine from "../AsyncStorageFunctions/Routines/getFavoriteRoutine.js";
import deleteFavoriteRoutine from "../AsyncStorageFunctions/Routines/deleteFavoriteRoutine.js";

export const AppContextProvider = ({ children }) => {
  // Main objects
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [days, setDays] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);

  // Miscellanous objects
  const [favoriteRoutine, setFavoriteRoutine] = useState(null);

  // FIREBASE USER METHODS AND LISTENERS
  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  // USER METHODS AND LISTENERS
  useEffect(() => {
    getUserStorage()
      .then((user) => {
        if (user) {
          setUser(user);
        } else {
          if (firebaseUser) {
            GetUser(firebaseUser.uid).then((user) => {
              setUser(user);
              saveUserStorage(user);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateUser = async (user) => {
    setUser(user);
    await saveUserStorage(user);
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      const user = await GetUser(firebaseUser.uid);
      setUser(user);
      await saveUserStorage(user);
    } else {
      setUser(null);
    }
  };

  // EXERCISES METHODS AND LISTENERS
  useEffect(() => {
    getExercisesStorage()
      .then((exercises) => {
        if (exercises) {
          setExercises(exercises);
        } else {
          if (firebaseUser) {
            getSavedExercises(firebaseUser.uid).then((exercises) => {
              setExercises(exercises);
              saveExercisesStorage(exercises);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateExercises = async (exercises) => {
    setExercises(exercises);
    await saveExercisesStorage(exercises);
  };

  const refreshExercises = async () => {
    try {
      if (firebaseUser) {
        const exercises = await getSavedExercises(firebaseUser.uid);
        setExercises(exercises);
        await saveExercisesStorage(exercises);
      } else {
        setExercises([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // WORKOUTS METHODS AND LISTENERS
  useEffect(() => {
    getWorkoutsStorage()
      .then((workouts) => {
        if (workouts) {
          setWorkouts(workouts);
        } else {
          if (firebaseUser) {
            getWorkouts(firebaseUser.uid).then((workouts) => {
              setWorkouts(workouts);
              saveWorkoutsStorage(workouts);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateWorkouts = async (workouts) => {
    setWorkouts(workouts);
    await saveWorkoutsStorage(workouts);
  };

  const refreshWorkouts = async () => {
    try {
      if (firebaseUser) {
        const workouts = await getWorkouts(firebaseUser.uid);
        setWorkouts(workouts);
        await saveWorkoutsStorage(workouts);
      } else {
        setWorkouts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshNewWorkout = async (workout) => {
    // Refresh the state and async storage by adding the new workout
    const updatedWorkouts = [...workouts, workout];
    await updateWorkouts(updatedWorkouts);
  };

  // DAYS METHODS AND LISTENERS
  useEffect(() => {
    getDaysStorage()
      .then((days) => {
        if (days) {
          setDays(days);
        } else {
          if (firebaseUser) {
            getAllDays(firebaseUser.uid).then((days) => {
              setDays(days);
              saveDaysStorage(days);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateDays = async (days) => {
    setDays(days);
    await saveDaysStorage(days);
  };

  const refreshDays = async () => {
    try {
      if (firebaseUser) {
        const days = await getAllDays(firebaseUser.uid);
        setDays(days);
        await saveDaysStorage(days);
      } else {
        setDays([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshSpecificDaysFromRoutine = async (routine) => {
    const ids = new Set();

    for (const day of routine.days) {
      ids.add(day.id);
    }

    const notRefreshedDays = days.filter((day) => !ids.has(day.id));
    const refreshedRoutine = routines.find((r) => r.id === routine.id);

    const refreshedDays = refreshedRoutine.days;
    const newDays = [...notRefreshedDays, ...refreshedDays];
    await updateDays(newDays);
  };

  const deleteDaysState = async (routine) => {
    // Delete from async storage and state the days contained in the routine
    const ids = new Set();

    for (const day of routine.days) {
      ids.add(day.id);
    }

    const updatedDays = days.filter((day) => !ids.has(day.id));
    await updateDays(updatedDays);
    setDays(updatedDays);
  };

  // ROUTINES METHODS AND LISTENERS
  useEffect(() => {
    getRoutinesStorage()
      .then((routines) => {
        if (routines) {
          setRoutines(routines);
        } else {
          if (firebaseUser) {
            getSavedRoutines(firebaseUser.uid).then((routines) => {
              setRoutines(routines);
              saveRoutinesStorage(routines);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateRoutines = async (routines) => {
    setRoutines(routines);
    await saveRoutinesStorage(routines);
  };

  const refreshRoutines = async () => {
    try {
      if (firebaseUser) {
        const routines = await getSavedRoutines(firebaseUser.uid);
        setRoutines(routines);
        await saveRoutinesStorage(routines);
      } else {
        setRoutines([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshSpecificRoutine = async (routine) => {
    try {
      if (firebaseUser) {
        const refreshedRoutine = await getRoutine(routine.id);
        const updatedRoutines = routines.map((r) =>
          r.id === refreshedRoutine.id ? refreshedRoutine : r,
        );
        await updateRoutines(updatedRoutines);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoutineState = async (routine) => {
    const updatedRoutines = routines.filter((r) => r.id !== routine.id);
    await updateRoutines(updatedRoutines);
    setRoutines(updatedRoutines);
  };

  // FAVORITE ROUTINE METHODS AND LISTENERS
  useEffect(() => {
    getFavoriteRoutine()
      .then((routine) => {
        setFavoriteRoutine(routine);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateFavoriteRoutine = async (routine) => {
    setFavoriteRoutine(routine);
    await setFavoriteRoutine(routine);
  };

  const removeFavoriteRoutine = async () => {
    setFavoriteRoutine(null);
    await deleteFavoriteRoutine();
  };

  // CARDIO EXERCISES METHODS AND LISTENERS
  useEffect(() => {
    const cardioExercises = [
      {
        exerciseName: "Treadmill",
        equipment: "Treadmill",
        defaultDuration: 30,
        defaultResistanceLevel: null,
        defaultIncline: 1,
        defaultSpeed: 5,
      },
      {
        exerciseName: "Elliptical",
        equipment: "Elliptical",
        defaultDuration: 30,
        defaultResistanceLevel: 1,
        defaultIncline: null,
        defaultSpeed: null,
      },
      {
        exerciseName: "Stationary Bike",
        equipment: "Stationary Bike",
        defaultDuration: 30,
        defaultResistanceLevel: 1,
        defaultIncline: null,
        defaultSpeed: null,
      },
      {
        exerciseName: "Rowing Machine",
        equipment: "Rowing Machine",
        defaultDuration: 30,
        defaultResistanceLevel: 1,
        defaultIncline: null,
        defaultSpeed: null,
      },
    ];
    setCardioExercises(cardioExercises);
  }, []);

  const resetContext = () => {
    setFirebaseUser(null);
    setUser(null);
    setExercises([]);
    setWorkouts([]);
    setDays([]);
    setRoutines([]);
    setFavoriteRoutine(null);
  };

  return (
    <AppContext.Provider
      value={{
        firebaseUser,
        setFirebaseUser,
        user,
        setUser,
        updateUser,
        refreshUser,
        exercises,
        setExercises,
        updateExercises,
        refreshExercises,
        workouts,
        setWorkouts,
        updateWorkouts,
        refreshWorkouts,
        refreshNewWorkout,
        days,
        setDays,
        updateDays,
        refreshDays,
        refreshSpecificDaysFromRoutine,
        deleteDaysState,
        routines,
        setRoutines,
        updateRoutines,
        refreshRoutines,
        refreshSpecificRoutine,
        deleteRoutineState,
        favoriteRoutine,
        setFavoriteRoutine,
        updateFavoriteRoutine,
        removeFavoriteRoutine,
        cardioExercises,
        setCardioExercises,
        resetContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
