import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './Screens/Signup';
import Login from './Screens/Login';
import MyInformation from './Screens/MyInformation';
import MyGoals from './Screens/MyGoals';
import WorkoutInProgress from './Screens/WorkoutInProgress';
import WorkoutFinished1 from './Screens/WorkoutFinished1';
import WorkoutFinished2 from './Screens/WorkoutFinished2';

import InputUserInfoStack from './Stacks/InputUserInfoStack';
import UpdateUserInfoStack from './Stacks/UpdateUserInfoStack';

import MainTabs from './Stacks/MainTabs';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from './firebaseConfig';

import { InitialScreensProvider } from './context/InitialScreensContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [])

  return (
    <InitialScreensProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {
            user
              ? (
                <Stack.Group>
                  <Stack.Screen name="Main Tabs" component={MainTabs} options={{ headerShown: false }} />
                  <Stack.Screen name="User Information" component={MyInformation} options={{ headerShown: false }} />
                  <Stack.Screen name="User Goals" component={MyGoals} options={{ headerShown: false }} />
                  <Stack.Screen name="User Input" component={InputUserInfoStack} options={{ headerShown: false }} />
                  <Stack.Screen name="User Update" component={UpdateUserInfoStack} options={{ headerShown: false }} />
                  <Stack.Screen name="Workout In Progress" component={WorkoutInProgress} options={{ headerShown: false }} />
                  <Stack.Screen name="Workout Finished 1" component={WorkoutFinished1} options={{ headerShown: false }} />
                  <Stack.Screen name="Workout Finished 2" component={WorkoutFinished2} options={{ headerShown: false }} />
                </Stack.Group>
              )
              : (
                <Stack.Group>
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                  <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                </Stack.Group>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </InitialScreensProvider>
  );
}