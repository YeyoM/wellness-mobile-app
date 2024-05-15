import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import alert from "../components/Alert.js";

import readableTimeToMinutes from "../Utils/readableTimeToMinutes.js";
import { AppContext } from "../context/AppContext.js";

export default function Profile({ navigation }) {
  const { user, firebaseUser, workouts } = useContext(AppContext);

  const [isLoading, _setIsLoading] = useState(false);
  const [finishedWorkouts, setFinishedWorkouts] = useState(0);
  const [hoursTrained, setHoursTrained] = useState(0);

  // finished workouts and hours trained
  useEffect(() => {
    let finished = 0;
    let time = 0;
    workouts.forEach((workout) => {
      finished++;
      time += readableTimeToMinutes(workout.totalTime);
    });
    setFinishedWorkouts(finished);
    setHoursTrained(Math.floor(time / 60));
  }, []);

  const handleShareProfile = async () => {
    const devLink = `exp://192.168.1.76:8081/?resource=profile&id=${firebaseUser.uid}`;
    const prodLink = `wellness://?resource=profile&id=${firebaseUser.uid}`;

    try {
      const result = await Share.share({
        message: `Check out my profile on the following link: ${devLink}, or here is my id: profile/${firebaseUser.uid}, just search for it in the app!`,
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

  const handleCopyId = async () => {
    await Clipboard.setStringAsync(`profile/${firebaseUser.uid}`);
    alert(
      "Your ID has been copied!",
      "You can now share this ID with your friends!",
      [
        {
          text: "Awesome!",
          onPress: () => console.log("OK Pressed"),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0496FF"
          style={{ zIndex: 100, marginBottom: 20 }}
        />
      ) : null}
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.75,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          paddingTop: 40,
        }}
      >
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.bio}>{user?.bio ? user.bio : "no bio"}</Text>
          </View>
          <View style={styles.right}>
            <Pressable
              onPress={() => {
                navigation.navigate("Account Settings", {
                  pushNotifications: user?.pushNotifications,
                  workoutReminders: user?.workoutReminders,
                  sound: user?.sound,
                  vibrations: user?.vibrations,
                  gym: user?.gym,
                  age: user?.age,
                  gender: user?.gender,
                });
              }}
            >
              <Ionicons name="settings-outline" size={32} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={styles.subHeader}>
          {user?.showHeightAndWeight ? (
            <View style={styles.top}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.weight}>{user?.weight}</Text>
                <Text style={styles.unit}>{user?.weightUnit}</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.weight}>{user?.height}</Text>
                <Text style={styles.unit}>{user?.heightUnit}</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.bottom}>
            <Pressable
              style={styles.editButton}
              onPress={() => {
                navigation.navigate("User Update", {
                  screen: "Edit Profile",
                  params: {
                    name: user?.name,
                    bio: user?.bio,
                    weight: user?.weight,
                    height: user?.height,
                    weightUnit: user?.weightUnit,
                    heightUnit: user?.heightUnit,
                    showHeightAndWeight: user?.showHeightAndWeight,
                    privateProfile: user?.privateProfile,
                    weightRecord: user?.weightRecord,
                  },
                });
              }}
            >
              <Text style={{ color: "white" }}>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.shareButton} onPress={handleShareProfile}>
              <Text style={{ color: "white" }}>Share Profile</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.routineId}>
          <Text style={styles.routeIdText} numberOfLines={1}>
            My ID: {firebaseUser && firebaseUser.uid}
          </Text>
          <Pressable onPress={() => handleCopyId()}>
            <Ionicons name="copy-outline" size={20} color="#007AC8" />
          </Pressable>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.stats}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Statistics
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("My Stats");
                }}
              >
                <Text
                  style={{
                    color: "#a0a0a0",
                    fontSize: 14,
                    marginBottom: 10,
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                  }}
                >
                  See more
                </Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View style={styles.stat}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Finished Workouts
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#0496FF",
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {finishedWorkouts}
                  </Text>
                </View>
              </View>
              <View style={styles.stat}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="hourglass-outline" size={24} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Hours Trained
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#0496FF",
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {hoursTrained}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.badges}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Badges
            </Text>
            <Text style={{ color: "#a0a0a0", fontSize: 16 }}>
              Coming soon...
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  left: {
    flexDirection: "column",
  },

  right: {
    flexDirection: "column",
  },

  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  bio: {
    color: "#a0a0a0",
    fontSize: 16,
  },

  subHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  weight: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  unit: {
    color: "#a0a0a0",
    fontSize: 16,
  },

  bottom: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  editButton: {
    backgroundColor: "#24262B",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  shareButton: {
    backgroundColor: "#0496FF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  stats: {
    marginTop: 20,
  },

  stat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#24262B",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },

  badges: {
    marginTop: 20,
  },

  routineId: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginBottom: 20,
  },

  routeIdText: {
    color: "#a0a0a0",
    fontSize: 14,
    width: "80%",
    overflow: "hidden",
  },
});
