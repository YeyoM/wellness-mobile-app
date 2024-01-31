import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

export default function WorkoutFinished1({ route, navigation }) {
  const { routine } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summary}>
        <Text
          style={{
            color: "#fff",
            fontSize: 32,
            marginTop: 50,
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Workout session Completed!
        </Text>
        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: "30%",
              height: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#8E2727",
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="flame-outline"
              size={40}
              color="white"
              style={{ marginTop: 20 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF4242",
                width: "100%",
                height: "60%",
                bottom: 0,
                position: "absolute",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                200
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Calories
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "30%",
              height: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#AA633B",
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="barbell"
              size={40}
              color="white"
              style={{ marginTop: 20 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E05A0F",
                width: "100%",
                height: "60%",
                bottom: 0,
                position: "absolute",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                120
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Kg
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "30%",
              height: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#144D77",
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="time-outline"
              size={40}
              color="white"
              style={{ marginTop: 20 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0496FF",
                width: "100%",
                height: "60%",
                bottom: 0,
                position: "absolute",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                1.5
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Hours
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            marginTop: 30,
            fontWeight: "bold",
          }}
        >
          New badge unlocked!
        </Text>
        <View
          style={{
            width: 120,
            height: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            backgroundColor: "#C0BC4A",
            borderRadius: 20,
          }}
        >
          <Ionicons name="trophy-outline" size={60} color="white" />
          <Text style={{ fontSize: 18, color: "#fff" }}>Level 6</Text>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Chasing the pump
        </Text>
        <Pressable
          style={{
            backgroundColor: "#157AFF",
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderRadius: 20,
            marginVertical: 40,
          }}
          onPress={() =>
            navigation.navigate("Workout Finished 2", { routine: routine })
          }
        >
          <Text style={{ color: "white", fontSize: 20 }}>Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0b0b",
    flex: 1,
  },

  summary: {
    backgroundColor: "#0b0b0b",
    width: "100%",
    minHeight: Dimensions.get("window").height,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
  },
});

