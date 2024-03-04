import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import SavedRoutines from "../Screens/SavedRoutines";
import Profile from "../Screens/Profile";
import Loading1 from "../Screens/LoadingTransitionScreens/Loading1.js";

import { FIREBASE_AUTH } from "../firebaseConfig";
import { UserAnsweredInitialQuestions } from "../FirebaseFunctions/Users/UserAnsweredInitialQuestions";

const Tab = createBottomTabNavigator();

export default function MainTabs({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [initialQuestionsAnswered, setInitialQuestionsAnswered] =
    useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("MainTabs.js");
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    setLoading(true);
    UserAnsweredInitialQuestions(user.uid)
      .then((result) => {
        if (result === false) {
          setLoading(false);
          setInitialQuestionsAnswered(false);
          setTimeout(() => {
            navigation.navigate("User Input");
          }, 2000);
        } else {
          setLoading(false);
          setInitialQuestionsAnswered(true);
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "An error has occurred, try again later please");
        setLoading(false);
      });
  }, [navigation, isFocused]);

  if (
    (loading && !initialQuestionsAnswered) ||
    (!loading && !initialQuestionsAnswered)
  ) {
    return <Loading1 />;
  } else {
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
}
