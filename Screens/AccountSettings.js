import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";

import { Ionicons } from "@expo/vector-icons";

import SuccessNotification from "../components/SuccessNotification";
import ErrorNotification from "../components/ErrorNotification";
import PrimaryNotification from "../components/PrimaryNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ navigation }) {
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

  return (
    <View style={styles.container}>
      {success && <SuccessNotification message={success} />}
      {error && <ErrorNotification message={error} />}
      {loading && <PrimaryNotification message={loading} />}
      <Pressable
        onPress={() => navigation.navigate((routeName = "User Information"))}
        style={styles.buttonLarge}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="person-circle-outline" size={30} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>My Profile</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.button}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>Notifications</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.button}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="lock-closed-outline" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>Privacy</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.button}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="barbell-outline" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>
            Workout Preferences
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate((routeName = "User Goals"))}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ribbon-outline" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>My Goals</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.button}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="help-buoy-outline" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 12 }}>Help & Support</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </Pressable>
      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 20,
  },

  buttonLarge: {
    width: "85%",
    backgroundColor: "#24262B",
    borderRadius: 90,
    alignItems: "center",
    marginBottom: 24,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "75%",
    backgroundColor: "#24262B",
    borderRadius: 90,
    alignItems: "center",
    marginBottom: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  signOutButton: {
    width: "65%",
    backgroundColor: "#0496FF",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
  },
});
