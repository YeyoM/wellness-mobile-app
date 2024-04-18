import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import deleteRoutine from "../FirebaseFunctions/Routines/deleteRoutine.js";
import { FIREBASE_AUTH } from "../firebaseConfig.js";
import PreviewWorkout from "../components/PreviewWorkout.js";
import deleteFavoriteRoutine from "../AsyncStorageFunctions/Routines/deleteFavoriteRoutine.js";

import { EditRoutineContext } from "../context/EditRoutineContext.js";
import { AppContext } from "../context/AppContext.js";

import Constants from "expo-constants";

export default function DaysList({ navigation, route }) {
  const { initializeEditRoutine } = useContext(EditRoutineContext);
  const { user, refreshDays, setFavoriteRoutine, refreshRoutines } =
    useContext(AppContext);

  const [days, setDays] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [routineName, setRoutineName] = useState(null);
  const [userWeight, _setUserWeight] = useState(user.weight);
  const [userWeightUnit, _setUserWeightUnit] = useState(user.weightUnit);
  const [userGender, _setUserGender] = useState(user.gender);
  const [index, setIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (route.params && route.params.routine) {
      let days = [];
      if (
        !route.params.routine.days ||
        route.params.routine.days.length === 0
      ) {
        console.log("No days found");
        return;
      }
      for (let i = 0; i < route.params.routine.days.length; i++) {
        let day = route.params.routine.days[i];
        day.image = route.params.routine.image;
        day.dayId = day.id;
        days.push(day);
        console.log(day);
      }
      setRoutine(route.params.routine);
      setDays(days);
      setRoutineName(route.params.routine.routineName);
    }

    if (route.params && route.params.index) {
      setIndex(route.params.index);
    }
  }, [route]);

  const handleEdit = async () => {
    // initialize the edit routine context with the routine
    await initializeEditRoutine(routine, index);
    navigation.push("Edit Routine");
  };

  const handleDelete = async () => {
    console.log("delete");
    Alert.alert(
      "Delete Routine",
      "Are you sure you want to delete this routine?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            deleteFavoriteRoutine();
            setFavoriteRoutine(null);
            setLoading(true);
            setSuccess(false);
            try {
              await deleteRoutine(FIREBASE_AUTH.currentUser.uid, routine);
              setLoading(false);
              setSuccess(true);
              await refreshDays();
              await refreshRoutines();
              navigation.navigate("Saved Routines");
            } catch (error) {
              setLoading(false);
              setSuccess(false);
              Alert.alert("Error", "There was an error deleting the routine", [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ]);
              console.log(error);
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            width: "100%",
          }}
        >
          <View style={styles.header}>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {routineName}
            </Text>
            <Pressable style={styles.buttonEdit} onPress={() => handleEdit()}>
              <Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
            </Pressable>
          </View>
          <View style={{ width: "90%", alignItems: "center" }}>
            {!days ? (
              <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
                Getting your routine info...
              </Text>
            ) : (
              days &&
              days.map((day, index) => {
                return (
                  <PreviewWorkout
                    key={index}
                    navigation={navigation}
                    day={day}
                    userWeight={userWeight}
                    userWeightUnit={userWeightUnit}
                    userGender={userGender}
                  />
                );
              })
            )}
          </View>
        </View>
        <Pressable style={styles.buttonDelete} onPress={() => handleDelete()}>
          {loading ? (
            <Text style={{ color: "white", fontSize: 16 }}>Loading...</Text>
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    width: "100%",
  },

  header: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    heaight: 50,
    marginVertical: 40,
  },

  buttonEdit: {
    width: "30%",
    height: 40,
    backgroundColor: "#1565C0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 30,
  },

  buttonDelete: {
    width: "90%",
    height: 52,
    backgroundColor: "#840505",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 50,
  },
});
