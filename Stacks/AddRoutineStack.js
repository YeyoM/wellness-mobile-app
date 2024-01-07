import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectAI from "../Screens/AddRoutineScreens/SelectAI";
import SelectNUmberDaysPerWeek from "../Screens/AddRoutineScreens/SelectNumberDaysPerWeek";
import SelectWorkoutDuration from "../Screens/AddRoutineScreens/SelectWorkoutDuration";

export default function AddRoutineStack() {
  
    const Stack = createNativeStackNavigator();
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Select AI"
      >
        <Stack.Screen name="Select AI" component={SelectAI} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Select Number Days Per Week" component={SelectNUmberDaysPerWeek} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Select Workout Duration" component={SelectWorkoutDuration} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    )
  }