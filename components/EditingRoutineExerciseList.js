import React, { useCallback, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

import { Ionicons } from "@expo/vector-icons";

import { EditRoutineContext } from "../context/EditRoutineContext";

import { FIRESTORE, FIREBASE_AUTH } from "../firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

import calculateCaloriesLift from "../Utils/calculateCaloriesLift.js";
import calculateTimeLift from "../Utils/calculateTimeLift.js";

export default function EditingRoutineExerciseList({ navigation, exercices }) {
  const { routine, setRoutine, currentDay } = useContext(EditRoutineContext);

  const NUM_ITEMS = exercices.length;

  const initialData = Array.from({ length: NUM_ITEMS }, (_, index) => ({
    key: `item-${Math.random()}`,
    exercise: exercices[index],
    day: currentDay,
  }));

  const deleteExercise = async (id, day) => {
    // update the calories, sets, and duration of the day
    // first, calculate the calories, sets, and duration of the exercise
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      return;
    }

    const userDocRef = doc(FIRESTORE, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    // get the user's weight and weightUnit
    const { weight, weightUnit, gender } = userDoc.data();

    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      const exercise = newRoutine.days[day].exercises.find(
        (exercise) => exercise.exerciseId === id,
      );
      const { numberOfSets, restTime, numberOfReps } = exercise;
      const time = calculateTimeLift(numberOfReps, numberOfSets, restTime);
      const calories = calculateCaloriesLift(
        calculateTimeLift(numberOfReps, numberOfSets, 60),
        weight,
        weightUnit,
        gender,
      );
      newRoutine.days[day].exercises = newRoutine.days[day].exercises.filter(
        (exercise) => exercise.exerciseId !== id,
      );
      newRoutine.days[day].totalCalories -= Math.round(calories);
      newRoutine.days[day].totalSets -= numberOfSets;
      newRoutine.days[day].totalDuration -= time;
      return newRoutine;
    });
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <SwipeableItem
        key={item.key}
        item={item}
        renderUnderlayLeft={() => (
          <UnderlayLeft
            item={item}
            initialData={initialData}
            deleteExercise={deleteExercise}
            navigation={navigation}
            currentDay={currentDay}
            routine={routine}
            setRoutine={setRoutine}
          />
        )}
        snapPointsLeft={[150]}
      >
        <View style={[styles.row, { height: 100 }]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#4A4A4B",
                padding: 14,
                borderRadius: 20,
              }}
            >
              <Ionicons name="barbell-outline" size={40} color="white" />
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  marginLeft: 16,
                  maxWidth: 180,
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.exercise.exerciseName}
              </Text>
              <Text style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}>
                {item.exercise.numberOfSets} sets of {``}
                {item.exercise.numberOfReps} reps, {item.exercise.weight}
                {item.exercise.weightSystem}
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 6,
              marginLeft: 6,
            }}
          >
            <Ionicons name="play-circle-outline" size={36} color="white" />
            <Text style={{ color: "#9095A1", fontSize: 10 }}>Tutorial</Text>
          </Pressable>
        </View>
      </SwipeableItem>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Ionicons name="information-circle-outline" size={12} color="#a0a0a0" />
        <Text
          style={{
            color: "#a0a0a0",
            fontSize: 12,
            fontStyle: "italic",
            alignSelf: "flex-end",
            marginLeft: 2,
          }}
        >
          Swipe left to edit or delete a lift
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.key}
        data={initialData}
        renderItem={renderItem}
        style={{ width: "100%", height: "100%", marginBottom: 100 }}
        extraData={routine}
      />
    </View>
  );
}

const UnderlayLeft = ({ item, deleteExercise, navigation }) => {
  const { close } = useSwipeableItemParams();
  const id = item.exercise.exerciseId;
  return (
    <View style={[styles.row_, styles.underlayLeft]}>
      <TouchableOpacity
        onPress={() => {
          close();
          setTimeout(() => {
            deleteExercise(id, item.day);
          }, 200);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FF0431",
          padding: 20,
          borderRadius: 20,
          width: "20%",
          marginRight: "2%",
        }}
      >
        <Ionicons name="trash-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          close();
          setTimeout(() => {
            navigation.navigate("Edit Exercise", {
              exercise: item.exercise,
            });
          }, 200);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#316ADA",
          padding: 20,
          borderRadius: 20,
          width: "20%",
        }}
      >
        <Ionicons name="create-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    backgroundColor: "#313231",
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  row_: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
  },

  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 32,
  },

  underlayLeft: {
    flex: 1,
  },
});
