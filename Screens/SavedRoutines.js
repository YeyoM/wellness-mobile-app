import React, { useState, useEffect, useCallback, useContext } from "react";
import {
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

import { AppContext } from "../context/AppContext.js";

export default function SavedRoutines({ navigation, route }) {
  const {
    routines,
    setRoutines,
    updateRoutines,
    refreshRoutines,
    favoriteRoutine,
    updateFavoriteRoutine,
    removeFavoriteRoutine,
  } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (route.params && route.params.beforeEdit) {
      console.log("a");
      console.log(route.params.routineBeforeEdit);
      const newRoutines = [...routines];
      newRoutines[route.params.beforeEditIndex] =
        route.params.routineBeforeEdit;
      console.log(newRoutines);
      updateRoutines(newRoutines);
      route.params.beforeEdit = false;
      route.params.beforeEditIndex = null;
      route.params.routineBeforeEdit = null;
    }
  }, [route]);

  const onRefresh = useCallback(async () => {
    const routinesBeforeRefresh = routines;
    setRoutines(null);
    setRefreshing(true);
    try {
      await refreshRoutines();
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
                  onRefresh={onRefresh}
                  isFavRoutine={
                    favoriteRoutine && favoriteRoutine.id === routine.id
                      ? true
                      : false
                  }
                  setFavoriteRoutine={updateFavoriteRoutine}
                  deleteFavoriteRoutine={removeFavoriteRoutine}
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
