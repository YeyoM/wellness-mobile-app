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

import { Ionicons } from "@expo/vector-icons";

export default function NotificationSettings({ navigation }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);
  const [workoutRemindersEnabled, setWorkoutRemindersEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Settings</Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.8,
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
