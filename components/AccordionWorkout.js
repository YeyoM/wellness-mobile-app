import { Image, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { EditRoutineContext } from "../context/EditRoutineContext.js";
import deleteRoutine from "../FirebaseFunctions/Routines/deleteRoutine.js";
import { FIREBASE_AUTH } from "../firebaseConfig.js";

const Accordion = ({
  routine_,
  navigation,
  index,
  onRefresh,
  isFavRoutine,
  setFavoriteRoutine,
  deleteFavoriteRoutine,
}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { initializeEditRoutine } = useContext(EditRoutineContext);

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handleEdit = async () => {
    // initialize the edit routine context with the routine
    await initializeEditRoutine(routine_, index);
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
            setLoading(true);
            setSuccess(false);
            try {
              await deleteRoutine(FIREBASE_AUTH.currentUser.uid, routine_);
              setLoading(false);
              setSuccess(true);
              onRefresh(); // Refresh the routines
              navigation.navigate("Home", { refresh: true });
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
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet";
              heightValue.value = withTiming(measure(listRef).height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
          setIsOpen(!isOpen);
        }}
        style={styles.viewContainer}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: routine_.image }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderRadius: 14,
            }}
          />
          {isFavRoutine ? (
            <Pressable
              style={styles.buttonFavorite}
              onPress={() => deleteFavoriteRoutine()}
            >
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          ) : (
            <Pressable
              style={styles.buttonFavorite}
              onPress={() => setFavoriteRoutine(routine_)}
            >
              <Ionicons name="heart-outline" size={24} color="white" />
            </Pressable>
          )}
        </View>
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
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={styles.textTitle}>{routine_.routineName}</Text>
            <Text style={styles.routineInfo_}>
              {routine_.numberOfDays} days
            </Text>
          </View>
          <View style={styles.textTapContainer}>
            <Text style={styles.textTap}>{isOpen ? "Close" : "View"}</Text>
          </View>
        </View>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <Animated.View style={[styles.content, { opacity: progress }]}>
            {routine_.days.map((day, index) => (
              <View style={styles.singleDay} key={index}>
                <Text style={{ color: "#fff", fontSize: 20, marginBottom: 10 }}>
                  {day.dayName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={styles.routineInfo}>
                    {day.exercises?.length} exercises
                  </Text>
                  <Text style={styles.routineInfo}>
                    {parseInt(day.totalSets)} sets
                  </Text>
                  <Text style={styles.routineInfo}>
                    {parseFloat(day.totalCalories)} calories
                  </Text>
                  <Text style={styles.routineInfo}>
                    {Math.round(parseFloat(day.totalDuration))} minutes
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonEdit} onPress={() => handleEdit()}>
                <Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.buttonDelete}
                onPress={() => handleDelete()}
              >
                {loading ? (
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Loading...
                  </Text>
                ) : (
                  <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
                )}
              </Pressable>
            </View>
            {success ? (
              <Text
                style={{ color: "#98ff8c", marginTop: 10, fontStyle: "italic" }}
              >
                Routine deleted successfully, refreshing...
              </Text>
            ) : null}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262B",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    overflow: "hidden",
    width: "90%",
  },

  textTitle: {
    fontSize: 20,
    color: "white",
  },

  imageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    borderRadius: 14,
  },

  buttonFavorite: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#157AFF",
    padding: 10,
    borderRadius: 14,
  },

  viewContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  contentContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
  },

  content: {
    padding: 10,
    marginTop: 10,
  },

  routineInfo_: {
    fontSize: 14,
    color: "white",
  },

  routineInfo: {
    fontSize: 11,
    color: "white",
    marginRight: 8,
    marginTop: 5,
  },

  textTapContainer: {
    backgroundColor: "#157AFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },

  textTap: {
    fontSize: 14,
    color: "white",
    alignSelf: "center",
  },

  singleDay: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },

  singleExercise: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#313231",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 14,
  },

  textContent_: {
    fontSize: 16,
    color: "white",
  },

  textContent: {
    fontSize: 12,
    color: "gray",
    marginRight: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  buttonEdit: {
    width: "48%",
    height: 48,
    backgroundColor: "#157AFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  buttonDelete: {
    width: "48%",
    height: 48,
    backgroundColor: "#840505",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
