import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EditRoutineContext } from "../context/EditRoutineContext.js";
import deleteRoutine from "../FirebaseFunctions/Routines/deleteRoutine.js";
import { FIREBASE_AUTH } from "../firebaseConfig.js";
import PreviewWorkout from "../components/PreviewWorkout.js";
import getUserStorage from "../AsyncStorageFunctions/Users/getUserStorage.js";

import Constants from "expo-constants";

export default function DaysList({ navigation, route }) {
  const [days, setDays] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [routineName, setRoutineName] = useState(null);
  const [userWeight, setUserWeight] = useState(null);
  const [userWeightUnit, setUserWeightUnit] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [index, setIndex] = useState(null);

  const { initializeEditRoutine } = useContext(EditRoutineContext);

  useEffect(() => {
    getUserStorage()
      .then((data) => {
        if (data) {
          setUserWeight(data.weight);
          setUserWeightUnit(data.weightUnit);
          setUserGender(data.gender);
        } else {
          console.log("No user data found");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("Home");
      });
  }, []);

  useEffect(() => {
    if (route.params && route.params.routine) {
      console.log(route.params.routine.days);
      console.log(route.params.routine.routineName);
      setRoutine(route.params.routine);
      setDays(route.params.routine.days);
      setRoutineName(route.params.routine.routineName);
    }

    if (route.params && route.params.index) {
      setIndex(route.params.index);
    }
  }, [route]);

  const handleEdit = async () => {
    // initialize the edit routine context with the routine
    await initializeEditRoutine(routine, index);
    navigation.push("Edit Routine");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            width: "100%",
          }}
        >
          <View style={styles.header}>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {routineName}
            </Text>
            <Pressable style={styles.buttonEdit} onPress={() => handleEdit()}>
              <Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
            </Pressable>
          </View>
          <View style={{ width: "90%", alignItems: "center" }}>
            {!days ? (
              <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
                Getting your routine info...
              </Text>
            ) : (
              days &&
              days.map((day, index) => {
                return (
                  <PreviewWorkout
                    key={index}
                    navigation={navigation}
                    day={day}
                    userWeight={userWeight}
                    userWeightUnit={userWeightUnit}
                    userGender={userGender}
                  />
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    width: "100%",
  },

  header: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    heaight: 50,
    marginVertical: 40,
  },

  buttonEdit: {
    width: "30%",
    height: 40,
    backgroundColor: "#157AFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 30,
  },
});
