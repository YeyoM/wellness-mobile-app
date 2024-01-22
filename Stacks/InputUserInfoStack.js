import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserInputName from "../Screens/InitialScreens/UserInputName";
import UserInputGender from "../Screens/InitialScreens/UserInputGender";
import UserInputAge from "../Screens/InitialScreens/UserInputBirthday";
import UserInputInitialWeight from "../Screens/InitialScreens/UserInputInitialWeight";
import UserInputHeight from "../Screens/InitialScreens/UserInputHeight";
import UserInputPhysicalLimitations from "../Screens/InitialScreens/UserInputPhysicalLimitations";
import UserInputObjectives from "../Screens/InitialScreens/UserInputObjectives";
import UserInputDietPreference from "../Screens/InitialScreens/UserInputDietPreference";
import UserInputExercises from "../Screens/InitialScreens/UserInputExercises";
import UserInputFrequency from "../Screens/InitialScreens/UserInputFrequency";
import UserInputDays from "../Screens/InitialScreens/UserInputDays";
import UserInputTime from "../Screens/InitialScreens/UserInputTime";
import UserInputFitnessLevel from "../Screens/InitialScreens/UserInputFitnessLevel";
import UserInputActive from "../Screens/InitialScreens/UserInputActive";
import UserInputSummary from "../Screens/InitialScreens/UserInputSummary";
import UserInputPreviuosFitnessExperience from "../Screens/InitialScreens/UserInputPreviousFitnessExperience";

export default function InputUserInfoStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="About you (Name)"
    >
      <Stack.Screen
        name="About you (Name)"
        component={UserInputName}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="About you (Gender)"
        component={UserInputGender}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Age)"
        component={UserInputAge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Weight)"
        component={UserInputInitialWeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Height)"
        component={UserInputHeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Previous Fitness Experience)"
        component={UserInputPreviuosFitnessExperience}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Physical Limitations)"
        component={UserInputPhysicalLimitations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Objectives)"
        component={UserInputObjectives}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Diet Preference)"
        component={UserInputDietPreference}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Ejercicios)"
        component={UserInputExercises}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Frecuencia)"
        component={UserInputFrequency}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Días)"
        component={UserInputDays}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Hora)"
        component={UserInputTime}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Fitness Level)"
        component={UserInputFitnessLevel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Activo)"
        component={UserInputActive}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acerca de ti (Resumen)"
        component={UserInputSummary}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
