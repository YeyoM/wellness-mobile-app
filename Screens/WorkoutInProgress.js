import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  LogBox,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList, {
  ScaleDecorator,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import SwipeButton from "rn-swipe-button";
import CurrentExercise from "../components/CurrentExercise";
import arrowRight from "../assets/arrow-right.png";
import SetsTable from "../components/SetsTable";

import { useState } from "react";

export default function WorkoutInProgress({ route, navigation }) {
  const { day } = route.params;

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
  const [numberOfExercises, setNumberOfExercises] = useState(
    day.exercises.length,
  );
  const [exercises, setExercises] = useState(day.exercises);
  const [exerciseQueue, setExerciseQueue] = useState(day.exercises.slice(1));
  const [finishedExercises, setFinishedExercises] = useState([]);
  /*
   * currentSets is not used in this file, but it is used in the SetsTable.js file
   * and is passed as a prop to the SetsTable component.
   *
   * It has the following structure:
   * [
   * {
   * reps: 12,
   * weight: 100,
   * finished: false,
   * },
   * {
   * reps: 12,
   * weight: 100,
   * finished: false,
   * },
   * ...
   * ]
   * */
  const [currentSets, setCurrentSets] = useState();

  const [time, setTime] = useState(0);
  const [readableTime, setReadableTime] = useState("00:00");

  const handleEndWorkout = () => {
    // some logic to save to firebase and navigate to workout summary
    console.log("Workout ended");
    navigation.navigate("Workout Finished 1", { day: day });
  };

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // Initialize the currentSets state with the sets from the first exercise
  React.useEffect(() => {
    const sets = day.exercises[0].numberOfSets;
    const weight = day.exercises[0].weight;
    const reps = day.exercises[0].numberOfReps;
    const initialSets = [];
    for (let i = 0; i < sets; i++) {
      initialSets.push({ reps: reps, weight: weight, finished: false });
    }
    setCurrentSets(initialSets);
  }, []);

  React.useEffect(() => {
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
      alert("Please finish the sets before moving to the next exercise");
      return;
    }

    if (currentExerciseIndex < numberOfExercises - 1) {
      setExerciseQueue(exerciseQueue.slice(1));
      setCurrentExercise(exercises[currentExerciseIndex + 1]);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentExerciseReps(exercises[currentExerciseIndex + 1].numberOfReps);
      setCurrentExerciseSets(exercises[currentExerciseIndex + 1].numberOfSets);
      setCurrentExerciseWeight(exercises[currentExerciseIndex + 1].weight);
      setFinishedExercises([
        ...finishedExercises,
        {
          exerciseName: currentExercise.exerciseName,
          exerciseReps: currentExerciseReps,
          exerciseSets: currentExerciseSets,
          exerciseWeight: currentExerciseWeight,
        },
      ]);
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
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <Text
                style={{
                  color: "white",
                  fontSize: 90,
                  marginBottom: 20,
                  fontWeight: "800",
                }}
              >
                {readableTime}
              </Text>
              <CurrentExercise
                exercise={currentExercise.exerciseName}
                reps={currentExerciseReps}
                sets={currentExerciseSets}
                weight={currentExerciseWeight}
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
                {finishedExercises.length === 0 ? (
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
                  finishedExercises.map((exercise, index) => {
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
                            fontWeight: "bold",
                          }}
                        >
                          {exercise.exerciseName}
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>

              <SwipeButton
                width={Dimensions.get("window").width * 0.9}
                height={62}
                title="swipe to end workout"
                titleFontSize={18}
                titleColor="#fff"
                railBackgroundColor="#870C0C"
                railBorderColor="#870C0C"
                railStyles={{
                  borderRadius: 20,
                  borderWidth: 2,
                }}
                thumbIconImageSource={arrowRight}
                railFillBackgroundColor="#FF0000"
                railFillBorderColor="#FF0000"
                thumbIconBackgroundColor="#FF0000"
                thumbIconStyles={{
                  borderRadius: 20,
                  borderWidth: 0,
                }}
                containerStyles={{
                  borderRadius: 20,
                  borderWidth: 0,
                }}
                onSwipeSuccess={() => handleEndWorkout()}
              />
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
