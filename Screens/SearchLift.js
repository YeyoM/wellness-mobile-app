import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { WELLNESS_NINJA_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { addExerciseToUser } from "../firebaseFunctions";

import { FIREBASE_AUTH } from "../firebaseConfig";

export default function SearchLift({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("strength");
  const [inputMuscle, setInputMuscle] = useState("chest");

  const handleSearch = async (text) => {
    if (text === "") {
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Please enter a lift");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?name=${text}&type=${inputType}&muscles=${inputMuscle}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": WELLNESS_NINJA_API_KEY,
          },
        },
      );

      const data = await response.json();

      // get the name, muscle, type and equipment of each exercises
      const exercises = data.map((exercise) => {
        return {
          exerciseName: exercise.name,
          muscle: exercise.muscle,
          type: exercise.type,
          equipment: exercise.equipment,
        };
      });

      console.log("Exercises", exercises);

      setExercises(exercises);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Something went wrong. Please try again later.");
    }
  };

  const checkIfLiftExists = async (lift) => {
    // check if the lift is already in the async storage
    // if it is, don't save it
    try {
      const jsonValue = await AsyncStorage.getItem("@exercises");
      const exercises = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (exercises) {
        const exists = exercises.find(
          (exercise) => exercise.exerciseName === lift.exerciseName,
        );
        if (exists) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const handleSaveLift = async ({ lift }) => {
    console.log("Saving lift", lift);

    // check if the lift is already in the async storage
    // if it is, don't save it
    const exists = await checkIfLiftExists(lift);

    if (exists) {
      console.log("Lift already saved");
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Lift already saved");
      return;
    }

    // save the lift in to the database
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Please login to save a lift");
      return;
    }

    const userId = user.uid;

    console.log("Saving lift to user", userId);

    const exercise = {
      defaultNumberOfReps: 10,
      defaultNumberOfSets: 4,
      defaultWeight: 40,
      exerciseName: lift.exerciseName,
      defaultRestTime: 60,
      defaultWeightSystem: "lbs",
      muscle: lift.muscle,
      type: lift.type,
      equipment: lift.equipment,
      userId: userId,
      weightRecord: [],
    };

    console.log("Exercise", exercise);

    try {
      const response = await addExerciseToUser(
        userId,
        exercise,
        setError,
        setLoading,
      );

      // it will return the new list of saved exercises
      // that we can save in the async storage
      if (response) {
        try {
          await AsyncStorage.setItem("@exercises", JSON.stringify(response));
          setTimeout(() => {
            setSuccess(null);
          }, 2000);
          setSuccess("Lift saved");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.containerExercises}>
      <ScrollView style={{ width: "100%", minHeight: 600 }}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 15 }}
          />
        )}
        {error && (
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            {error}
          </Text>
        )}
        {success && (
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            {success}
          </Text>
        )}
        <View style={styles.search}>
          <TextInput
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              backgroundColor: "#4A4A4B",
              padding: 14,
              borderRadius: 20,
              width: "75%",
            }}
            placeholder="Search for a lift"
            onChangeText={(text) => setInputName(text)}
          />
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#313231",
              padding: 14,
              borderRadius: 30,
            }}
            onPress={() => handleSearch(inputName)}
          >
            <Ionicons name="search-outline" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.exercises}>
          {exercises &&
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
                key={lift.exerciseName}
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
                  onPress={() => handleSaveLift({ lift: lift })}
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
                <View
                  style={{
                    width: "80%",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      textAlign: "left",
                    }}
                  >
                    {lift.exerciseName}
                  </Text>
                  <Text
                    style={{
                      color: "#e0e0e0",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {lift.muscle}
                  </Text>
                </View>
              </View>
            ))}
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

  search: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    paddingTop: 20,
  },

  exercises: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 60,
    padding: 20,
    borderRadius: 0,
  },
});
