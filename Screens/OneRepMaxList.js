import React from "react";
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
import getExercisesStorage from "../AsyncStorageFunctions/Exercises/getExercisesStorage.js";

export default function OneRepMaxList({ navigation }) {
  const [exercises, setExercises] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getExercisesStorage()
        .then((exercises) => {
          setExercises(exercises);
        })
        .catch((error) => {
          console.log(error);
        });
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
            {exercises &&
              exercises.map((exercise, index) => {
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
