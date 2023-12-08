import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './Screens/Signup';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Acerca de ti (Nombre)" component={UserInputName} />
        <Stack.Screen name="Acerca de ti (Género)" component={UserInputGender} />
        <Stack.Screen name="Acerca de ti (Cumpleaños)" component={UserInputBirthday} />
        <Stack.Screen name="Acerca de ti (Peso)" component={UserInputInitialWeight} />
        <Stack.Screen name="Acerca de ti (Peso ideal)" component={UserInputFinalWeight} />
        <Stack.Screen name="Acerca de ti (Altura)" component={UserInputHeight} />
        <Stack.Screen name="Acerca de ti (Objetivos)" component={UserInputObjectives} />
        <Stack.Screen name="Acerca de ti (Ejercicios)" component={UserInputExercises} />
        <Stack.Screen name="Acerca de ti (Frecuencia)" component={UserInputFrequency} />
        <Stack.Screen name="Acerca de ti (Días)" component={UserInputDays} />
        <Stack.Screen name="Acerca de ti (Hora)" component={UserInputTime} />
        <Stack.Screen name="Acerca de ti (Nivel de fitness)" component={UserInputFitnessLevel} />
        <Stack.Screen name="Acerca de ti (Activo)" component={UserInputActive} />
        <Stack.Screen name="Acerca de ti (Resumen)" component={UserInputSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}