import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";

import { getRoutine } from "../FirebaseFunctions/Routines/getRoutine";
import cleanSharedRoutine from "../Utils/cleanSharedRoutine";
import saveSharedRoutine from "../FirebaseFunctions/Routines/saveSharedRoutine";

import { AppContext } from "../context/AppContext.js";

export default function SharedRoutine({ navigation, route }) {
  const { routineId } = route.params;
  const {
    firebaseUser,
    exercises,
    routines,
    days,
    updateDays,
    updateExercises,
    updateRoutines,
  } = useContext(AppContext);

  const [routine, setRoutine] = useState(null);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRoutine(routineId)
      .then((routine) => {
        if (!routine) {
          setError("Routine not found");
          setLoading(false);
          navigation.goBack();
          return;
        }
        if (routine.userId === firebaseUser.uid) {
          setError("You can't save your own routine");
          setLoading(false);
          navigation.goBack();
          return;
        }
        // chack if routine is already saved
        // some routines might have a property called originalRoutineId
        routines.forEach((r) => {
          if (r.originalRoutineId === routineId) {
            setError(
              "This routine is already saved, if you want to update it, please go to your routines and update it from there",
            );
            setLoading(false);
            navigation.goBack();
            return;
          }
        });
        setRoutine(routine);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("There was an error getting the routine");
        console.log(error);
      });
  }, []);

  const handleSaveRoutine = async () => {
    try {
      setSaving(true);
      const cleanedRoutine = await cleanSharedRoutine(routine);
      const { newRoutine, newExercises } = await saveSharedRoutine(
        firebaseUser.uid,
        cleanedRoutine,
        exercises,
      );
      updateRoutines([...routines, newRoutine]);
      updateDays([...days, ...newRoutine.days]);
      updateExercises([...exercises, ...newExercises]);
      setSaving(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      setError("There was an error saving the routine");
      setSaving(false);
    }
  };

  const handeDismiss = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Someone shared a routine with you!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : !loading && error ? (
        <Text style={{ color: "red" }}>{error}</Text>
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
          {saving ? (
            <Text style={{ color: "#fff" }}>Saving routine...</Text>
          ) : (
            <View style={styles.buttonsContainer}>
              <Pressable onPress={handeDismiss} style={styles.dismissButton}>
                <Text style={styles.dismissButtonText}>Dismiss</Text>
              </Pressable>
              <Pressable onPress={handleSaveRoutine} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Routine</Text>
              </Pressable>
            </View>
          )}
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
