import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ route, navigation }) {
  const {
    pushNotifications,
    workoutReminders,
    sound,
    vibrations,
    gym,
    age,
    gender,
  } = route.params;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      // clear async storage
      await AsyncStorage.clear();
      await signOut(FIREBASE_AUTH);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setSuccess("Cerrando sesión...");
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setError("Hubo un error al cerrar sesión");
    }
  };

  const handleDeleteAccount = async () => {
    // promt the user for confirmation
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => navigation.navigate("Delete Account"),
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
      </View>
      <Text style={styles.text}>Account Settings</Text>
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
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: 20,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              General
            </Text>
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
              onPress={() =>
                navigation.navigate("Notification Settings", {
                  pushNotifications: pushNotifications,
                  workoutReminders: workoutReminders,
                  sound: sound,
                  vibrations: vibrations,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Notifications
              </Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
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
              onPress={() =>
                navigation.navigate("Personal Info Settings", {
                  age: age,
                  gender: gender,
                  gym: gym,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Personal Information
              </Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </Pressable>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 20,
                marginBottom: 20,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Security and Privacy
            </Text>
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
                Blocked Accounts
              </Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
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
                Change Password
              </Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </Pressable>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 20,
                marginBottom: 20,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Information and Support
            </Text>
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
              <Text style={{ color: "white", fontSize: 16 }}>Help</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
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
              <Text style={{ color: "white", fontSize: 16 }}>About</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </Pressable>
            <Pressable onPress={handleSignOut} style={styles.signOutButton}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Sign Out
              </Text>
            </Pressable>
            <Pressable
              style={styles.deleteAccountButton}
              onPress={handleDeleteAccount}
            >
              <Text
                style={{ color: "#C70202", fontWeight: "bold", fontSize: 16 }}
              >
                Delete Account
              </Text>
            </Pressable>
            <Text
              style={{
                color: "#a0a0a0",
                fontSize: 16,
                marginTop: 20,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Wellness Version Beta 1.0.0
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

  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
    backgroundColor: "#0b0b0b",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
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

  signOutButton: {
    width: "65%",
    backgroundColor: "#840505",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
  },

  deleteAccountButton: {
    width: "65%",
    backgroundColor: "#fff",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
  },
});
