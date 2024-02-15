import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getSavedExercises } from "../FirebaseFunctions/Exercises/getSavedExercises.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { EditRoutineContext } from "../context/EditRoutineContext";

export default function SavedLifts({ navigation }) {
  const { routine, setRoutine, currentDay } = useContext(EditRoutineContext);

  const [exercises, setExercises] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const saveExercisesStorage = async (exercises) => {
    try {
      const jsonValue = JSON.stringify(exercises);
      await AsyncStorage.setItem("@exercises", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getExercisesStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@exercises");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Check in the async storage if the user has saved excercises
    // If the user has saved exercises, set them in the state
    // If the user doesn't have saved exercises, fetch them from the API
    // and save them in the async storage
    setRefreshing(true);
    getExercisesStorage().then((exercises) => {
      if (exercises) {
        console.log("exercises from storage");
        setExercises(exercises);
      } else {
        console.log("exercises from API");
        getSavedExercises(routine.userId)
          .then((exercises) => {
            console.log("saving exercises in storage");
            setExercises(exercises);
            saveExercisesStorage(exercises);
            setRefreshing(false);
          })
          .catch((err) => {
            setError(err);
            setRefreshing(false);
          });
      }
    });
    setRefreshing(false);
  }, []);

  const handleAddLift = async ({ lift }) => {
    console.log("adding lift");

    // check if the lift is already in the exercise list of the current day
    // if it is, don't add it
    const isAlreadyInList = routine.days[currentDay].exercises.find(
      (exercise) => exercise.exerciseId === lift.id,
    );
    if (isAlreadyInList) {
      return;
    }

    const newLift = {
      exerciseId: lift.id,
      exerciseName: lift.exerciseName,
      numberOfSets: lift.defaultNumberOfSets,
      numberOfReps: lift.defaultNumberOfReps,
      weight: lift.defaultWeight,
      restTime: lift.defaultRestTime,
    };

    // add lift to the exercise list of the current day
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].exercises.push(newLift);
      return newRoutine;
    });

    // go back to the previous screen
    navigation.goBack();
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const exercises = await getSavedExercises(routine.userId);
      setExercises(exercises);
      saveExercisesStorage(exercises);
      setRefreshing(false);
    } catch (err) {
      setError(err);
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.containerExercises}>
      <ScrollView
        style={{ width: "100%", minHeight: 600 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.exercises}>
          <TextInput
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 20,
              backgroundColor: "#4A4A4B",
              padding: 14,
              borderRadius: 20,
            }}
            placeholder="Search for a lift"
          />
          <Text
            style={{
              color: "#a0a0a0",
              fontSize: 13,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Scroll down to refresh{" "}
          </Text>
          {/** User's saved lifts */}
          {error && (
            <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
              {error.message}
            </Text>
          )}
          {exercises &&
            !refreshing &&
            exercises.map((lift) => (
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
                key={lift.id}
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
                  onPress={() => handleAddLift({ lift: lift })}
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
                  }}
                >
                  {lift.exerciseName}
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
          {exercises && exercises.length === 0 && (
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              You haven't saved any lifts yet, add some to your list by going to
              the "search a lift" tab
            </Text>
          )}
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
