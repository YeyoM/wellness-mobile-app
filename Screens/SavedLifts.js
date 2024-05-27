import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  RefreshControl,
  Platform,
} from "react-native";
import { RefreshControl as WebRefreshControl } from "react-native-web-refresh-control";
import { Ionicons } from "@expo/vector-icons";

import alert from "../components/Alert.js";

import calculateTimeLift from "../Utils/calculateTimeLift.js";
import calculateCaloriesLift from "../Utils/calculateCaloriesLift.js";

import { EditRoutineContext } from "../context/EditRoutineContext";
import { AppContext } from "../context/AppContext.js";

export default function SavedLifts({ route, navigation }) {
  const { routine, setRoutine, currentDay } = useContext(EditRoutineContext);
  const { user, exercises, refreshExercises } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const handleAddLift = async ({ lift }) => {
    const isAlreadyInList = routine.days[currentDay].exercises.find(
      (exercise) => {
        if (exercise.exerciseId) {
          return (
            exercise.exerciseId === lift.id ||
            exercise.exerciseId === lift.exerciseId
          );
        } else {
          return exercise.id === lift.id || exercise.id === lift.exerciseId;
        }
      },
    );
    if (isAlreadyInList) {
      alert("This lift is already in the list");
      return;
    }

    const newLift = {
      exerciseId: lift.exerciseId || lift.id,
      exerciseName: lift.exerciseName,
      numberOfSets: lift.defaultNumberOfSets,
      numberOfReps: lift.defaultNumberOfReps,
      weight: lift.defaultWeight,
      weightSystem: lift.defaultWeightSystem,
      restTime: lift.defaultRestTime,
      equipment: lift.equipment,
      muscle: lift.muscle,
      // type: lift.type DEPRECATED
      level: lift.level || "",
      category: lift.category || lift.type || "",
      images: lift.images || [],
      instructions: lift.instructions || [],
      mechanic: lift.mechanic || "",
      force: lift.force || "",
    };

    // get the user's weight from the async storage
    userWeight = user.weight;
    userWeightUnit = user.weightUnit;
    userGender = user.gender;

    // calculate the time and calories of the new lift
    const time = calculateTimeLift(
      lift.defaultNumberOfReps,
      lift.defaultNumberOfSets,
      lift.defaultRestTime,
    );

    const calories = calculateCaloriesLift(
      time,
      userWeight,
      userWeightUnit,
      userGender,
    );

    // add lift to the exercise list of the current day
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].exercises.push(newLift);
      newRoutine.days[currentDay].totalDuration =
        parseFloat(newRoutine.days[currentDay].totalDuration) +
        parseFloat(Math.round(time));
      newRoutine.days[currentDay].totalCalories =
        parseFloat(newRoutine.days[currentDay].totalCalories) +
        parseFloat(Math.round(calories));
      newRoutine.days[currentDay].totalSets =
        parseFloat(newRoutine.days[currentDay].totalSets) +
        parseFloat(newLift.numberOfSets);
      return newRoutine;
    });

    // go back to the previous screen
    navigation.goBack();
  };

  const onRefresh = React.useCallback(async () => {
    try {
      await refreshExercises();
    } catch (err) {
      setError(err);
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.containerExercises}>
      <ScrollView
        style={{ width: "100%", marginTop: 20 }}
        refreshControl={
          Platform.OS === "web" ? (
            <WebRefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          ) : (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          )
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
            Scroll down to refresh
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
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  backgroundColor: "#313231",
                  padding: 14,
                  borderRadius: 20,
                  overflow: "hidden",
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
                    textAlign: "left",
                  }}
                  numberOfLines={2}
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
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Tutorial", { lift: lift })
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="information-circle-outline"
                      size={22}
                      color="#a0a0a0"
                    />
                    <Text
                      style={{
                        color: "#a0a0a0",
                        fontSize: 12,
                        fontStyle: "italic",
                      }}
                    >
                      Tutorial
                    </Text>
                  </Pressable>
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
  },

  exercises: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 16,
  },
});
