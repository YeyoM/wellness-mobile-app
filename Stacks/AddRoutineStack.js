import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectAI from "../Screens/AddRoutineScreens/SelectAI";
import SelectRoutineImage from "../Screens/AddRoutineScreens/SelectRoutineImage.js";
import SelectRoutineImageAI from "../Screens/AddRoutineScreens/SelectRoutineImageAI.js";
import SelectNumberDaysPerWeek from "../Screens/AddRoutineScreens/SelectNumberDaysPerWeek";
import SelectNUmberDaysPerWeekAI from "../Screens/AddRoutineScreens/SelectNumberDaysPerWeekAI";
import SelectWorkoutDuration from "../Screens/AddRoutineScreens/SelectWorkoutDuration";
import SelectSplitPreference from "../Screens/AddRoutineScreens/SelectSplitPreference";
import CreatingRoutineAI from "../Screens/AddRoutineScreens/CreatingRoutineAI";

export default function AddRoutineStack({ route }) {
  const { newRoutineIndex } = route.params;

  if (newRoutineIndex === undefined) {
    throw new Error("newRoutineIndex is undefined");
  }

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Select AI"
    >
      <Stack.Screen
        name="Select AI"
        component={SelectAI}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Routine Image AI"
        component={SelectRoutineImageAI}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Routine Image"
        component={SelectRoutineImage}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Number Days Per Week AI"
        component={SelectNUmberDaysPerWeekAI}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Number Days Per Week"
        component={SelectNumberDaysPerWeek}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Workout Duration"
        component={SelectWorkoutDuration}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Select Split Preference"
        component={SelectSplitPreference}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
      <Stack.Screen
        name="Creating Routine AI"
        component={CreatingRoutineAI}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{ newRoutineIndex }}
      />
    </Stack.Navigator>
  );
}
