import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import SavedRoutines from "../Screens/SavedRoutines";
import Profile from "../Screens/Profile";
import Search from "../Screens/Search";

import Loading1 from "../Screens/LoadingTransitionScreens/Loading1.js";
import Loading2 from "../Screens/LoadingTransitionScreens/Loading2.js";
import Loading3 from "../Screens/LoadingTransitionScreens/Loading3.js";
import Loading4 from "../Screens/LoadingTransitionScreens/Loading4.js";

import { FIREBASE_AUTH } from "../firebaseConfig";
import { UserAnsweredInitialQuestions } from "../FirebaseFunctions/Users/UserAnsweredInitialQuestions";

import getAppData from "../Utils/getAppData.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppContext } from "../context/AppContext.js";

const Tab = createBottomTabNavigator();

export default function MainTabs({ navigation }) {
  const { setUser, setDays, setExercises, setRoutines, setWorkouts } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [initialQuestionsAnswered, setInitialQuestionsAnswered] =
    useState(false);

  const [loadingScreen, setLoadingScreen] = useState(null);

  const setDataIsFetched = async (value) => {
    try {
      await AsyncStorage.setItem("dataIsFetched", value);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataIsFetched = async () => {
    try {
      const value = await AsyncStorage.getItem("dataIsFetched");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // select a random loading screen
    const randomLoadingScreen = Math.floor(Math.random() * 4) + 1;
    setLoadingScreen(randomLoadingScreen);
  }, [loadingScreen]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    setLoading(true);
    if (!initialQuestionsAnswered) {
      UserAnsweredInitialQuestions(user.uid)
        .then((result) => {
          if (result === false) {
            setInitialQuestionsAnswered(false);
            setTimeout(() => {
              navigation.navigate("User Input");
            }, 2000);
          } else {
            setInitialQuestionsAnswered(true);
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "An error has occurred, try again later please");
        });
    } else {
      getDataIsFetched()
        .then((value) => {
          if (value === "true") {
            setLoading(false);
          } else {
            getAppData(user.uid)
              .then(({ user, days, exercises, routines, workouts }) => {
                setUser(user);
                setDays(days);
                setExercises(exercises);
                setRoutines(routines);
                setWorkouts(workouts);
                setDataIsFetched("true").then(() => {
                  setLoading(false);
                });
              })
              .catch((error) => {
                console.log("Error in MainTabs.js: ", error);
                Alert.alert(
                  "Error",
                  "An error has occurred, try again later please",
                );
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          Alert.alert("Error", "An error has occurred, try again later please");
          console.log(error);
          setLoading(false);
        });
    }
  }, [navigation, initialQuestionsAnswered]);

  if (
    (loading && !initialQuestionsAnswered) ||
    (!loading && !initialQuestionsAnswered) ||
    loading
  ) {
    return loadingScreen === 1 ? (
      <Loading1 />
    ) : loadingScreen === 2 ? (
      <Loading2 />
    ) : loadingScreen === 3 ? (
      <Loading3 />
    ) : (
      <Loading4 />
    );
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
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
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
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Saved Routines" component={SavedRoutines} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}
