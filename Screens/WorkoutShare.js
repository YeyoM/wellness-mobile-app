import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";
import readableTimeToMinutes from "../Utils/readableTimeToMinutes.js";

export default function WorkoutShare({ route, navigation }) {
  const { day, totalCalories, totalWeight, totalTime } = route.params;

  const [progressCalories, setProgressCalories] = useState(0);
  const [progressWeight, setProgressWeight] = useState(0);
  const [progressTime, setProgressTime] = useState(0);

  useEffect(() => {
    const realTime = readableTimeToMinutes(totalTime);
    // for the progressTime, if the time is more than 60 minutes, then the progress will be 100%
    // else, the progress will be the percentage of the time spent
    if (realTime >= 60) {
      setProgressTime(100);
    } else {
      setProgressTime((realTime / 60) * 100);
    }

    setProgressCalories((totalCalories / 300) * 100);
    setProgressWeight((totalWeight / 300) * 100);
  }, []);

  const props = {
    activeStrokeWidth: 20,
    inActiveStrokeWidth: 20,
    inActiveStrokeOpacity: 0.2,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summary}>
        <View
          style={{
            position: "absolute",
            top: Constants.statusBarHeight - 10,
            left: 0,
          }}
        >
          <Ionicons
            name="close"
            size={30}
            color="#fff"
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            marginTop: Constants.statusBarHeight + 20,
            marginBottom: 40,
            fontWeight: "bold",
          }}
        >
          Share today's workout
        </Text>
        <CircularProgressBase
          {...props}
          value={progressCalories}
          radius={125}
          activeStrokeColor={"#FF4242"}
          inActiveStrokeColor={"#FF4242"}
        >
          <CircularProgressBase
            {...props}
            value={progressWeight}
            radius={100}
            activeStrokeColor={"#E05A0F"}
            inActiveStrokeColor={"#E05A0F"}
          >
            <CircularProgressBase
              {...props}
              value={progressTime}
              radius={75}
              activeStrokeColor={"#0496FF"}
              inActiveStrokeColor={"#0496FF"}
            />
          </CircularProgressBase>
        </CircularProgressBase>
        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: 160,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FF4242",
              width: "30%",
              height: "100%",
              borderRadius: 20,
            }}
          >
            <Ionicons name="flame-outline" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {totalCalories}
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Calories
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E05A0F",
              width: "30%",
              height: "100%",
              borderRadius: 20,
            }}
          >
            <Ionicons name="barbell" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {totalWeight}
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Kg
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0496FF",
              width: "30%",
              height: "100%",
              borderRadius: 20,
            }}
          >
            <Ionicons name="time-outline" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {totalTime}
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Minutes
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: "#157AFF",
            width: "80%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderRadius: 20,
            marginVertical: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, marginRight: 8 }}>
            Share
          </Text>
          <Ionicons name="share-outline" size={24} color="white" />
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
