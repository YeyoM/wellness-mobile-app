import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationSettings({ navigation }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);
  const [workoutRemindersEnabled, setWorkoutRemindersEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
      </View>
      <View style={styles.doneButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              color: "#0496FF",
            }}
          >
            Done
          </Text>
        </Pressable>
      </View>
      <Text style={styles.text}>Notification Settings</Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - 200,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 40,
        }}
      >
        <ScrollView style={styles.content}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
              height: "100%",
              width: "100%",
            }}
          >
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 10,
                backgroundColor: "#24262B",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Push Notifications
              </Text>
              <Switch
                trackColor={{ false: "#0BB712", true: "#0BB712" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={pushNotificationsEnabled}
                onValueChange={(value) => setPushNotificationsEnabled(value)}
              />
            </Pressable>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 10,
                backgroundColor: "#24262B",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Workout Reminders
              </Text>
              <Switch
                trackColor={{ false: "#0BB712", true: "#0BB712" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={workoutRemindersEnabled}
                onValueChange={(value) => setWorkoutRemindersEnabled(value)}
              />
            </Pressable>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 10,
                backgroundColor: "#24262B",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Sound</Text>
              <Switch
                trackColor={{ false: "#0BB712", true: "#0BB712" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={soundEnabled}
                onValueChange={(value) => setSoundEnabled(value)}
              />
            </Pressable>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 10,
                backgroundColor: "#24262B",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Vibrations</Text>
              <Switch
                trackColor={{ false: "#0BB712", true: "#0BB712" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={vibrationEnabled}
                onValueChange={(value) => setVibrationEnabled(value)}
              />
            </Pressable>
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

  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
    backgroundColor: "#0b0b0b",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },

  doneButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 36,
    right: 20,
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  content: {
    width: "100%",
    paddingHorizontal: 30,
  },
});
