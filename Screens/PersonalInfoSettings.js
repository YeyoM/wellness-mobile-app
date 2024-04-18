import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { FIREBASE_AUTH } from "../firebaseConfig";
import SavePersonalInfoChanges from "../FirebaseFunctions/Users/SavePersonalInfoChanges";
import { AppContext } from "../context/AppContext.js";

export default function PersonalInfoSettings({ route, navigation }) {
  const { refreshUser } = React.useContext(AppContext);

  const { gym, age, gender } = route.params;

  const [email, setEmail] = useState("");
  const [gym_, setGym_] = useState(gym);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      navigation.navigate("Login");
      return;
    }

    setEmail(user.email);
  }, []);

  const handleDone = async () => {
    setLoading(true);
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        navigation.navigate("Login");
        return;
      }
      await SavePersonalInfoChanges({ uid: user.uid, gym: gym_ });
      setLoading(false);
      await refreshUser();
      navigation.navigate("Profile");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <View style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </Pressable>
        </View>
      )}
      {!loading && (
        <View style={styles.doneButton}>
          <Pressable onPress={() => handleDone()}>
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
      )}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0496FF"
          style={{
            position: "absolute",
            top: Constants.statusBarHeight + 20,
            left: 0,
            right: 0,
          }}
        />
      )}
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Personal Information
      </Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - 200,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          paddingTop: 40,
        }}
      >
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Email
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {email ? email : "no email"}
              </Text>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Age
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {age} years old
              </Text>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Gender
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>{gender}</Text>
            </View>
            <View style={styles.groupBottom}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                My Gym
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {gym_ ? gym_ : "no gym"}
              </Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("User Update", {
                    screen: "Update Gym",
                    params: { gym: gym_, setGym: setGym_ },
                  })
                }
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
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

  content: {
    flex: 1,
  },

  card: {
    backgroundColor: "#1E1F25",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  group: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3B3F",
  },

  groupBottom: {
    paddingVertical: 14,
  },
});
