import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ActivityIndicator,
  View,
  Pressable,
  TouchableOpacity,
  LogBox,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AppState,
  Dimensions,
} from "react-native";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";

import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import CurrentExercise from "../components/CurrentExercise";
import SetsTable from "../components/SetsTable";

import SaveWorkout from "../FirebaseFunctions/Workouts/SaveWorkout";
import getWorkouts from "../FirebaseFunctions/Workouts/GetWorkouts.js";
import saveWorkoutsStorage from "../AsyncStorageFunctions/Workouts/saveWorkoutsStorage.js";
import calculateCaloriesLift from "../Utils/calculateCaloriesLift.js";
import calculateTimeLift from "../Utils/calculateTimeLift.js";

import SwipeTimer from "../components/SwipeTimer.js";

import { FIREBASE_AUTH } from "../firebaseConfig.js";

export default function WorkoutInProgress({ route, navigation }) {
  const { day, userWeight, userWeightUnit } = route.params;

  const [currentExercise, setCurrentExercise] = useState(day.exercises[0]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExerciseReps, setCurrentExerciseReps] = useState(
    day.exercises[0].numberOfReps,
  );
  const [currentExerciseSets, setCurrentExerciseSets] = useState(
    day.exercises[0].numberOfSets,
  );
  const [currentExerciseWeight, setCurrentExerciseWeight] = useState(
    day.exercises[0].weight,
  );
  const [currentExerciseRestTime, setCurrentExerciseRestTime] = useState(
    day.exercises[0].restTime,
  );
  const [numberOfExercises] = useState(day.exercises.length);
  const [exercises, setExercises] = useState(day.exercises);
  const [exerciseQueue, setExerciseQueue] = useState(day.exercises.slice(1));
  const [currentSets, setCurrentSets] = useState();
  const [currentWorkoutInfo, setCurrentWorkoutInfo] = useState([]); // This is the state that will be sent to the databas

  const [currentCalories, setCurrentCalories] = useState(0);

  const [currentTotalWeight, setCurrentTotalWeight] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [readableTime, setReadableTime] = useState("00:00");

  const [loading, setLoading] = useState(false);

  const [showTimer, setShowTimer] = useState(false);

  const handleEndWorkout = async () => {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      Alert.alert("Please log in to save the workout", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      return;
    }

    if (currentExerciseIndex < numberOfExercises - 1) {
      Alert.alert(
        "Are you sure you want to end the workout?",
        "You still have exercises left, progress will be lost",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "End Workout",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ],
      );
      return;
    }
    // Check if the current sets are finished
    let finished = true;
    for (let i = 0; i < currentSets.length; i++) {
      if (!currentSets[i].finished) {
        finished = false;
      }
    }
    if (!finished) {
      Alert.alert(
        "Are you sure you want to end the workout?",
        "You still have sets left, progress will be lost",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "End Workout",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ],
      );
      return;
    }
    // If they are, add the last exercise to the currentWorkoutInfo state
    let meanReps = 0;
    let meanWeight = 0;
    let totalWeightExercise = 0;
    for (let i = 0; i < currentSets.length; i++) {
      meanReps += parseInt(currentSets[i].reps);
      meanWeight += parseInt(currentSets[i].weight);
      totalWeightExercise += parseInt(currentSets[i].weight);
    }
    meanReps /= currentSets.length;
    meanWeight /= currentSets.length;
    const finalWorkoutInfo = [
      ...currentWorkoutInfo,
      {
        exerciseName: currentExercise.exerciseName,
        exerciseReps: meanReps,
        exerciseSets: currentSets.length,
        exerciseWeight: meanWeight,
        exerciseId: currentExercise.exerciseId,
      },
    ];
    // calculate the total calories, weight and time
    let totalCalories = 0;
    const duration = calculateTimeLift(
      currentSets.length,
      currentExercise.restTime / 60,
    );
    const calories = calculateCaloriesLift(
      duration,
      userWeight,
      userWeightUnit,
    );
    totalCalories += calories.toFixed(2);
    totalCalories = parseFloat(totalCalories);
    setLoading(true);
    try {
      await SaveWorkout({
        workout: finalWorkoutInfo,
        routineId: day.routineId,
        dayId: day.dayId,
        totalCalories: totalCalories,
        totalWeight: totalWeightExercise + currentTotalWeight,
        totalTime: readableTime,
        date: new Date(),
      });

      // refresh the user's data (workouts) and save to async storage
      const workouts = await getWorkouts(user.uid);
      await saveWorkoutsStorage(workouts);

      setLoading(false);
      navigation.navigate("Workout Finished 1", {
        day: day,
        totalCalories,
        totalWeight: totalWeightExercise + currentTotalWeight,
        totalTime: readableTime,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error saving the workout", "Please try again later", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // Initialize the currentSets state with the sets from the first exercise
  useEffect(() => {
    const sets = day.exercises[0].numberOfSets;
    const weight = day.exercises[0].weight;
    const reps = day.exercises[0].numberOfReps;
    const initialSets = [];
    for (let i = 0; i < sets; i++) {
      initialSets.push({ reps: reps, weight: weight, finished: false });
    }
    setCurrentSets(initialSets);
  }, []);

  // Start the timer when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setReadableTime(
        `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // When the app is in the background, save the time
  // and when it comes back to the foreground, calculate the time
  // and set the time state to the difference
  // between the current time and the time when the app went to the background
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        setStartTime(new Date());
      }
      if (nextAppState === "active") {
        const endTime = new Date();
        const difference = endTime - startTime;
        setTime((time) => time + Math.floor(difference / 1000));
      }
    });
    return () => subscription.remove();
  }, [startTime]);

  const handleNextExercise = () => {
    // Check if the currentsets are finished
    // If not, alert the user to finish the sets
    // If they are, move to the next exercise
    let finished = true;
    for (let i = 0; i < currentSets.length; i++) {
      if (!currentSets[i].finished) {
        finished = false;
        break;
      }
    }
    if (!finished) {
      Alert.alert(
        "Please finish the sets before moving to the next exercise",
        "You still have sets left",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
      );
      return;
    }

    if (currentExerciseIndex < numberOfExercises - 1) {
      // The user weight and unit comes from Home -> AsyncStorage -> MyPlan -> PreviewWorkout -> here
      // TODO: calculate the calories and weight of the current exercise
      const duration = calculateTimeLift(
        currentSets.length,
        exercises[currentExerciseIndex].restTime / 60,
      );
      const calories = calculateCaloriesLift(
        duration,
        userWeight,
        userWeightUnit,
      );
      // Add the calories and weight to the currentCalories and currentWeight states
      setCurrentCalories(currentCalories + calories);
      setExerciseQueue(exerciseQueue.slice(1));
      setCurrentExercise(exercises[currentExerciseIndex + 1]);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentExerciseReps(exercises[currentExerciseIndex + 1].numberOfReps);
      setCurrentExerciseSets(exercises[currentExerciseIndex + 1].numberOfSets);
      setCurrentExerciseWeight(exercises[currentExerciseIndex + 1].weight);
      setCurrentExerciseRestTime(exercises[currentExerciseIndex + 1].restTime);
      // get the mean of the weight and reps of the current exercise and add it to the currentWorkoutInfo state
      let meanReps = 0;
      let meanWeight = 0;
      let totalWeightExercise = 0;
      for (let i = 0; i < currentSets.length; i++) {
        meanReps += parseInt(currentSets[i].reps);
        meanWeight += parseInt(currentSets[i].weight);
        totalWeightExercise += parseInt(currentSets[i].weight);
      }
      meanReps /= currentSets.length;
      meanWeight /= currentSets.length;
      setCurrentWorkoutInfo([
        ...currentWorkoutInfo,
        {
          exerciseName: currentExercise.exerciseName,
          exerciseReps: meanReps,
          exerciseSets: currentSets.length,
          exerciseWeight: meanWeight,
          exerciseId: currentExercise.exerciseId,
        },
      ]);
      setCurrentTotalWeight(currentTotalWeight + totalWeightExercise);
      const sets = exercises[currentExerciseIndex + 1].numberOfSets;
      const weight = exercises[currentExerciseIndex + 1].weight;
      const reps = exercises[currentExerciseIndex + 1].numberOfReps;
      const initialSets = [];
      for (let i = 0; i < sets; i++) {
        initialSets.push({ reps: reps, weight: weight, finished: false });
      }
      setCurrentSets(initialSets);
    }
  };

  const handleTap = () => {
    // Check if the current reps or weight are empty
    for (let i = 0; i < currentSets.length; i++) {
      if (currentSets[i].reps === "") {
        // If they are, fill them with 0
        let newSets = [...currentSets];
        newSets[i].reps = 0;
        setCurrentSets(newSets);
      }
      if (currentSets[i].weight === "") {
        // If they are, fill them with 0
        let newSets = [...currentSets];
        newSets[i].weight = 0;
        setCurrentSets(newSets);
      }
    }
    // Dismiss the keyboard
    Keyboard.dismiss();
  };

  const renderItem = ({ item, drag }) => {
    return (
      <ScaleDecorator activeScale={0.95} inactiveScale={1}>
        <TouchableOpacity
          style={{
            backgroundColor: "#157AFF",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 24,
            marginVertical: 8,
          }}
          onLongPress={drag}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {item.exerciseName}
          </Text>
          <Ionicons name="reorder-three-outline" size={40} color="white" />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          bounces={false}
          disableScrollViewPanResponder={true}
          disableIntervalMomentum={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={() => handleTap()}>
            <View style={styles.workout}>
              <Text
                style={{
                  color: "white",
                  fontSize: 34,
                  marginTop: 30,
                  width: "90%",
                  textAlign: "center",
                }}
              >
                {currentExercise.exerciseName}
              </Text>
              <SwipeTimer
                readableTime={readableTime}
                setShowTimer={setShowTimer}
                restTime={currentExerciseRestTime}
                currentExerciseIndex={currentExerciseIndex}
              />
              {!showTimer ? (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Ionicons
                    name="ellipse"
                    size={18}
                    color="#157AFF"
                    style={{ marginRight: 5 }}
                  />
                  <Ionicons name="ellipse" size={18} color="#24262B" />
                </View>
              ) : (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Ionicons name="ellipse" size={18} color="#24262B" />
                  <Ionicons
                    name="ellipse"
                    size={18}
                    color="#157AFF"
                    style={{ marginRight: 5 }}
                  />
                </View>
              )}
              <Text
                style={{
                  color: "#a0a0a0",
                  fontSize: 12,
                  marginBottom: 20,
                  fontStyle: "italic",
                  marginTop: 10,
                }}
              >
                Swipe left on the timer to show the rest timer
              </Text>
              <CurrentExercise
                exercise={currentExercise.exerciseName}
                reps={currentExerciseReps}
                sets={currentExerciseSets}
                weight={currentExerciseWeight}
                restTime={currentExerciseRestTime}
                image={day.image}
                navigation={navigation}
              />
              <SetsTable
                currentSets={currentSets}
                setCurrentSets={setCurrentSets}
              />
              {currentExerciseIndex < numberOfExercises - 1 ? (
                <Pressable
                  style={{
                    backgroundColor: "#157AFF",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 40,
                    marginVertical: 20,
                  }}
                  onPress={() => handleNextExercise()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    Next Lift
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
              ) : null}

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginBottom: 20,
                  paddingLeft: 20,
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                }}
              >
                Lift queue:
              </Text>
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#0b0b0b",
                  marginBottom: 60,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {exerciseQueue.length === 0 ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      marginBottom: 20,
                      fontStyle: "italic",
                    }}
                  >
                    No more exercises left
                  </Text>
                ) : (
                  <NestableScrollContainer>
                    <DraggableFlatList
                      data={exerciseQueue}
                      renderItem={renderItem}
                      keyExtractor={(item) =>
                        `draggable-item-${item.exerciseName}`
                      }
                      onDragEnd={({ data }) => setExercises(data)}
                    />
                  </NestableScrollContainer>
                )}
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginBottom: 20,
                  paddingLeft: 20,
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                }}
              >
                Finished lifts:
              </Text>
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#0b0b0b",
                  marginBottom: 60,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {currentWorkoutInfo.length === 0 ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      marginBottom: 20,
                      fontStyle: "italic",
                    }}
                  >
                    No finished exercises
                  </Text>
                ) : (
                  currentWorkoutInfo.map((exercise, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          backgroundColor: "#0b0b0b",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 24,
                          marginVertical: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontStyle: "italic",
                          }}
                        >
                          {exercise.exerciseName}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontStyle: "italic",
                          }}
                        >
                          {exercise.exerciseSets} x {exercise.exerciseReps} x{" "}
                          {exercise.exerciseWeight}
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Pressable
                  style={{
                    backgroundColor: "#870C0C",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    marginVertical: 20,
                    width: "90%",
                    height: 60,
                  }}
                  onPress={() => handleEndWorkout()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    End Workout
                  </Text>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
              )}
              <View style={{ height: 60 }} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0b0b",
    flex: 1,
  },

  scrollView: {
    backgroundColor: "#0b0b0b",
  },

  workout: {
    backgroundColor: "#0b0b0b",
    marginTop: 40,
    width: "100%",
    minHeight: Dimensions.get("window").height + 100,
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#323743",
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  headerText_: {
    fontSize: 12,
    color: "#fff",
  },
});
