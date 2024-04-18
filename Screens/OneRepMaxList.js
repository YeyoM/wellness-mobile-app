import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";

export default function OneRepMaxList({ navigation }) {
  const { exercises } = useContext(AppContext);
  const [oneRepMaxExercises, setOneRepMaxExercises] = useState([]);

  React.useEffect(() => {
    const allowed = [
      "Barbell Bench Press",
      "Barbell Deadlift",
      "Barbell Squat",
      "Barbell Seated Shoulder Press",
    ];
    const allowedOneRepMaxes = new Set(allowed);
    const unsubscribe = navigation.addListener("focus", () => {
      const filteredExercises = [];
      exercises.forEach((exercise) => {
        if (allowedOneRepMaxes.has(exercise.exerciseName)) {
          filteredExercises.push(exercise);
        }
      });
      setOneRepMaxExercises(filteredExercises);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 22,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              marginTop: 80,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Select the 1RM you want to edit
          </Text>
          <View style={styles.listContainer}>
            {oneRepMaxExercises &&
              oneRepMaxExercises.map((exercise, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles.exercise}
                    onPress={() =>
                      navigation.navigate("Edit One Rep Max", {
                        exercise: exercise,
                      })
                    }
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {exercise.exerciseName} - {exercise.oneRepMax}{" "}
                      {exercise.defaultWeightSystem}
                    </Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color="white"
                    />
                  </Pressable>
                );
              })}
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
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 36,
    width: 36,
    zIndex: 999,
    backgroundColor: "#24262B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  exercise: {
    width: Dimensions.get("window").width,
    backgroundColor: "#0B0B0B",
    borderWidth: 1,
    borderColor: "white",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});
