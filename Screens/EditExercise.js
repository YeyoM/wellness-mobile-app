import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { Slider, HapticModeEnum } from "react-native-awesome-slider";
import * as Haptics from "expo-haptics";

import calculateCaloriesLift from "../Utils/calculateCaloriesLift";
import calculateCaloriesCardioExercise from "../Utils/calculateCaloriesCardioExercise.js";
import calculateTimeLift from "../Utils/calculateTimeLift";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import { EditRoutineContext } from "../context/EditRoutineContext";
import { AppContext } from "../context/AppContext.js";

export default function EditExercise({ route, navigation }) {
  if (route.params === undefined) {
    navigation.navigate("Home");
    return null;
  }

  const { setRoutine, currentDay } = useContext(EditRoutineContext);
  const { user } = useContext(AppContext);

  const { exercise } = route.params;

  const [reps, setReps] = useState(exercise.numberOfReps);
  const [sets, setSets] = useState(exercise.numberOfSets);
  const [weight, setWeight] = useState(exercise.weight);
  const [restTime, setRestTime] = useState(exercise.restTime / 60);

  const [calories, setCalories] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [userWeight, _setUserWeight] = useState(user.weight);
  const [userWeightUnit, _setUserWeightUnit] = useState(user.weightUnit);
  const [userGender, _setUserGender] = useState(user.gender);

  const progress_reps = useSharedValue(exercise.numberOfReps);
  const min_reps = useSharedValue(1);
  const max_reps = useSharedValue(20);

  const progress_sets = useSharedValue(exercise.numberOfSets);
  const min_sets = useSharedValue(1);
  const max_sets = useSharedValue(8);

  const progress_weight = useSharedValue(exercise.weight);
  const min_weight = useSharedValue(1);
  const max_weight = useSharedValue(300);

  const progress_restTime = useSharedValue(exercise.restTime / 60);
  const min_restTime = useSharedValue(0);
  const max_restTime = useSharedValue(8);

  const handleReset = () => {};

  // update the calories and total time when the user changes the reps, sets, weight, or rest time
  useEffect(() => {
    setTotalDuration(calculateTimeLift(reps, sets, restTime * 60));
    setCalories(
      calculateCaloriesLift(
        calculateTimeLift(reps, sets, 60),
        userWeight,
        userWeightUnit,
        userGender,
      ),
    );
  }, [reps, sets, weight, restTime, userWeight, userWeightUnit, userGender]);

  const handleApply = () => {
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].exercises = newRoutine.days[
        currentDay
      ].exercises.map((ex) => {
        if (ex.exerciseId === exercise.exerciseId) {
          return {
            ...ex,
            numberOfReps: reps,
            numberOfSets: sets,
            weight: Math.round(weight),
            restTime: restTime * 60,
          };
        }
        return ex;
      });
      // update the calories and total time of the day
      newRoutine.days[currentDay].totalCalories = newRoutine.days[
        currentDay
      ].exercises.reduce((acc, ex) => {
        return Math.round(
          acc +
            calculateCaloriesLift(
              calculateTimeLift(ex.numberOfReps, ex.numberOfSets, 60),
              userWeight,
              userWeightUnit,
              userGender,
            ),
        );
      }, 0);
      newRoutine.days[currentDay].totalCalories += newRoutine.days[
        currentDay
      ].cardioExercises.reduce((acc, ex) => {
        return Math.round(
          acc +
            calculateCaloriesCardioExercise(
              userWeight,
              userWeightUnit,
              ex.exerciseName,
              ex.duration,
              ex.resistanceLevel,
              ex.incline,
              ex.speed,
            ),
        );
      }, 0);

      newRoutine.days[currentDay].totalSets = newRoutine.days[
        currentDay
      ].exercises.reduce((acc, ex) => {
        return acc + ex.numberOfSets;
      }, 0);
      newRoutine.days[currentDay].totalDuration = newRoutine.days[
        currentDay
      ].exercises.reduce((acc, ex) => {
        return acc + calculateTimeLift(ex.numberOfReps, ex.numberOfSets, 60);
      }, 0);
      newRoutine.days[currentDay].totalDuration += newRoutine.days[
        currentDay
      ].cardioExercises.reduce((acc, ex) => {
        return acc + ex.duration;
      }, 0);
      return newRoutine;
    });
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.home}>
        {/*aqui la parte de arriba*/}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: -5,
              left: 20,
              height: 36,
              width: 36,
              zIndex: 999,
              backgroundColor: "#131417",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#4A4A4B",
                padding: 14,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <Ionicons name="barbell-outline" size={36} color="white" />
            </View>
            <Text style={styles.title}>{exercise.exerciseName}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            minHeight: 600,
            backgroundColor: "#0B0B0B",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 20,
            paddingTop: 16,
          }}
        >
          <View style={styles.containerExercises}>
            <ScrollView
              style={{ width: "100%", minHeight: 600, paddingBottom: 60 }}
            >
              <View style={styles.exercises}>
                {/**Aqui van los sliders */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 23 }}>
                    Number of Sets
                  </Text>
                  <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                    Total sets
                  </Text>
                </View>
                <Slider
                  progress={progress_sets}
                  minimumValue={min_sets}
                  maximumValue={max_sets}
                  style={{
                    width: "90%",
                    height: 20,
                    marginBottom: 30,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  theme={{
                    disableMinTrackTintColor: "#157AFF",
                    maximumTrackTintColor: "#4A4A4B",
                    minimumTrackTintColor: "#157AFF",
                    cacheTrackTintColor: "#fff",
                    bubbleBackgroundColor: "#157AFF",
                  }}
                  hapticMode={HapticModeEnum.STEP}
                  markStyle={{
                    width: 0,
                    height: 10,
                    backgroundColor: "#fff",
                  }}
                  sliderHeight={10}
                  onHapticFeedback={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  step={7}
                  onSlidingComplete={(e) => {
                    setSets(e);
                  }}
                  renderBubble={(props) => {
                    return;
                  }}
                  // render the current progress inside the thumb
                  renderThumb={(props) => {
                    return (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          backgroundColor: "#157AFF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                          {sets}
                        </Text>
                      </View>
                    );
                  }}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 23 }}>
                    Number of Reps
                  </Text>
                  <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                    Total reps
                  </Text>
                </View>
                <Slider
                  progress={progress_reps}
                  minimumValue={min_reps}
                  maximumValue={max_reps}
                  style={{
                    width: "90%",
                    height: 20,
                    marginBottom: 30,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  theme={{
                    disableMinTrackTintColor: "#157AFF",
                    maximumTrackTintColor: "#4A4A4B",
                    minimumTrackTintColor: "#157AFF",
                    cacheTrackTintColor: "#fff",
                    bubbleBackgroundColor: "#157AFF",
                  }}
                  hapticMode={HapticModeEnum.STEP}
                  markStyle={{
                    width: 0,
                    height: 10,
                    backgroundColor: "#fff",
                  }}
                  sliderHeight={10}
                  onHapticFeedback={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  step={19}
                  onSlidingComplete={(e) => {
                    setReps(e);
                  }}
                  renderBubble={(props) => {
                    return;
                  }}
                  // render the current progress inside the thumb
                  renderThumb={(props) => {
                    return (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          backgroundColor: "#157AFF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                          {reps}
                        </Text>
                      </View>
                    );
                  }}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 23 }}>Weight</Text>
                  <Text style={{ color: "#BDC1CA", fontSize: 13 }}></Text>
                </View>
                <Slider
                  progress={progress_weight}
                  minimumValue={min_weight}
                  maximumValue={max_weight}
                  style={{
                    width: "90%",
                    height: 20,
                    marginBottom: 30,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  theme={{
                    disableMinTrackTintColor: "#157AFF",
                    maximumTrackTintColor: "#4A4A4B",
                    minimumTrackTintColor: "#157AFF",
                    cacheTrackTintColor: "#fff",
                    bubbleBackgroundColor: "#157AFF",
                  }}
                  hapticMode={HapticModeEnum.STEP}
                  markStyle={{
                    width: 0,
                    height: 10,
                    backgroundColor: "#fff",
                  }}
                  sliderHeight={10}
                  onHapticFeedback={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  step={70}
                  onSlidingComplete={(e) => {
                    setWeight(e);
                  }}
                  renderBubble={(props) => {
                    return;
                  }}
                  // render the current progress inside the thumb
                  renderThumb={(props) => {
                    return (
                      <View
                        style={{
                          width: 40,
                          height: 30,
                          borderRadius: 10,
                          backgroundColor: "#157AFF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                          {Math.round(weight)}
                        </Text>
                      </View>
                    );
                  }}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 23 }}>Rest time</Text>
                  <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                    Minutes
                  </Text>
                </View>
                <Slider
                  progress={progress_restTime}
                  minimumValue={min_restTime}
                  maximumValue={max_restTime}
                  style={{
                    width: "90%",
                    height: 20,
                    marginBottom: 30,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  theme={{
                    disableMinTrackTintColor: "#157AFF",
                    maximumTrackTintColor: "#4A4A4B",
                    minimumTrackTintColor: "#157AFF",
                    cacheTrackTintColor: "#fff",
                    bubbleBackgroundColor: "#157AFF",
                  }}
                  hapticMode={HapticModeEnum.STEP}
                  markStyle={{
                    width: 0,
                    height: 10,
                    backgroundColor: "#fff",
                  }}
                  sliderHeight={10}
                  onHapticFeedback={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  step={8}
                  onSlidingComplete={(e) => {
                    setRestTime(e);
                  }}
                  renderBubble={(props) => {
                    return;
                  }}
                  // render the current progress inside the thumb
                  renderThumb={(props) => {
                    return (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          backgroundColor: "#157AFF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                          {restTime}
                        </Text>
                      </View>
                    );
                  }}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 20,
                    alignSelf: "center",
                    backgroundColor: "#157AFF",
                    borderRadius: 20,
                    padding: 10,
                    height: 120,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      width: "60%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Estimated calories burned
                    </Text>
                    <Text style={{ color: "#BDC1CA", fontSize: 12 }}>
                      This is an estimated number of the calories you’ll burn
                      with this lift
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                      backgroundColor: "#73ADEF",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 36,
                        fontWeight: "bold",
                      }}
                    >
                      {Math.round(calories)}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      kcal
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#a0a0a0",
                      fontSize: 18,
                      fontWeight: "normal",
                      fontStyle: "italic",
                    }}
                  >
                    Approximate time lifting: {Math.round(totalDuration)}{" "}
                    minutes
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 20,
                    alignSelf: "center",
                  }}
                >
                  <Pressable
                    onPress={() => handleReset()}
                    style={{
                      width: "46%",
                      height: 60,
                      backgroundColor: "#24262B",
                      borderRadius: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Reset
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleApply()}
                    style={{
                      width: "46%",
                      height: 60,
                      backgroundColor: "#157AFF",
                      borderRadius: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Apply
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },

  home: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
    top: 0,
    zIndex: 900,
    backgroundColor: "#24262B",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  containerExercises: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
