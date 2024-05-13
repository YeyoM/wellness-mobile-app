import React, { useState, useEffect, useContext } from "react";
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
import CardioTable from "../components/CardioTable.js";
import SwipeTimer from "../components/SwipeTimer.js";

import SaveWorkout from "../FirebaseFunctions/Workouts/SaveWorkout";

import calculateCaloriesLift from "../Utils/calculateCaloriesLift.js";
import readableTimeToMinutes from "../Utils/readableTimeToMinutes.js";

import calculateCaloriesCardioExercise from "../Utils/calculateCaloriesCardioExercise.js";

import { AppContext } from "../context/AppContext.js";

const cardioExercises = new Set([
  "Treadmill",
  "Elliptical",
  "Stationary Bike",
  "Rowing Machine",
]);

export default function WorkoutInProgress({ route, navigation }) {
  const { day, userWeight, userWeightUnit, userGender } = route.params;

  const { firebaseUser, refreshNewWorkout } = useContext(AppContext);

  const [startWorkout, setStartWorkout] = useState(false);

  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
  const [currentExerciseType, setCurrentExerciseType] = useState(null);

  const [currentExerciseImages, setCurrentExerciseImages] = useState([]);
  const [currentExerciseInstructions, setCurrentExerciseInstructions] =
    useState([]);

  const [currentExerciseReps, setCurrentExerciseReps] = useState(null);
  const [currentExerciseSets, setCurrentExerciseSets] = useState(null);
  const [currentExerciseWeight, setCurrentExerciseWeight] = useState(null);
  const [currentExerciseRestTime, setCurrentExerciseRestTime] = useState(null);

  const [currentExerciseTime, setCurrentExerciseTime] = useState(null);
  const [currentExerciseIncline, setCurrentExerciseIncline] = useState(null);
  const [isInclineValid, setIsInclineValid] = useState(false);
  const [currentExerciseResistance, setCurrentExerciseResistance] =
    useState(null);
  const [isResistanceValid, setIsResistanceValid] = useState(false);
  const [currentExerciseSpeed, setCurrentExerciseSpeed] = useState(null);
  const [isSpeedValid, setIsSpeedValid] = useState(false);

  const [numberOfExercises] = useState(
    day.exercises.length + (day.cardioExercises?.length ?? 0),
  );
  const [exerciseQueue, setExerciseQueue] = useState([]);
  const [currentSets, setCurrentSets] = useState();
  const [currentWorkoutInfo, setCurrentWorkoutInfo] = useState([]);

  const [currentTotalWeight, setCurrentTotalWeight] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(null);
  const [readableTime, setReadableTime] = useState("00:00");
  const [showTimer, setShowTimer] = useState(false);

  const [loading, setLoading] = useState(false);

  // initialize the exerciseQueue state with the exercises from the day
  useEffect(() => {
    if (!startWorkout) {
      const exercises = day.exercises;
      const cardioExercises = day.cardioExercises || [];
      const queue = [];
      for (let i = 0; i < exercises.length; i++) {
        queue.push(exercises[i]);
      }
      for (let i = 0; i < cardioExercises.length; i++) {
        queue.push(cardioExercises[i]);
      }
      setExerciseQueue(queue);
    }
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    if (time !== null) {
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
    }
  }, [time]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        setStartTime(new Date());
      }
      if (nextAppState === "active") {
        if (startTime !== null) {
          const endTime = new Date();
          const difference = endTime - startTime;
          setTime((time) => time + Math.floor(difference / 1000));
          setStartTime(null);
        }
      }
    });
    return () => subscription.remove();
  }, [startTime]);

  const handleStartWorkout = () => {
    const exercise = exerciseQueue[0];
    setCurrentExercise(exercise);
    setCurrentExerciseIndex(0);

    if (cardioExercises.has(exercise.exerciseName)) {
      setCurrentExerciseType("cardio");
      setCurrentExerciseTime(exercise.duration);
      setCurrentExerciseIncline(exercise.incline ? exercise.incline : 0);
      setIsInclineValid(exercise.incline ? true : false);
      setCurrentExerciseResistance(
        exercise.resistanceLevel ? exercise.resistanceLevel : 0,
      );
      setIsResistanceValid(exercise.resistanceLevel ? true : false);
      setCurrentExerciseSpeed(exercise.speed ? exercise.speed : 0);
      setIsSpeedValid(exercise.speed ? true : false);
      setCurrentExerciseImages(exercise.images || [day.image]);
      setCurrentExerciseInstructions(exercise.instructions || []);
    } else {
      setCurrentExerciseType("lift");
      setCurrentExerciseReps(exercise.numberOfReps);
      setCurrentExerciseSets(exercise.numberOfSets);
      setCurrentExerciseWeight(exercise.weight);
      setCurrentExerciseRestTime(exercise.restTime);
      setCurrentExerciseImages(exercise.images || [day.image]);
      setCurrentExerciseInstructions(exercise.instructions || []);
      const sets = exercise.numberOfSets;
      const weight = exercise.weight;
      const reps = exercise.numberOfReps;
      const initialSets = [];
      for (let i = 0; i < sets; i++) {
        initialSets.push({ reps: reps, weight: weight, finished: false });
      }
      setCurrentSets(initialSets);
    }

    setExerciseQueue(exerciseQueue.slice(1));
    setStartWorkout(true);
    setStartTime(new Date());
    setTime(0);
  };

  const handleEndWorkout = async () => {
    if (!firebaseUser) {
      Alert.alert("Please log in to save the workout", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      return;
    }

    if (!startWorkout) {
      navigation.goBack();
      return;
    }

    // check if the user has already finished all the exercises
    // or if the user has finished all the sets of the last exercise
    let finishedExercises = currentExerciseIndex === numberOfExercises - 1;
    let finishedSets = finishedExercises;
    let numberOfSetsFinished = 0;
    if (finishedExercises && currentExerciseType === "lift") {
      for (let i = 0; i < currentSets.length; i++) {
        if (!currentSets[i].finished) {
          finishedSets = false;
        }
      }
      numberOfSetsFinished = currentSets.filter((set) => set.finished).length;
    }

    if (!finishedExercises || !finishedSets) {
      Alert.alert(
        "Are you sure you want to end the workout?",
        "You still have exercises or sets left, progress will be saved only for the finished exercises and sets",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "End Workout",
            style: "destructive",
            onPress: () => endWorkout(numberOfSetsFinished),
          },
        ],
      );
      return;
    } else {
      endWorkout(numberOfSetsFinished);
    }
  };

  const endWorkout = async (numberOfSetsFinished) => {
    let finalWorkoutInfo;
    let totalWeightExercise = 0;

    if (currentExerciseType === "cardio") {
      finalWorkoutInfo = [
        ...currentWorkoutInfo,
        {
          exerciseName: currentExercise.exerciseName,
          exerciseId: currentExercise.exerciseName,
          exerciseTime: currentExerciseTime,
          exerciseIncline: currentExerciseIncline || 0,
          exerciseResistance: currentExerciseResistance || 0,
          exerciseSpeed: currentExerciseSpeed || 0,
        },
      ];
    } else {
      let meanReps = 0;
      let meanWeight = 0;
      for (let i = 0; i < numberOfSetsFinished; i++) {
        meanReps += parseInt(currentSets[i].reps);
        meanWeight += parseInt(currentSets[i].weight);
        totalWeightExercise += parseInt(currentSets[i].weight);
      }
      meanReps /= numberOfSetsFinished;
      meanWeight /= numberOfSetsFinished;
      finalWorkoutInfo = [
        ...currentWorkoutInfo,
        {
          exerciseName: currentExercise.exerciseName,
          exerciseReps: meanReps || 0,
          exerciseSets: numberOfSetsFinished,
          exerciseWeight: meanWeight || 0,
          exerciseId: currentExercise.exerciseId,
        },
      ];
    }

    let totalCalories = 0;
    let caloriesCardio = 0;
    let caloriesLift = 0;

    let totalDuration = 0;
    let cardioDuration = 0;
    let liftDuration = 0;

    totalDuration = readableTimeToMinutes(readableTime);

    for (let i = 0; i < finalWorkoutInfo.length; i++) {
      if (cardioExercises.has(finalWorkoutInfo[i].exerciseName)) {
        cardioDuration += parseFloat(finalWorkoutInfo[i].exerciseTime);
        caloriesCardio += calculateCaloriesCardioExercise(
          userWeight,
          userWeightUnit,
          finalWorkoutInfo[i].exerciseName,
          parseFloat(finalWorkoutInfo[i].exerciseTime),
          parseFloat(finalWorkoutInfo[i].exerciseResistance),
          parseFloat(finalWorkoutInfo[i].exerciseIncline),
          parseFloat(finalWorkoutInfo[i].exerciseSpeed),
        );
      }
    }

    if (totalDuration - cardioDuration < 0) {
      liftDuration = totalDuration;
    } else {
      liftDuration = totalDuration - cardioDuration;
    }

    caloriesLift = calculateCaloriesLift(
      liftDuration,
      userWeight,
      userWeightUnit,
      userGender,
    );

    totalCalories += caloriesLift;
    totalCalories += caloriesCardio;
    totalCalories = parseFloat(totalCalories);

    setLoading(true);
    try {
      console.log({
        workout: finalWorkoutInfo,
        routineId: day.routineId,
        dayId: day.id,
        totalCalories: totalCalories,
        totalWeight: totalWeightExercise + currentTotalWeight,
        totalTime: readableTime,
        date: new Date(),
      });
      const savedWorkout = await SaveWorkout({
        workout: finalWorkoutInfo,
        routineId: day.routineId,
        dayId: day.id,
        totalCalories: totalCalories,
        totalWeight: totalWeightExercise + currentTotalWeight,
        totalTime: readableTime,
        date: new Date(),
      });

      refreshNewWorkout(savedWorkout);

      setLoading(false);
      navigation.navigate("Workout Finished 1", {
        day: day,
        totalCalories: Math.round(totalCalories),
        totalWeight: Math.round(totalWeightExercise + currentTotalWeight),
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

  const handleNextExercise = () => {
    let finished = true;
    if (currentExerciseType === "lift") {
      for (let i = 0; i < currentSets.length; i++) {
        if (!currentSets[i].finished) {
          finished = false;
          break;
        }
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

    let totalWeightExercise = 0;

    // save the current exercise info to the currentWorkoutInfo state
    if (currentExerciseType === "cardio") {
      setCurrentWorkoutInfo([
        ...currentWorkoutInfo,
        {
          exerciseName: currentExercise.exerciseName,
          exerciseId: currentExercise.exerciseName,
          exerciseTime: currentExerciseTime,
          exerciseIncline: currentExerciseIncline || 0,
          exerciseResistance: currentExerciseResistance || 0,
          exerciseSpeed: currentExerciseSpeed || 0,
        },
      ]);
    } else {
      // get the mean of the weight and reps of the current exercise and add it to the currentWorkoutInfo state
      let meanReps = 0;
      let meanWeight = 0;
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
    }

    const nextExercise = exerciseQueue[0];

    if (cardioExercises.has(nextExercise.exerciseName)) {
      setCurrentExerciseType("cardio");
      setExerciseQueue(exerciseQueue.slice(1));
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentExercise(nextExercise);
      setCurrentExerciseTime(nextExercise.duration);
      setCurrentExerciseIncline(nextExercise.incline);
      setCurrentExerciseResistance(nextExercise.resistanceLevel);
      setCurrentExerciseSpeed(nextExercise.speed);
      setCurrentExerciseImages(nextExercise.images || [day.image]);
      setCurrentExerciseInstructions(nextExercise.instructions || []);
    } else {
      if (currentExerciseIndex < numberOfExercises - 1) {
        setCurrentExerciseType("lift");
        setExerciseQueue(exerciseQueue.slice(1));
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentExercise(nextExercise);
        setCurrentExerciseReps(nextExercise.numberOfReps);
        setCurrentExerciseSets(nextExercise.numberOfSets);
        setCurrentExerciseWeight(nextExercise.weight);
        setCurrentExerciseRestTime(nextExercise.restTime);
        setCurrentExerciseImages(nextExercise.images || [day.image]);
        setCurrentExerciseInstructions(nextExercise.instructions || []);
        const sets = nextExercise.numberOfSets;
        const weight = nextExercise.weight;
        const reps = nextExercise.numberOfReps;
        const initialSets = [];
        for (let i = 0; i < sets; i++) {
          initialSets.push({ reps: reps, weight: weight, finished: false });
        }
        setCurrentSets(initialSets);
      }
    }
  };

  const handleTap = () => {
    // Check if the current reps or weight are empty
    if (startWorkout && currentExerciseType === "lift") {
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
    } else if (startWorkout && currentExerciseType === "cardio") {
      if (currentExerciseTime === "" || currentExerciseTime <= 0) {
        setCurrentExerciseTime(1);
      }
      if (
        (currentExerciseIncline === "" || currentExerciseIncline < 0) &&
        isInclineValid
      ) {
        setCurrentExerciseIncline(1);
      }
      if (
        (currentExerciseResistance === "" || currentExerciseResistance < 0) &&
        isResistanceValid
      ) {
        setCurrentExerciseResistance(1);
      }
      if (
        (currentExerciseSpeed === "" || currentExerciseSpeed <= 0) &&
        isSpeedValid
      ) {
        setCurrentExerciseSpeed(1);
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
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              width: "80%",
              overflow: "hidden",
            }}
            numberOfLines={1}
          >
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
                {startWorkout
                  ? currentExercise.exerciseName
                  : "Press start when ready"}
              </Text>
              {startWorkout ? (
                <SwipeTimer
                  readableTime={readableTime}
                  setShowTimer={setShowTimer}
                  restTime={
                    currentExerciseType === "lift"
                      ? currentExerciseRestTime
                      : currentExerciseTime * 60
                  }
                  type={currentExerciseType}
                  currentExerciseIndex={currentExerciseIndex}
                />
              ) : null}
              {startWorkout && !showTimer ? (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Ionicons
                    name="ellipse"
                    size={18}
                    color="#157AFF"
                    style={{ marginRight: 5 }}
                  />
                  <Ionicons name="ellipse" size={18} color="#24262B" />
                </View>
              ) : startWorkout && showTimer ? (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Ionicons name="ellipse" size={18} color="#24262B" />
                  <Ionicons
                    name="ellipse"
                    size={18}
                    color="#157AFF"
                    style={{ marginRight: 5 }}
                  />
                </View>
              ) : null}
              {startWorkout ? (
                <Text
                  style={{
                    color: "#a0a0a0",
                    fontSize: 12,
                    marginBottom: 20,
                    fontStyle: "italic",
                    marginTop: 10,
                  }}
                >
                  Swipe left on the timer to show the{" "}
                  {currentExerciseType === "lift" ? "rest" : "exercise"} timer
                </Text>
              ) : null}
              {startWorkout && currentExerciseType === "lift" ? (
                <CurrentExercise
                  exerciseName={currentExercise.exerciseName}
                  reps={currentExerciseReps}
                  sets={currentExerciseSets}
                  weight={currentExerciseWeight}
                  restTime={currentExerciseRestTime}
                  defaultImage={day.image}
                  images={currentExerciseImages}
                  instructions={currentExerciseInstructions}
                  navigation={navigation}
                  type="lift"
                />
              ) : startWorkout && currentExerciseType === "cardio" ? (
                <CurrentExercise
                  exerciseName={currentExercise.exerciseName}
                  time={currentExerciseTime}
                  incline={currentExerciseIncline}
                  resistance={currentExerciseResistance}
                  speed={currentExerciseSpeed}
                  defaultImage={day.image}
                  images={currentExerciseImages}
                  instructions={currentExerciseInstructions}
                  navigation={navigation}
                  type="cardio"
                />
              ) : null}
              {startWorkout && currentExerciseType === "lift" ? (
                <SetsTable
                  currentSets={currentSets}
                  setCurrentSets={setCurrentSets}
                />
              ) : startWorkout && currentExerciseType === "cardio" ? (
                <CardioTable
                  duration={currentExerciseTime}
                  setDuration={setCurrentExerciseTime}
                  isDurationValid={true}
                  incline={currentExerciseIncline}
                  setIncline={setCurrentExerciseIncline}
                  isInclineValid={isInclineValid}
                  resistance={currentExerciseResistance}
                  setResistance={setCurrentExerciseResistance}
                  isResistanceValid={isResistanceValid}
                  speed={currentExerciseSpeed}
                  setSpeed={setCurrentExerciseSpeed}
                  isSpeedValid={isSpeedValid}
                />
              ) : null}
              {startWorkout && currentExerciseIndex < numberOfExercises - 1 ? (
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
                    Next Exercise
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
              ) : null}
              {!startWorkout ? (
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
                  onPress={() => handleStartWorkout()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    Start Workout
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
                  paddingLeft: 20,
                  marginBottom: 5,
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                }}
              >
                Exercise Queue:
              </Text>
              <Text
                style={{
                  color: "#a0a0a0",
                  fontSize: 12,
                  marginBottom: 20,
                  fontStyle: "italic",
                  alignSelf: "flex-start",
                  paddingLeft: 20,
                }}
              >
                Drag and drop to reorder exercises
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
                {exerciseQueue && exerciseQueue.length === 0 ? (
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
                      onDragEnd={({ data }) => {
                        setExerciseQueue(data);
                      }}
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
                Finished exercises:
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
                    if (cardioExercises.has(exercise.exerciseName)) {
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
                            {exercise.exerciseTime} min
                          </Text>
                        </View>
                      );
                    } else {
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
                    }
                  })
                )}
              </View>
              {startWorkout && loading ? (
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
                    {startWorkout ? "End Workout" : "Go Back"}
                  </Text>
                  {startWorkout ? (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={24}
                      color="white"
                    />
                  ) : null}
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
