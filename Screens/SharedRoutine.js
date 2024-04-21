import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";

import { getRoutine } from "../FirebaseFunctions/Routines/getRoutine";

export default function SharedRoutine({ navigation, route }) {
  const { routineId } = route.params;

  const [routine, setRoutine] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRoutine(routineId)
      .then((routine) => {
        setRoutine(routine);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSaveRoutine = () => {};

  const handeDismiss = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Someone shared a routine with you!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.routineContainer}>
          {routine && (
            <View style={styles.routineCard}>
              <Image
                source={{ uri: routine.image }}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 14,
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 5,
                  width: "100%",
                }}
              >
                <View
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Text style={styles.textTitle}>{routine.routineName}</Text>
                  <Text style={styles.routineInfo_}>
                    {routine.numberOfDays} days
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <Pressable onPress={handeDismiss} style={styles.dismissButton}>
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </Pressable>
            <Pressable onPress={handleSaveRoutine} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Routine</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0B0B",
  },

  header: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    width: "80%",
  },

  routineContainer: {
    width: "100%",
    alignItems: "center",
  },

  routineCard: {
    backgroundColor: "#24262B",
    borderRadius: 15,
    overflow: "hidden",
    width: "90%",
    marginBottom: 40,
    padding: 10,
  },

  textTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },

  routineInfo_: {
    fontSize: 12,
    color: "#a0a0a0",
    marginTop: 2,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  saveButton: {
    backgroundColor: "#007AC8",
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },

  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },

  dismissButton: {
    backgroundColor: "#840505",
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },

  dismissButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
