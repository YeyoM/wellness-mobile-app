import React, { useCallback, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";

import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

import { Ionicons } from "@expo/vector-icons";

import { EditRoutineContext } from "../context/EditRoutineContext";
import { AppContext } from "../context/AppContext.js";

import calculateCaloriesLift from "../Utils/calculateCaloriesLift.js";
import calculateTimeLift from "../Utils/calculateTimeLift.js";

export default function EditingRoutineExerciseList({
  navigation,
  exercices,
  cardioExercises,
}) {
  const { routine, setRoutine, currentDay } = useContext(EditRoutineContext);
  const { user } = useContext(AppContext);

  const NUM_ITEMS_NORMAL = exercices.length;
  const NUM_ITEMS_CARDIO = cardioExercises ? cardioExercises.length : 0;

  const initialDataNormal = Array.from(
    { length: NUM_ITEMS_NORMAL },
    (_, index) => ({
      key: `lift-${exercices[index].exerciseName}`,
      exercise: exercices[index],
      day: currentDay,
    }),
  );

  const initialDataCardio = Array.from(
    { length: NUM_ITEMS_CARDIO },
    (_, index) => ({
      key: `cardio-${cardioExercises[index].exerciseName}`,
      exercise: cardioExercises[index],
      day: currentDay,
    }),
  );

  const initialData = initialDataNormal.concat(initialDataCardio);

  const deleteExercise = async (id, day) => {
    // get the user's weight and weightUnit
    const { weight, weightUnit, gender } = user;

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

  const deleteCardioExercise = (exerciseName, day) => {
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      const exercise = newRoutine.days[day].cardioExercises.find(
        (exercise) => exercise.exerciseName === exerciseName,
      );
      if (!exercise) {
        return newRoutine;
      }
      newRoutine.days[day].cardioExercises = newRoutine.days[
        day
      ].cardioExercises.filter(
        (exercise) => exercise.exerciseName !== exerciseName,
      );
      const { duration } = exercise;
      newRoutine.days[day].totalDuration -= duration;
      newRoutine.days[day].totalCalories -= Math.round(
        calculateCaloriesCardioExercise(
          user.weight,
          user.weightUnit,
          exerciseName,
          exercise.duration,
          exercise.resistanceLevel,
          exercise.incline,
          exercise.speed,
        ),
      );
      return newRoutine;
    });
  };

  const renderItemWeb = useCallback(({ item }) => {
    return (
      <View key={item.key}>
        <View style={[styles.row, { height: 100 }]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "70%",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  marginLeft: 16,
                  maxWidth: "70%",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.exercise.exerciseName}
              </Text>
              {item.key.includes("lift") ? (
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}
                >
                  {item.exercise.numberOfSets} sets of {``}
                  {item.exercise.numberOfReps} reps, {item.exercise.weight}
                  {item.exercise.weightSystem}
                </Text>
              ) : (
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}
                >
                  {item.exercise.duration} minutes
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.editButton}
              onPress={() => {
                if (item.key.includes("lift")) {
                  navigation.navigate("Edit Exercise", {
                    exercise: item.exercise,
                  });
                } else {
                  navigation.navigate("Edit Cardio Exercise", {
                    exercise: item.exercise,
                  });
                }
              }}
            >
              <Ionicons
                name="create-outline"
                size={16}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "white", fontSize: 14 }}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                if (item.key.includes("lift")) {
                  deleteExercise(item.exercise.exerciseId, item.day);
                } else {
                  deleteCardioExercise(item.exercise.exerciseName, item.day);
                }
              }}
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "white", fontSize: 14 }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }, []);

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
            deleteCardioExercise={deleteCardioExercise}
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
              {item.key.includes("lift") ? (
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}
                >
                  {item.exercise.numberOfSets} sets of {``}
                  {item.exercise.numberOfReps} reps, {item.exercise.weight}
                  {item.exercise.weightSystem}
                </Text>
              ) : (
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}
                >
                  {item.exercise.duration} minutes
                </Text>
              )}
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

  if (Platform.OS === "ios" || Platform.OS === "android") {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.key}
          data={initialData}
          renderItem={renderItem}
          style={{ width: "100%", height: "100%", marginBottom: 100 }}
          extraData={routine}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: "100%", marginTop: 0, marginBottom: 100 }}>
          <FlatList
            keyExtractor={(item) => item.key}
            data={initialData}
            renderItem={renderItemWeb}
            style={{ width: "100%", height: "100%", marginBottom: 100 }}
            extraData={routine}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const UnderlayLeft = ({
  item,
  deleteExercise,
  navigation,
  deleteCardioExercise,
}) => {
  const { close } = useSwipeableItemParams();
  const id = item.exercise.exerciseId;
  return (
    <View style={[styles.row_, styles.underlayLeft]}>
      <TouchableOpacity
        onPress={() => {
          close();
          setTimeout(() => {
            if (item.key.includes("lift")) {
              deleteExercise(id, item.day);
            } else {
              deleteCardioExercise(item.exercise.exerciseName, item.day);
            }
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
            if (item.key.includes("lift")) {
              navigation.navigate("Edit Exercise", {
                exercise: item.exercise,
              });
            } else {
              navigation.navigate("Edit Cardio Exercise", {
                exercise: item.exercise,
              });
            }
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
    // flexGrow: 1,
    width: "100%",
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

  buttonsContainer: {
    marginRight: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  editButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#316ADA",
    padding: 5,
    borderRadius: 10,
    marginBottom: 4,
    width: "100%",
  },

  deleteButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0431",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 4,
    width: "100%",
  },
});
