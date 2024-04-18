import React, { useState, useRef, useContext } from "react";
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

import addExerciseToUser from "../FirebaseFunctions/Exercises/addExerciseToUser.js";

import { AppContext } from "../context/AppContext.js";

export default function SearchLift({ navigation }) {
  const { firebaseUser, user, exercises, refreshExercises, updateExercises } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [searchedExercises, setSearchedExercises] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [inputName, setInputName] = useState("");
  const [inputType, _setInputType] = useState("strength");
  const [inputMuscle, _setInputMuscle] = useState("chest");

  const scrollViewRef = useRef();

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

      setSearchedExercises(exercises);
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
    const exists = exercises.find(
      (exercise) => exercise.exerciseName === lift.exerciseName,
    );
    if (exists) {
      return true;
    } else {
      return false;
    }
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
    if (!firebaseUser) {
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Please login to save a lift");
      return;
    }

    let weightUnit = user.weightUnit ? user.weightUnit : "lbs";
    if (weightUnit === "lbs") {
      defaultWeight = 80;
    } else {
      defaultWeight = 40;
    }

    console.log("Weight unit", weightUnit);
    console.log("Default weight", defaultWeight);

    const userId = firebaseUser.uid;
    console.log("Saving lift to user", userId);

    const exercise = {
      defaultNumberOfReps: 10,
      defaultNumberOfSets: 4,
      defaultWeight: defaultWeight,
      exerciseName: lift.exerciseName,
      defaultRestTime: 60,
      defaultWeightSystem: weightUnit,
      muscle: lift.muscle,
      type: lift.type,
      equipment: lift.equipment,
      userId: userId,
      weightRecord: [],
      oneRepMax: 0,
    };

    console.log("Exercise", exercise);
    setLoading(true);
    try {
      const updatedExercises = await addExerciseToUser(userId, exercise);
      if (updatedExercises) {
        try {
          await updateExercises(updatedExercises);
          setTimeout(() => {
            setSuccess(null);
          }, 2000);
          setLoading(false);
          setSuccess("Lift saved");
          setSearchedExercises(null);
          setInputName("");

          // refresh the exercises in the context
          refreshExercises();
          navigation.navigate("Saved Lifts");
        } catch (error) {
          console.log(error);
          setTimeout(() => {
            setError(null);
          }, 2000);
          setLoading(false);
          setError("Something went wrong. Please try again later.");
        }
      } else {
        setTimeout(() => {
          setError(null);
        }, 2000);
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.containerExercises}>
      <ScrollView style={{ width: "100%", minHeight: 600 }} ref={scrollViewRef}>
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
          {searchedExercises &&
            searchedExercises.map((lift) => (
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
                  onPress={async () => {
                    scrollViewRef.current.scrollTo({
                      y: 0,
                      animated: true,
                    });
                    await handleSaveLift({ lift: lift });
                  }}
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
                    width: "70%",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      textAlign: "left",
                      marginRight: 10,
                    }}
                    numberOfLines={2}
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
