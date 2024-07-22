import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function AdvanceRetreatButtons({
  advanceFunction,
  retreatFunction,
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={retreatFunction}>
        <Ionicons name="chevron-back" size={28} color="#0496FF" />
      </Pressable>
      <Pressable style={styles.button} onPress={advanceFunction}>
        <Ionicons name="chevron-forward" size={28} color="#0496FF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  button: {
    padding: 10,
  },
});
