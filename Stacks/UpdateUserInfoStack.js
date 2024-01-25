import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserUpdateHeight from "../Screens/UpdateUserInfo/UserUpdateHeight";

const Stack = createNativeStackNavigator();

export default function UpdateUserInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UserUpdateSystem"
    >
      <Stack.Screen
        name="Actualizar información (Altura)"
        component={UserUpdateHeight}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

