import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import editOneRepMax from "../FirebaseFunctions/Exercises/editOneRepMax.js";

import { AppContext } from "../context/AppContext.js";

export default function EditOneRepMax({ navigation, route }) {
  const { exercises, updateExercises } = useContext(AppContext);

  const [exercise, setExercise] = useState(null);
  const [oneRepMax, setOneRepMax] = useState(null);
  const [calculatedOneRepMax, setCalculatedOneRepMax] = useState(null);

  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateOneRepMax = () => {
    if (weight && reps) {
      const oneRepMax = weight / (1.0278 - 0.0278 * reps);
      setCalculatedOneRepMax(oneRepMax.toFixed(0));
    }
  };

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleRepsChange = (text) => {
    setReps(text);
  };

  const handleReset = () => {
    setWeight(null);
    setReps(null);
    setCalculatedOneRepMax(null);
  };

  const handleUseCalculatedOneRepMax = () => {
    setOneRepMax(calculatedOneRepMax);
  };

  // update the exercise in the local storage with the new one rep max
  const updateExercises_ = async (exercise) => {
    try {
      const updatedExercises = exercises.map((ex) => {
        if (ex.exerciseId === exercise.exerciseId) {
          ex.oneRepMax = oneRepMax;
        }
        return ex;
      });
      await updateExercises(updatedExercises);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (exercise && oneRepMax) {
      try {
        setLoading(true);
        setSuccess(false);
        await editOneRepMax(exercise, oneRepMax);
        await updateExercises_(exercise);
        setSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert("Error", "An error occurred while saving your 1RM");
        console.log(error);
      }
    }
  };

  const handleAddWeight = () => {
    console.log("Adding weight");
    if (oneRepMax !== null && oneRepMax !== undefined) {
      setOneRepMax(oneRepMax + 1);
    }
  };

  const handleSubtractWeight = () => {
    if (oneRepMax !== null && oneRepMax !== undefined && oneRepMax > 0) {
      setOneRepMax(oneRepMax - 1);
    }
  };

  React.useEffect(() => {
    if (route.params && route.params.exercise) {
      console.log(route.params.exercise);
      setExercise(route.params.exercise);
      const oneRepMax = route.params.exercise.oneRepMax;
      if (oneRepMax !== undefined) {
        setOneRepMax(oneRepMax);
      } else {
        setOneRepMax(100);
      }
    } else {
      console.log("No exercise found");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 22,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              marginTop: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            My 1RM
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {exercise ? exercise.exerciseName : ""}
          </Text>
          {success ? (
            <Text style={{ color: "#63D471", fontStyle: "italic" }}>
              Saved successfully!
            </Text>
          ) : null}
          <Ionicons name="barbell" size={50} color="#0496FF" />
          <View style={styles.oneRepMaxContainer}>
            <Pressable onPress={() => handleSubtractWeight()}>
              <Ionicons name="remove-outline" size={40} color="#0496FF" />
            </Pressable>
            <Text style={styles.oneRepMax}>{oneRepMax}</Text>
            <Pressable onPress={() => handleAddWeight()}>
              <Ionicons name="add-outline" size={40} color="#0496FF" />
            </Pressable>
          </View>
          <Text style={styles.weightUnit}>
            {exercise &&
            exercise.defaultWeightSystem &&
            exercise.defaultWeightSystem === "kg"
              ? "Kilograms"
              : "Pounds"}
          </Text>
          {/** Add a slider here */}
          <View style={styles.infoContainer}>
            <Ionicons
              name="information-circle-outline"
              size={12}
              color="#a0a0a0"
            />
            <Text style={styles.infoText}>
              Update your 1RM or approximate it using our calculator
            </Text>
          </View>
          <View style={styles.calculatorContainer}>
            <View style={styles.calculatorTop}>
              <View style={styles.calculatorGroup}>
                <TextInput
                  style={styles.calculatorInput}
                  onChangeText={handleWeightChange}
                  inputMode="numeric"
                />
                <Text style={styles.calculatorLabel}>Weight</Text>
              </View>
              <View style={styles.calculatorGroup}>
                <TextInput
                  style={styles.calculatorInput}
                  onChangeText={handleRepsChange}
                  inputMode="numeric"
                />
                <Text style={styles.calculatorLabel}>Reps</Text>
              </View>
            </View>
            <Pressable onPress={calculateOneRepMax}>
              <Text style={{ color: "#0496FF", fontSize: 16, marginTop: 20 }}>
                Calculate
              </Text>
            </Pressable>
            <View style={styles.calculatorBottom}>
              <Text style={styles.textAprox}>Your approximated 1RM is:</Text>
              <Text style={styles.textOneRepMax}>
                {calculatedOneRepMax ? calculatedOneRepMax : "-"}
              </Text>
              <Text style={styles.textKg}>
                {exercise &&
                exercise.defaultWeightSystem &&
                exercise.defaultWeightSystem === "kg"
                  ? "Kilograms"
                  : "Pounds"}
              </Text>
              {calculatedOneRepMax && calculatedOneRepMax !== "-" && (
                <Pressable
                  style={{ marginTop: 20 }}
                  onPress={handleUseCalculatedOneRepMax}
                >
                  <Text style={{ color: "#0496FF", fontSize: 16 }}>
                    Use this value
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.bottomButtons}>
            <Pressable
              style={styles.resetButton}
              onPress={handleReset}
              disabled={loading || success}
            >
              {!success ? (
                <Text style={styles.resetButtonText}>Reset</Text>
              ) : null}
            </Pressable>
            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading || success}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : success ? (
                <Ionicons name="checkmark" size={24} color="white" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 36,
    width: 36,
    zIndex: 999,
    backgroundColor: "#24262B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  oneRepMaxContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  oneRepMax: {
    color: "white",
    fontSize: 80,
    marginTop: 0,
    fontWeight: "800",
    textAlign: "center",
  },

  weightUnit: {
    color: "#a0a0a0",
    fontSize: 20,
    marginTop: -10,
    textAlign: "center",
  },

  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  infoText: {
    color: "#a0a0a0",
    fontSize: 12,
    textAlign: "center",
    marginLeft: 5,
  },

  calculatorContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  calculatorTop: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  calculatorGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  calculatorInput: {
    backgroundColor: "#24262B",
    color: "white",
    fontSize: 24,
    width: 80,
    height: 100,
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#24262B",
  },

  calculatorLabel: {
    color: "#a0a0a0",
    fontSize: 12,
    marginTop: 10,
  },

  calculatorBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  textAprox: {
    color: "#a0a0a0",
    fontSize: 16,
  },

  textOneRepMax: {
    color: "white",
    fontSize: 48,
    fontWeight: "800",
  },

  textKg: {
    color: "#a0a0a0",
    fontSize: 20,
  },

  bottomButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 40,
  },

  resetButton: {
    width: "45%",
    backgroundColor: "#24262B",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 13,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  resetButtonText: {
    color: "#a0a0a0",
    fontSize: 18,
  },

  saveButton: {
    width: "45%",
    backgroundColor: "#157AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
});
