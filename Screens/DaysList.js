import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
  Image,
  Share,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FIREBASE_AUTH } from "../firebaseConfig.js";
import deleteRoutine from "../FirebaseFunctions/Routines/deleteRoutine.js";
import deleteFavoriteRoutine from "../AsyncStorageFunctions/Routines/deleteFavoriteRoutine.js";

import PreviewWorkout from "../components/PreviewWorkout.js";

import { EditRoutineContext } from "../context/EditRoutineContext.js";
import { AppContext } from "../context/AppContext.js";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function DaysList({ navigation, route }) {
  const { initializeEditRoutine } = useContext(EditRoutineContext);
  const { user, deleteDaysState, setFavoriteRoutine, deleteRoutineState } =
    useContext(AppContext);

  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {}, []);

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
        days.push(day);
      }
      setRoutine(route.params.routine);
      setDays(days);
      setRoutineName(route.params.routine.routineName);
    }

    if (route.params && route.params.index !== null) {
      setIndex(route.params.index);
    }
  }, [route]);

  const handleEdit = async () => {
    // initialize the edit routine context with the routine
    await initializeEditRoutine(routine, index);
    navigation.push("Edit Routine");
  };

  const handleShare = async () => {
    bottomSheetRef.current.expand();
  };

  const handleCopyId = async () => {
    await Clipboard.setStringAsync(`routine/${routine.id}`);
    Alert.alert(
      "Routine ID Copied",
      "You can now share this ID with your friends!",
      [
        {
          text: "Awesome!",
          onPress: () => console.log("OK Pressed"),
        },
      ],
    );
  };

  const handleShareLink = async () => {
    const devLink = `exp://192.168.1.76:8081/?resource=routine&id=${routine.id}`;
    const prodLink = `wellness://?resource=routine&id=${routine.id}`;

    try {
      const result = await Share.share({
        message: `Check out this routine I found on Wellness: ${devLink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type of", result.activityType);
        } else {
          console.log("Shared");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
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
              deleteRoutineState(routine);
              deleteDaysState(routine);
              setLoading(false);
              setSuccess(true);
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
    <GestureHandlerRootView style={styles.container}>
      <View style={{ backgroundColor: "#0B0B0B", height: "100%" }}>
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
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.buttonDelete}
              onPress={() => handleDelete()}
            >
              {loading ? (
                <Text style={{ color: "white", fontSize: 16 }}>Loading...</Text>
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
              )}
            </Pressable>
            <Pressable style={styles.buttonShare} onPress={() => handleShare()}>
              <Text style={{ color: "white", fontSize: 16, marginRight: 6 }}>
                Share
              </Text>
              <Ionicons name="share-outline" size={20} color="white" />
            </Pressable>
          </View>
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["65%", "75%"]}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#292929" }}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
        >
          <BottomSheetView style={styles.shareContainer}>
            <Pressable onPress={() => bottomSheetRef.current.close()}>
              <Text style={{ color: "#007AC8", fontSize: 18 }}>Done</Text>
            </Pressable>
            {days && days[0] && days[0].image && (
              <Image
                source={{ uri: days[0].image }}
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 20,
                  borderRadius: 16,
                }}
              />
            )}
            <View style={styles.routineInfo}>
              <Text style={{ color: "#fff", fontSize: 24 }}>{routineName}</Text>
              <Text style={{ color: "#a0a0a0", fontSize: 16 }}>
                {days && days.length} Days
              </Text>
            </View>
            <Pressable
              onPress={() => handleShareLink()}
              style={styles.shareLink}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Share Link</Text>
            </Pressable>
            <View style={styles.routineId}>
              <Text style={styles.routeIdText} numberOfLines={1}>
                Routine ID: {routine && `routine/${routine.id}`}
              </Text>
              <Pressable onPress={() => handleCopyId()}>
                <Ionicons name="copy-outline" size={24} color="#007AC8" />
              </Pressable>
            </View>
            <Text
              style={{
                color: "#a0a0a0",
                fontSize: 12,
                marginTop: 10,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Or share this routine ID with your friends and tell them to enter
              it on the search page to find your routine.
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    marginBottom: 60,
  },

  buttonDelete: {
    width: "40%",
    paddingVertical: 18,
    backgroundColor: "#840505",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  buttonShare: {
    width: "40%",
    paddingVertical: 18,
    backgroundColor: "#1565C0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
  },

  shareContainer: {
    flex: 1,
    backgroundColor: "#292929",
    padding: 16,
    height: "100%",
  },

  routineInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  routineId: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  routeIdText: {
    color: "#fff",
    fontSize: 16,
    width: "80%",
    overflow: "hidden",
  },

  shareLink: {
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "#007AC8",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
