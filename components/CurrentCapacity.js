import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CurrentCapacity({ percentage, capacity, timestamp }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              padding: 10,
              justifyContent: "flex-start",
            }}
          >
            <Ionicons
              name="people-outline"
              size={60}
              color="#fff"
              style={{ marginVertical: 10 }}
            />
            <Text
              style={{ color: "#a0a0a0", fontSize: 12, textAlign: "center" }}
            >
              Approximate {capacity} people in the gym
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Current Capacity at{" "}
            {timestamp
              ? `${timestamp.getHours()}:${timestamp.getMinutes()}`
              : "N/A"}
          </Text>
          <Text
            style={{
              color: "#a0a0a0",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            The gym is currently at {Math.round(percentage * 100)}% capacity
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0b0b",
    borderRadius: 14,
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
  },

  viewContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  buttonEnable: {
    width: "30%",
    backgroundColor: "#0496FF",
    height: 36,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

