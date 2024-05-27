import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import CarouselDays from "../components/CarouselDays";
import EditingRoutineExerciseList from "../components/EditingRoutineExerciseList";
import alert from "../components/Alert.js";

import { FIREBASE_AUTH } from "../firebaseConfig.js";
import saveEditedRoutine from "../FirebaseFunctions/Routines/saveEditedRoutine.js";

import { EditRoutineContext } from "../context/EditRoutineContext";
import { AppContext } from "../context/AppContext.js";

export default function EditRoutine({ navigation }) {
  const {
    routine,
    setRoutine,
    currentDay,
    setCurrentDay,
    totalDays,
    routineName,
    setRoutineName,
    daysNames,
    setDaysNames,
    routineBeforeEditIndex,
    getRoutineBeforeEdit,
    clenUpEditRoutine,
  } = useContext(EditRoutineContext);

  const { refreshSpecificRoutine, refreshSpecificDaysFromRoutine } =
    useContext(AppContext);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const refInputRoutineName = useRef(null);
  const refInputDayName = useRef(null);

  const updateRoutineNames = (routineName, daysNames, setRoutine) => {
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.routineName = routineName;
      newRoutine.days = newRoutine.days.map((day, index) => {
        day.dayName = daysNames[index];
        return day;
      });
      return newRoutine;
    });
  };

  const handleSave = async () => {
    // update the name of the routine and the names of the days
    updateRoutineNames(routineName, daysNames, setRoutine);
    const user = FIREBASE_AUTH.currentUser;
    // check if the user is logged in
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    // save the routine to the database
    setLoading(true);
    try {
      await saveEditedRoutine(routine);
      // refresh just the routine that was edited
      await refreshSpecificRoutine(routine);
      refreshSpecificDaysFromRoutine(routine);
      setLoading(false);
      setSuccess(true);
      navigation.navigate("Saved Routines");
    } catch (err) {
      console.log(err);
      alert("Couldn't save the routine");
      setLoading(false);
    }
  };

  const handleGoBack = async () => {
    // get the routine before edit from the async async-storage
    const routineBeforeEdit = await getRoutineBeforeEdit();
    navigation.navigate("Saved Routines", {
      beforeEdit: true,
      beforeEditIndex: routineBeforeEditIndex,
      routineBeforeEdit: routineBeforeEdit,
    });
    await clenUpEditRoutine();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.home}>
        {/*aqui la parte de arriba*/}
        <View style={styles.topBar}>
          {loading || success ? null : (
            <Pressable
              onPress={() => handleGoBack()}
              style={{
                position: "absolute",
                top: -5,
                left: 20,
                height: 36,
                width: 36,
                zIndex: 999,
                backgroundColor: "#131417",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-back-outline" size={36} color="white" />
            </Pressable>
          )}
          {success ? null : (
            <Pressable
              onPress={() => handleSave()}
              style={{
                position: "absolute",
                top: -5,
                right: 20,
                height: 36,
                width: 46,
                zIndex: 999,
                backgroundColor: "#157AFF",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : success ? null : (
                <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
              )}
            </Pressable>
          )}
          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {/*<When pressing the pencil, activate the textinput*/}
            <TextInput
              style={{ color: "#fff", fontSize: 24, textAlign: "center" }}
              value={routineName}
              ref={refInputRoutineName}
              onChangeText={(text) => setRoutineName(text)}
            />
            <Pressable onPress={() => refInputRoutineName.current.focus()}>
              <Ionicons
                name="pencil-outline"
                size={20}
                color="white"
                style={{ marginLeft: 5 }}
              />
            </Pressable>
          </View>
        </View>
        {/* Carrousel de los dias */}
        <CarouselDays
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          totalDays={totalDays}
        />
        {success ? (
          <Text style={{ color: "#63D471", fontStyle: "italic" }}>
            Routine updated correctly! Redirecting...
          </Text>
        ) : null}
        <View
          style={{
            width: "100%",
            height: "100%",
            maxHeight: Dimensions.get("window").height - 140,
            backgroundColor: "#0B0B0B",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 30,
            paddingTop: 16,
          }}
        >
          {/*aqui la parte de abajo (editar nombre dia y agregar ejercicios)*/}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 20,
            }}
          >
            <View>
              <View
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "100%",
                }}
              >
                <TextInput
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    textAlign: "center",
                    width: "auto",
                    maxWidth: "60%",
                  }}
                  value={daysNames[currentDay]}
                  ref={refInputDayName}
                  onChangeText={(text) => {
                    const newDaysNames = [...daysNames];
                    newDaysNames[currentDay] = text;
                    setDaysNames(newDaysNames);
                  }}
                />
                <Pressable onPress={() => refInputDayName.current.focus()}>
                  <Ionicons
                    name="pencil-outline"
                    size={20}
                    color="white"
                    style={{ marginLeft: 5, width: "10%" }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                  width: "auto",
                  maxWidth: "70%",
                }}
              >
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginRight: 5 }}
                >
                  {Math.round(
                    parseFloat(routine.days[currentDay].totalDuration),
                  ) ?? 0}{" "}
                  min
                </Text>
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginRight: 5 }}
                >
                  {parseFloat(routine.days[currentDay].totalSets ?? 0)} sets
                </Text>
                <Text
                  style={{ color: "#9095A1", fontSize: 12, marginRight: 5 }}
                >
                  {parseFloat(routine.days[currentDay].totalCalories) ?? 0} cal
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Add Lift")}
            >
              <Ionicons name="add-outline" size={34} color="white" />
              <Text
                style={{ color: "#9095A1", fontSize: 10, textAlign: "center" }}
              >
                Add Exercise
              </Text>
            </Pressable>
          </View>
          {Platform.OS === "ios" || Platform.OS === "android" ? (
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
              <Ionicons
                name="information-circle-outline"
                size={12}
                color="#a0a0a0"
              />
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
          ) : null}
          <View style={styles.containerExercises}>
            <View style={styles.exercises}>
              <EditingRoutineExerciseList
                exercices={routine.days[currentDay].exercises}
                cardioExercises={routine.days[currentDay].cardioExercises ?? []}
                navigation={navigation}
              />
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },

  home: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 40,
    top: 0,
    zIndex: 900,
    backgroundColor: "#24262B",
  },

  title: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#fff",
    textAlign: "center",
  },

  containerExercises: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  exercises: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0B0B0B",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
  },
});
