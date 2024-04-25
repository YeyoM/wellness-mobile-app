import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import calculateCaloriesCardioExercise from "../Utils/calculateCaloriesCardioExercise.js";

import { EditRoutineContext } from "../context/EditRoutineContext";
import { AppContext } from "../context/AppContext.js";

export default function CardioExercises({ navigation }) {
  const { routine, setRoutine, currentDay } = useContext(EditRoutineContext);
  const { user, cardioExercises } = useContext(AppContext);

  const [success, setSuccess] = React.useState(false);

  const handleAddCardioExercise = async ({ exercise }) => {
    // check first if there is an atribute called "cardioExercises" in the current day
    if (!routine.days[currentDay].cardioExercises) {
      routine.days[currentDay].cardioExercises = [];
    }

    // check if the exercise is already in the list
    const isAlreadyInList = routine.days[currentDay].cardioExercises.find(
      (cardio) => cardio.exerciseName === exercise.exerciseName,
    );

    if (isAlreadyInList) {
      Alert.alert("This cardio exercise is already in the list");
      return;
    }

    const newExercise = {
      exerciseName: exercise.exerciseName,
      duration: exercise.defaultDuration,
      resistanceLevel: exercise.defaultResistanceLevel,
      incline: exercise.defaultIncline,
      speed: exercise.defaultSpeed,
      equipment: exercise.equipment,
    };

    // add the cardio exercise to the list
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].cardioExercises.push(newExercise);
      return newRoutine;
    });

    let calories = calculateCaloriesCardioExercise(
      user.weight,
      user.weightUnit,
      exercise.exerciseName,
      exercise.defaultDuration,
      exercise.defaultResistanceLevel,
      exercise.defaultIncline,
      exercise.defaultSpeed,
    );

    // add the calories to the total calories of the day
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      console.log(newRoutine.days[currentDay].totalDuration);
      newRoutine.days[currentDay].totalCalories =
        parseFloat(newRoutine.days[currentDay].totalCalories) +
        parseFloat(Math.round(calories));
      newRoutine.days[currentDay].totalDuration =
        parseFloat(newRoutine.days[currentDay].totalDuration) +
        parseFloat(exercise.defaultDuration);
      return newRoutine;
    });

    setSuccess(true);
    // go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.containerExercises}>
      <ScrollView style={{ width: "100%", minHeight: 600 }}>
        {success && (
          <View
            style={{
              backgroundColor: "#157AFF",
              padding: 10,
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Exercise added successfully!
            </Text>
          </View>
        )}
        <View style={styles.exercises}>
          {cardioExercises &&
            cardioExercises.map((exercise) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  backgroundColor: "#313231",
                  padding: 14,
                  borderRadius: 20,
                }}
                key={exercise.exerciseName}
              >
                <Pressable
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#157AFF",
                    padding: 14,
                    borderRadius: 20,
                    width: 80,
                  }}
                  onPress={() => handleAddCardioExercise({ exercise })}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </Text>
                  <Ionicons name="add-outline" size={26} color="white" />
                </Pressable>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    textAlign: "center",
                    width: "48%",
                    textAlign: "left",
                  }}
                  numberOfLines={2}
                >
                  {exercise.exerciseName}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Pressable onPress={() => navigation.navigate("Workout")}>
                    <Ionicons
                      name="play-circle-outline"
                      size={32}
                      color="white"
                    />
                  </Pressable>
                  <Text
                    style={{
                      color: "#a0a0a0",
                      fontSize: 12,
                      marginTop: 0,
                    }}
                  >
                    Tutorial
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerExercises: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    width: "100%",
  },

  exercises: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 60,
    padding: 20,
  },
});
