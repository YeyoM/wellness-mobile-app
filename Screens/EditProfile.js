import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { FIREBASE_AUTH } from "../firebaseConfig";

import SaveProfileChanges from "../FirebaseFunctions/Users/SaveProfileChanges";
import { AppContext } from "../context/AppContext.js";

export default function EditProfile({ route, navigation }) {
  const {
    name,
    bio,
    weight,
    height,
    showHeightAndWeight,
    weightUnit,
    heightUnit,
    privateProfile,
    weightRecord,
  } = route.params;

  const { refreshUser } = React.useContext(AppContext);

  const [name_, setName] = React.useState(name);
  const [bio_, setBio] = React.useState(bio);
  const [weight_, setWeight] = React.useState(weight);
  const [height_, setHeight] = React.useState(height);
  const [weightUnit_, setWeightUnit] = React.useState(weightUnit);
  const [heightUnit_, setHeightUnit] = React.useState(heightUnit);
  const [weightRecord_, setWeightRecord] = React.useState(weightRecord);

  const [setSwitch, setSetSwitch] = React.useState(showHeightAndWeight);
  const [setSwitch2, setSetSwitch2] = React.useState(privateProfile);

  const [loading, setLoading] = useState(false);

  const handleSwitch = () => {
    setSetSwitch(!setSwitch);
  };

  const handleSwitch2 = () => {
    setSetSwitch2(!setSwitch2);
  };

  const handleDone = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      return;
    }

    setLoading(true);
    try {
      await SaveProfileChanges({
        name: name_,
        bio: bio_,
        weight: weight_,
        height: height_,
        showHeightAndWeight: setSwitch,
        weightUnit: weightUnit_,
        heightUnit: heightUnit_,
        privateProfile: setSwitch2,
        weightRecord: weightRecord_,
        userId: user.uid,
      });
      await refreshUser();
      navigation.navigate("Profile");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
        Edit Profile
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
                Name
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>{name_}</Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("Update Name", {
                    name: name_,
                    setName: setName,
                  })
                }
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Bio
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {bio_ ? (
                  bio_.length > 20 ? (
                    bio_.substring(0, 20) + "..."
                  ) : (
                    bio_
                  )
                ) : (
                  <Text style={{ color: "rgba(147, 146, 154, 0.8)" }}>
                    Add a bio
                  </Text>
                )}
              </Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
                onPress={() => {
                  navigation.navigate("Update Bio", {
                    bio: bio_,
                    setBio: setBio,
                  });
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Weight
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {weight_} {weightUnit_}
              </Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
                onPress={() => {
                  navigation.navigate("Update Weight Unit", {
                    weight: weight_,
                    weightUnit: weightUnit_,
                    setWeight: setWeight,
                    setWeightUnit: setWeightUnit,
                  });
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {height_} {heightUnit_}
              </Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
                onPress={() => {
                  navigation.navigate("Update Height Unit", {
                    height: height_,
                    heightUnit: heightUnit_,
                    setHeight: setHeight,
                    setHeightUnit: setHeightUnit,
                  });
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Show Weight
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                and Height
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleSwitch}
                  value={setSwitch}
                />
              </View>
            </View>
            <View style={styles.groupBottom}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Private
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Profile
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleSwitch2}
                  value={setSwitch2}
                />
              </View>
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
