import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import PreviewWorkout from "./PreviewWorkout";

const days = [
  {
    dayName: "Push Day",
    dayId: 1,
    exercises: [
      {
        exerciseId: 1,
        exerciseName: "Bench Press",
        numberOfSets: 4,
        numberOfReps: 8,
        restTime: 60,
        weight: 135,
      },
      {
        exerciseId: 2,
        exerciseName: "Dumbbell Shoulder Press",
        numberOfSets: 4,
        numberOfReps: 8,
        restTime: 60,
        weight: 35,
      },
    ],
    routineId: 1,
    totalSets: 8,
    totalCalories: 200,
    totalDuration: 60,
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    dayName: "Pull Day",
    dayId: 2,
    exercises: [
      {
        exerciseId: 1,
        exerciseName: "Pull Ups",
        numberOfSets: 4,
        numberOfReps: 8,
        restTime: 60,
        weight: 0,
      },
      {
        exerciseId: 2,
        exerciseName: "Barbell Rows",
        numberOfSets: 4,
        numberOfReps: 8,
        restTime: 60,
        weight: 135,
      },
    ],
    routineId: 2,
    totalSets: 8,
    totalCalories: 200,
    totalDuration: 60,
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function MyPlan({ navigation }) {
  console.log(navigation);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.plan}>
          <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
            What muscle group are we training today?
          </Text>
          <View
            style={{ flexDirection: "column", marginTop: 20, width: "90%" }}
          >
            <PreviewWorkout day={days[0]} navigation={navigation} />
            <PreviewWorkout day={days[1]} navigation={navigation} />
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
    alignItems: "center",
  },

  plan: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 16,
  },
});
