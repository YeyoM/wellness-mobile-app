import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import { FIREBASE_AUTH } from "../firebaseConfig";
import { UserAnsweredInitialQuestions } from "../FirebaseFunctions/Users/UserAnsweredInitialQuestions";

import Constants from "expo-constants";
import PrimaryNotification from "../components/PrimaryNotification";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

import MyPlan from "../components/MyPlan";
import Crowdmeter from "../components/Crowdmeter";

import GetUser from "../FirebaseFunctions/Users/GetUser";
import getUserStorage from "../AsyncStorageFunctions/Users/getUserStorage";
import saveUserStorage from "../AsyncStorageFunctions/Users/saveUserStorage";

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    setIsLoading(true);
    getUserStorage()
      .then((data) => {
        if (data) {
          setIsLoading(false);
          setUser(data);
        } else {
          GetUser(user.uid)
            .then((data) => {
              saveUserStorage(data);
              setUser(data);
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
              navigation.navigate("Home");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("Home");
      });
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Hello {user.name}!</Text>
            <Text style={styles.headerText_}>
              Get ready to level up your fitness
            </Text>
          </View>
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 70,
              height: 70,
              position: "absolute",
              right: 20,
              top: 20,
            }}
          />
        </View>
        <View style={styles.accomplishments}>
          <View>
            <Text style={styles.accomplishmentsText}>
              You have completed 3 workouts this week
            </Text>
            <Text style={styles.accomplishmentsText_}>
              You're 75% closer to reaching your weekly goal
            </Text>
            <Progress.Bar
              progress={0.75}
              width={200}
              height={4}
              color={"#0496FF"}
              unfilledColor={"#fff"}
              borderWidth={0}
              borderRadius={8}
              style={styles.progressBar}
            />
          </View>
          <Ionicons name="trophy" size={30} color="#0496FF" />
        </View>
        <View style={{ width: "100%", minHeight: 500 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#0496FF",
              tabBarInactiveTintColor: "#D9E6FF",
              tabBarStyle: {
                backgroundColor: "#0b0b0b",
                borderTopWidth: 0,
              },
              headerShown: false,
            }}
          >
            <Tab.Screen name="My Plan" component={MyPlan} />
            <Tab.Screen name="Crowdmeter" component={Crowdmeter} />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },

  home: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  headerText_: {
    fontSize: 12,
    color: "#fff",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 20,
  },

  accomplishments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "#24262B",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 20,
  },

  accomplishmentsText: {
    color: "#fff",
    fontSize: 12,
  },

  accomplishmentsText_: {
    color: "#fff",
    fontSize: 10,
  },

  progressBar: {
    marginTop: 15,
  },
});
