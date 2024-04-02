import React, { useState, useEffect, useCallback } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";
import Accordion from "../components/AccordionWorkout";
import ErrorNotification from "../components/ErrorNotification";

import saveRoutinesStorage from "../AsyncStorageFunctions/Routines/saveRoutinesStorage.js";
import getRoutinesStorage from "../AsyncStorageFunctions/Routines/getRoutinesStorage.js";

import { getSavedRoutines } from "../FirebaseFunctions/Routines/getSavedRoutines.js";
import { FIREBASE_AUTH } from "../firebaseConfig.js";

export default function SavedRoutines({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const [routines, setRoutines] = useState(null);
  const [_user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (route.params && route.params.refresh) {
      console.log("refreshing");
      const user = FIREBASE_AUTH.currentUser;
      setRefreshing(true);
      getSavedRoutines(user.uid)
        .then((routines) => {
          setRoutines(routines);
          setRefreshing(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Couldn't get your routines");
          setRefreshing(false);
        });
      route.params.refresh = false;
    } else if (route.params && route.params.beforeEdit) {
      const newRoutines = [...routines];
      newRoutines[route.params.beforeEditIndex] =
        route.params.routineBeforeEdit;
      setRoutines(newRoutines);
      route.params.beforeEdit = false;
      route.params.beforeEditIndex = null;
      route.params.routineBeforeEdit = null;
    }
  }, [route]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setUser(user);
    } else {
      navigation.navigate("Login");
    }

    // before getting the routines, check if there routines in the async storage
    // if there is, get them from there, if not, get them from the database
    getRoutinesStorage().then((routines) => {
      if (routines) {
        setRoutines(routines);
      } else {
        getSavedRoutines(user.uid)
          .then((routines) => {
            saveRoutinesStorage(routines);
          })
          .catch((error) => {
            console.log(error);
            setError("Couldn't get your routines");
          });
      }
    });
  }, []);

  const onRefresh = useCallback(async () => {
    const user = FIREBASE_AUTH.currentUser;
    const routinesBeforeRefresh = await getRoutinesStorage();
    setRoutines(null);
    setRefreshing(true);
    try {
      console.log("refreshing");
      const refreshedRoutines = await getSavedRoutines(user.uid);
      setRoutines(refreshedRoutines);
      await saveRoutinesStorage(refreshedRoutines);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRoutines(routinesBeforeRefresh);
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError("Something went wrong. Please try again later.");
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {error ? <ErrorNotification error="Couldn't get your routines" /> : null}
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <Pressable
            style={styles.createContainer}
            onPress={() =>
              navigation.navigate("Add Routine", {
                newRoutineIndex: routines ? routines.length : 0,
              })
            }
          >
            <Text style={styles.create}>Add new routine</Text>
            <Ionicons name="create-outline" size={30} color="#0496FF" />
          </Pressable>
          <Text
            style={{
              color: "#a0a0a0",
              fontSize: 13,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            {refreshing ? "Refreshing..." : "Pull down to refresh"}
          </Text>
          {!refreshing && !routines ? (
            <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
              You don't have any routines yet
            </Text>
          ) : (
            routines &&
            routines.map((routine, index) => {
              return (
                <Accordion
                  key={index}
                  routine_={routine}
                  navigation={navigation}
                  index={index}
                />
              );
            })
          )}
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

  createContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#24262B",
    padding: 10,
    borderRadius: 14,
  },

  create: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 30,
  },

  button: {
    height: 50,
    width: "15%",
    borderRadius: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
