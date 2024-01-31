import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
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

import { useState } from "react";

export default function WorkoutInProgress({ route, navigation }) {
  const { routine } = route.params;

  /**
   * {"calories": "100", "duration": "70", "exercises": [{"exerciseName": "Push Up", "reps": "10", "sets": "4", "weight": "0"}, {"exerciseName": "Bench Press", "reps": "10", "sets": "4", "weight": "0"}, {"exerciseName": "Overhead Press", "reps": "10", "sets": "4", "weight": "0"}], "image": "../assets/push_day.png", "routineName": "Push Day", "sets": "12"}
   */

  console.log(routine);

  const [currentExercise, setCurrentExercise] = useState(routine.exercises[0]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExerciseReps, setCurrentExerciseReps] = useState(
    routine.exercises[0].reps,
  );
  const [currentExerciseSets, setCurrentExerciseSets] = useState(
    routine.exercises[0].sets,
  );
  const [currentExerciseWeight, setCurrentExerciseWeight] = useState(
    routine.exercises[0].weight,
  );

  const [numberOfExercises, setNumberOfExercises] = useState(
    routine.exercises.length,
  );
  const [exercises, setExercises] = useState(routine.exercises);

  const handleEndWorkout = () => {
    // some logic to save to firebase and navigate to workout summary
    console.log("Workout ended");
    navigation.navigate("Workout Finished 1", { routine: routine });
  };

  const renderItem = ({ item, drag, isActive }) => {
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.workout}>
          <Text
            style={{
              color: "white",
              fontSize: 34,
              marginTop: 30,
              marginBottom: -20,
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
            11:00
          </Text>
          <CurrentExercise
            exercise={currentExercise.exerciseName}
            reps={currentExerciseReps}
            sets={currentExerciseSets}
            weight={currentExerciseWeight}
            image={routine.image}
            navigation={navigation}
          />
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
            <NestableScrollContainer>
              <DraggableFlatList
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item) => `draggable-item-${item.exerciseName}`}
                onDragEnd={({ data }) => setExercises(data)}
              />
            </NestableScrollContainer>
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
        </View>
      </ScrollView>
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

