import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserInputName from "../Screens/InitialScreens/UserInputName";
import UserInputGender from "../Screens/InitialScreens/UserInputGender";
import UserInputAge from "../Screens/InitialScreens/UserInputAge.js";
import UserInputWeight from "../Screens/InitialScreens/UserInputWeight";
import UserInputWeightUnit from "../Screens/InitialScreens/UserInputWeightUnit";
import UserInputHeight from "../Screens/InitialScreens/UserInputHeight";
import UserInputHeightUnit from "../Screens/InitialScreens/UserInputHeightUnit";
import UserInputPhysicalLimitations from "../Screens/InitialScreens/UserInputPhysicalLimitations";
import UserInputObjectives from "../Screens/InitialScreens/UserInputObjectives";
import UserInputDietPreference from "../Screens/InitialScreens/UserInputDietPreference";
import UserInputFrequency from "../Screens/InitialScreens/UserInputFrequency";
import UserInputFitnessLevel from "../Screens/InitialScreens/UserInputFitnessLevel";
import UserInputPreviuosFitnessExperience from "../Screens/InitialScreens/UserInputPreviousFitnessExperience";
import UserInputTrainingDuration from "../Screens/InitialScreens/UserInputTrainingDuration";
import UserInputTrainingHours from "../Screens/InitialScreens/UserInputTrainingHours";
import UserInputFinishScreen from "../Screens/InitialScreens/UserInputFinishScreen";

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
        name="About you (Weight Unit)"
        component={UserInputWeightUnit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Weight)"
        component={UserInputWeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Height Unit)"
        component={UserInputHeightUnit}
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
        name="About you (Fitness Level)"
        component={UserInputFitnessLevel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Diet Preference)"
        component={UserInputDietPreference}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Training Frequency)"
        component={UserInputFrequency}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Training Duration)"
        component={UserInputTrainingDuration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Training Hours)"
        component={UserInputTrainingHours}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About you (Finish)"
        component={UserInputFinishScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
