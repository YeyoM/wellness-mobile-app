import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

import { FIREBASE_AUTH } from "../firebaseConfig";

// User Related Imports
import getUserStorage from "../AsyncStorageFunctions/Users/getUserStorage.js";
import saveUserStorage from "../AsyncStorageFunctions/Users/saveUserStorage.js";
import GetUser from "../FirebaseFunctions/Users/GetUser.js";

export const AppContextProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);

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

  return (
    <AppContext.Provider
      value={{
        firebaseUser,
        setFirebaseUser,
        user,
        setUser,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
