import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function PreviewWorkout({
  day,
  navigation,
  userWeight,
  userWeightUnit,
  userGender,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Image
          source={{ uri: day.image }}
          style={{
            width: "100%",
            height: 180,
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
            paddingVertical: 5,
            paddingHorizontal: 4,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "65%",
              overflow: "hidden",
            }}
          >
            <Text style={styles.textTitle}>
              {day.dayName} - {day.routineName}
            </Text>
            <View style={{ flexDirection: "row", width: "70%" }}>
              <Text style={styles.dayInfo}>
                {Math.round(parseFloat(day.totalDuration))} min
              </Text>
              <Text style={styles.dayInfo}>
                {parseFloat(day.totalSets)} sets
              </Text>
              <Text style={styles.dayInfo}>
                {parseFloat(day.totalCalories)} cal
              </Text>
            </View>
          </View>
          <Pressable
            style={styles.buttonStart}
            onPress={() => {
              console.log("Start workout");
              console.log(navigation);
              navigation.navigate("Workout In Progress", {
                day: day,
                userWeight: userWeight,
                userWeightUnit: userWeightUnit,
                userGender: userGender,
              });
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>Start workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262B",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
  },

  textTitle: {
    fontSize: 15,
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
    color: "#a0a0a0",
    marginRight: 8,
    marginTop: 5,
  },

  buttonStart: {
    width: "35%",
    backgroundColor: "#1565C0",
    height: 36,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
  },
});
