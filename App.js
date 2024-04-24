import * as React from "react";
import {
  NavigationContainer,
  NavigationContainerRefContext,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import MyInformation from "./Screens/MyInformation";
import MyGoals from "./Screens/MyGoals";
import WorkoutInProgress from "./Screens/WorkoutInProgress";
import WorkoutFinished1 from "./Screens/WorkoutFinished1";
import WorkoutFinished2 from "./Screens/WorkoutFinished2";
import WorkoutShare from "./Screens/WorkoutShare";

import InputUserInfoStack from "./Stacks/InputUserInfoStack";
import UpdateUserInfoStack from "./Stacks/UpdateUserInfoStack";
import AddRoutineStack from "./Stacks/AddRoutineStack";
import EditRoutine from "./Screens/EditRoutine";
import EditExercise from "./Screens/EditExercise";
import EditCardioExercise from "./Screens/EditCardioExercise";
import AddLift from "./Screens/AddLift";
import DaysList from "./Screens/DaysList";

import MainTabs from "./Stacks/MainTabs";
import AccountSettings from "./Screens/AccountSettings";
import NotificationSettings from "./Screens/NotificationSettings";
import PersonalInfoSettings from "./Screens/PersonalInfoSettings";
import DeleteAccount from "./Screens/DeleteAccount";

import MyStats from "./Screens/MyStats";
import ProgressGraphs from "./Screens/ProgressGraphs";
import OneRepMaxList from "./Screens/OneRepMaxList";
import EditOneRepMax from "./Screens/EditOneRepMax";

import SharedRoutine from "./Screens/SharedRoutine";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { useURL, parse, addEventListener } from "expo-linking";

import { AppContextProvider } from "./context/AppContext";
import { InitialScreensProvider } from "./context/InitialScreensContext";
import { CreateRoutineProvider } from "./context/CreateRoutineContext";
import { EditRoutineProvider } from "./context/EditRoutineContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const navigationRef = React.useRef();
  const isNavigationReady = React.useContext(NavigationContainerRefContext);

  useEffect(() => {
    if (isNavigationReady) {
      navigationRef.current = isNavigationReady.getCurrentNavigationContainer();
    }
  }, [isNavigationReady]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    addEventListener("url", handleDeepLink);
    return () => {};
  }, []);

  const handleDeepLink = (event) => {
    const { queryParams } = parse(event.url);

    if (queryParams.id && queryParams.resource) {
      if (queryParams.resource === "routine") {
        console.log("Routine ID: " + queryParams.id);
        navigationRef.current.navigate("Shared Routine", {
          routineId: queryParams.id,
        });
      }
    }
  };

  return (
    <AppContextProvider>
      <InitialScreensProvider>
        <CreateRoutineProvider>
          <EditRoutineProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator>
                {user ? (
                  <Stack.Group>
                    <Stack.Screen
                      name="Main Tabs"
                      component={MainTabs}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="User Information"
                      component={MyInformation}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="User Goals"
                      component={MyGoals}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="User Input"
                      component={InputUserInfoStack}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="User Update"
                      component={UpdateUserInfoStack}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Days List"
                      component={DaysList}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Add Routine"
                      component={AddRoutineStack}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Workout In Progress"
                      component={WorkoutInProgress}
                      options={{ headerShown: false, gestureEnabled: false }}
                    />
                    <Stack.Screen
                      name="Workout Finished 1"
                      component={WorkoutFinished1}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Workout Finished 2"
                      component={WorkoutFinished2}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Share Workout"
                      component={WorkoutShare}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Edit Routine"
                      component={EditRoutine}
                      options={{ headerShown: false, gestureEnabled: false }}
                    />
                    <Stack.Screen
                      name="Edit Exercise"
                      component={EditExercise}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Edit Cardio Exercise"
                      component={EditCardioExercise}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Add Lift"
                      component={AddLift}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="My Stats"
                      component={MyStats}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Progress Graphs"
                      component={ProgressGraphs}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="One Rep Max List"
                      component={OneRepMaxList}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Edit One Rep Max"
                      component={EditOneRepMax}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Account Settings"
                      component={AccountSettings}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Notification Settings"
                      component={NotificationSettings}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Personal Info Settings"
                      component={PersonalInfoSettings}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Delete Account"
                      component={DeleteAccount}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Shared Routine"
                      component={SharedRoutine}
                      options={{ headerShown: false }}
                    />
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Signup"
                      component={Signup}
                      options={{ headerShown: false }}
                    />
                  </Stack.Group>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </EditRoutineProvider>
        </CreateRoutineProvider>
      </InitialScreensProvider>
    </AppContextProvider>
  );
}
