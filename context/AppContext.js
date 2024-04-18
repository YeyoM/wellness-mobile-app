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

export const AppContextProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
