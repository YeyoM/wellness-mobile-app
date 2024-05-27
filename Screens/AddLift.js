import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import SavedLifts from "./SavedLifts.js";
import SearchLift from "./SearchLift.js";
import CardioExercises from "./CardioExercises.js";

export default function AddLift({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.home}>
        {/*aqui la parte de arriba*/}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: -5,
              left: 20,
              height: 36,
              width: 36,
              zIndex: 999,
              backgroundColor: "#131417",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#4A4A4B",
                padding: 14,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <Ionicons name="barbell-outline" size={36} color="white" />
            </View>
            <Text style={styles.title}>Find an Exercise</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#0B0B0B",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 20,
            paddingTop: 16,
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
              name="Saved Lifts"
              children={() => <SavedLifts navigation={navigation} />}
            />
            <Tab.Screen name="Search Lifts" component={SearchLift} />
            <Tab.Screen name="Cardio" component={CardioExercises} />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    alignItems: "center",
  },

  home: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#24262B",
  },

  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
    top: 0,
    zIndex: 900,
    backgroundColor: "#24262B",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
