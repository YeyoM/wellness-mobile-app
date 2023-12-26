import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserUpdateSystem from '../Screens/UpdateUserInfo/UserUpdateSystem';
import UserUpdateHeight from '../Screens/UpdateUserInfo/UserUpdateHeight';
import UserUpdateObjectives from '../Screens/UpdateUserInfo/UserUpdateObjectives';
import UserUpdateExercises from '../Screens/UpdateUserInfo/UserUpdateExercises';
import UserUpdateFrequency from '../Screens/UpdateUserInfo/UserUpdateFrequency';
import UserUpdateDays from '../Screens/UpdateUserInfo/UserUpdateDays';
import UserUpdateTime from '../Screens/UpdateUserInfo/UserUpdateTime';
import UserUpdateFitnessLevel from '../Screens/UpdateUserInfo/UserUpdateFitnessLevel';
import UserUpdateActive from '../Screens/UpdateUserInfo/UserUpdateActive';

const Stack = createNativeStackNavigator();

export default function UpdateUserInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="UserUpdateSystem"
    >
      <Stack.Screen name="Actualizar información (Sistema de preferencia)" component={UserUpdateSystem} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Altura)" component={UserUpdateHeight} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Objetivos)" component={UserUpdateObjectives} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Ejercicios)" component={UserUpdateExercises} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Frecuencia)" component={UserUpdateFrequency} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Actualizar información (Días)" component={UserUpdateDays} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Actualizar información (Hora)" component={UserUpdateTime} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Nivel de fitness)" component={UserUpdateFitnessLevel} options={{ headerShown: false }} />
      <Stack.Screen name="Actualizar información (Activo)" component={UserUpdateActive} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}