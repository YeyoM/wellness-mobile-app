import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import SavedRoutines from "../Screens/SavedRoutines";
import Profile from "../Screens/Profile";

const Tab = createBottomTabNavigator();

export default function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Saved Routines") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: "#0496FF",
        tabBarInactiveTintColor: "#D9E6FF",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: "#2b2d42",
          backgroundColor: "#0b0b0b",
          borderTopWidth: 0,
          height: 80,
        },
      })}
      style={{ backgroundColor: "#0B0B0B" }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved Routines" component={SavedRoutines} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

