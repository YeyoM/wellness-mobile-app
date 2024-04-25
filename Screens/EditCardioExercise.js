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

export default function EditCardioExercise({ route, navigation }) {
  if (route.params === undefined) {
    navigation.navigate("Home");
    return null;
  }

  const { setRoutine, currentDay } = useContext(EditRoutineContext);
  const { user } = useContext(AppContext);

  const { exercise } = route.params;

  const [exerciseName, setExerciseName] = useState(exercise.exerciseName);
  const [duration, setDuration] = useState(exercise.duration);
  const [resistanceLevel, setResistanceLevel] = useState(
    exercise.resistanceLevel,
  );
  const [incline, setIncline] = useState(exercise.incline);
  const [speed, setSpeed] = useState(exercise.speed);

  const [calories, setCalories] = useState(0);

  const [userGender, _setUserGender] = useState(user.gender);
  const [userWeight, _setUserWeight] = useState(user.weight);
  const [userWeightUnit, _setUserWeightUnit] = useState(user.weightUnit);

  const progress_duration = useSharedValue(exercise.duration);
  const min_duration = useSharedValue(5);
  const max_duration = useSharedValue(60);

  const progress_resistanceLevel = useSharedValue(exercise.resistanceLevel);
  const min_resistanceLevel = useSharedValue(0);
  const max_resistanceLevel = useSharedValue(10);

  const progress_incline = useSharedValue(exercise.incline);
  const min_incline = useSharedValue(0);
  const max_incline = useSharedValue(10);

  const progress_speed = useSharedValue(exercise.speed);
  const min_speed = useSharedValue(0);
  const max_speed = useSharedValue(20);

  const handleReset = () => {};

  useEffect(() => {
    setCalories(
      calculateCaloriesCardioExercise(
        userWeight,
        userWeightUnit,
        exerciseName,
        duration,
        resistanceLevel,
        incline,
        speed,
      ),
    );
  }, [duration, resistanceLevel, incline, speed]);

  const handleApply = () => {
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].cardioExercises = newRoutine.days[
        currentDay
      ].cardioExercises.map((ex) => {
        if (ex.exerciseName === exerciseName) {
          return {
            ...ex,
            duration,
            resistanceLevel,
            incline,
            speed,
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
            <ScrollView style={{ width: "100%", minHeight: 600 }}>
              <View style={styles.exercises}>
                {/**Aqui van los sliders */}
                {duration !== undefined && duration !== null && (
                  <View>
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
                        Duration
                      </Text>
                      <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                        Minutes
                      </Text>
                    </View>
                    <Slider
                      progress={progress_duration}
                      minimumValue={min_duration}
                      maximumValue={max_duration}
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
                      step={11}
                      onSlidingComplete={(e) => {
                        setDuration(e);
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
                              {duration}
                            </Text>
                          </View>
                        );
                      }}
                      containerStyle={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                )}

                {resistanceLevel !== undefined && resistanceLevel !== null && (
                  <View>
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
                        Resistance level
                      </Text>
                      <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                        Resistance
                      </Text>
                    </View>
                    <Slider
                      progress={progress_resistanceLevel}
                      minimumValue={min_resistanceLevel}
                      maximumValue={max_resistanceLevel}
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
                      step={10}
                      onSlidingComplete={(e) => {
                        setResistanceLevel(e);
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
                              {resistanceLevel}
                            </Text>
                          </View>
                        );
                      }}
                      containerStyle={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                )}

                {incline !== undefined && incline !== null && (
                  <View>
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
                        Incline
                      </Text>
                      <Text style={{ color: "#BDC1CA", fontSize: 13 }}></Text>
                    </View>
                    <Slider
                      progress={progress_incline}
                      minimumValue={min_incline}
                      maximumValue={max_incline}
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
                      step={10}
                      onSlidingComplete={(e) => {
                        setIncline(e);
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
                              {incline}
                            </Text>
                          </View>
                        );
                      }}
                      containerStyle={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                )}

                {speed !== undefined && speed !== null && (
                  <View>
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
                      <Text style={{ color: "#fff", fontSize: 23 }}>Speed</Text>
                      <Text style={{ color: "#BDC1CA", fontSize: 13 }}>
                        km/h
                      </Text>
                    </View>
                    <Slider
                      progress={progress_speed}
                      minimumValue={min_speed}
                      maximumValue={max_speed}
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
                      step={20}
                      onSlidingComplete={(e) => {
                        setSpeed(e);
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
                              {speed}
                            </Text>
                          </View>
                        );
                      }}
                      containerStyle={{
                        borderRadius: 10,
                      }}
                    />
                  </View>
                )}

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
                ></View>

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
