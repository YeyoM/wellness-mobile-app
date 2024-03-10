import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function EditOneRepMax({ navigation, route }) {
  const [exercise, setExercise] = React.useState(null);
  const [oneRepMax, setOneRepMax] = React.useState(null);

  React.useEffect(() => {
    if (route.params && route.params.exercise) {
      console.log(route.params.exercise);
      setExercise(route.params.exercise);
      const oneRepMax = route.params.exercise.oneRepMax;
      if (oneRepMax) {
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
              marginTop: 20,
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
          <Ionicons name="barbell" size={60} color="#0496FF" />
          <Text style={styles.oneRepMax}>{oneRepMax}</Text>
          <Text style={styles.weightUnit}>Kilograms</Text>
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
                <TextInput style={styles.calculatorInput} />
                <Text style={styles.calculatorLabel}>Weight</Text>
              </View>
              <View style={styles.calculatorGroup}>
                <TextInput style={styles.calculatorInput} />
                <Text style={styles.calculatorLabel}>Reps</Text>
              </View>
            </View>
            <View style={styles.calculatorBottom}>
              <Text style={styles.textAprox}>Your approximated 1RM is:</Text>
              <Text style={styles.textOneRepMax}>100</Text>
              <Text style={styles.textKg}>Kg</Text>
            </View>
          </View>
          <View style={styles.bottomButtons}>
            <Pressable style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
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

  oneRepMax: {
    color: "white",
    fontSize: 68,
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
