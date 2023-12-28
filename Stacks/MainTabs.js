import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import ManageAccount from "../Screens/ManageAccount";
import SavedRoutines from "../Screens/SavedRoutines";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Manage Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Saved Routines") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0496FF",
        tabBarInactiveTintColor: "#D9E6FF",
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: "#2b2d42",
          backgroundColor: "#323743",
          borderTopWidth: 0,
          height: 85,
        },
      })}
      style={{ backgroundColor: "#0B0B0B" }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved Routines" component={SavedRoutines} />
      <Tab.Screen name="Manage Account" component={ManageAccount} />
    </Tab.Navigator>
  )
}