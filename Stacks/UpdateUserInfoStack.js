import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfile from "../Screens/EditProfile";
import UpdateName from "../Screens/UpdateUserInfo/UpdateName";
import UpdateBio from "../Screens/UpdateUserInfo/UpdateBio";
import UpdateWeightUnit from "../Screens/UpdateUserInfo/UpdateWeightUnit";
import UpdateWeight from "../Screens/UpdateUserInfo/UpdateWeight";
import UpdateHeightUnit from "../Screens/UpdateUserInfo/UpdateHeightUnit";
import UpdateHeight from "../Screens/UpdateUserInfo/UpdateHeight";
import UpdateGym from "../Screens/UpdateUserInfo/UpdateGym";

const Stack = createNativeStackNavigator();

export default function UpdateUserInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Edit Profile"
    >
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Name"
        component={UpdateName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Bio"
        component={UpdateBio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Weight Unit"
        component={UpdateWeightUnit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Weight"
        component={UpdateWeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Height Unit"
        component={UpdateHeightUnit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Height"
        component={UpdateHeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Gym"
        component={UpdateGym}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
