import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ManageAccount from './Screens/ManageAccount';

import UserInputName from './Screens/UserInputName';
import UserInputGender from './Screens/UserInputGender';
import UserInputBirthday from './Screens/UserInputBirthday';
import UserInputInitialWeight from './Screens/UserInputInitialWeight';
import UserInputFinalWeight from './Screens/UserInputFinalWeight';
import UserInputHeight from './Screens/UserInputHeight';
import UserInputObjectives from './Screens/UserInputObjectives';
import UserInputExercises from './Screens/UserInputExercises';
import UserInputFrequency from './Screens/UserInputFrequency';
import UserInputDays from './Screens/UserInputDays';
import UserInputTime from './Screens/UserInputTime';
import UserInputFitnessLevel from './Screens/UserInputFitnessLevel';
import UserInputActive from './Screens/UserInputActive';
import UserInputSummary from './Screens/UserInputSummary';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from './firebaseConfig';

import { InitialScreensProvider } from './context/InitialScreensContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

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
              <>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="ManageAccount" component={ManageAccount} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Nombre)" component={UserInputName} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="Acerca de ti (Género)" component={UserInputGender} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Cumpleaños)" component={UserInputBirthday} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Peso)" component={UserInputInitialWeight} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Peso ideal)" component={UserInputFinalWeight} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Altura)" component={UserInputHeight} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Objetivos)" component={UserInputObjectives} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Ejercicios)" component={UserInputExercises} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Frecuencia)" component={UserInputFrequency} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Días)" component={UserInputDays} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Hora)" component={UserInputTime} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Nivel de fitness)" component={UserInputFitnessLevel} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Activo)" component={UserInputActive} options={{ headerShown: false }} />
                <Stack.Screen name="Acerca de ti (Resumen)" component={UserInputSummary} options={{ headerShown: false }} />
              </>
            )
            : (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </InitialScreensProvider>
  );
}