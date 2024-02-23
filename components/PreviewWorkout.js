import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function PreviewWorkout({ day, navigation, userWeight, userWeightUnit }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Image
          source={{ uri: day.image }}
          style={{
            width: "100%",
            height: 150,
            resizeMode: "cover",
            borderRadius: 14,
          }}
          defaultSource={require("../assets/image_fallback.png")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column", width: "70%" }}>
            <Text style={styles.textTitle}>{day.dayName}</Text>
            <View style={{ flexDirection: "row", width: "70%" }}>
              <Text style={styles.dayInfo}>{day.totalDuration} min</Text>
              <Text style={styles.dayInfo}>{day.totalCalories} cal</Text>
              <Text style={styles.dayInfo}>{day.totalSets} sets</Text>
            </View>
          </View>
          <Pressable
            style={styles.buttonStart}
            onPress={() =>
              navigation.navigate("Workout In Progress", { day: day, userWeight: userWeight, userWeightUnit: userWeightUnit })
            }
          >
            <Text style={{ color: "white" }}>Start</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262B",
    borderRadius: 14,
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
  },

  textTitle: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },

  viewContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  dayInfo: {
    fontSize: 11,
    color: "#f0f0f0",
    marginRight: 8,
    marginTop: 5,
  },

  buttonStart: {
    width: "30%",
    backgroundColor: "#0496FF",
    height: 36,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
  },
});
