import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import Constants from "expo-constants";

import MyPlan from "../components/MyPlan";
import Crowdmeter from "../components/Crowdmeter";

import { AppContext } from "../context/AppContext";

export default function Home({ navigation }) {
  const { user } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Hello {user?.name}!</Text>
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
        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
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
            <Tab.Screen
              name="My Plan"
              children={() => <MyPlan navigation={navigation} />}
            />
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
    backgroundColor: "#0b0b0b",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },

  home: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
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
});
