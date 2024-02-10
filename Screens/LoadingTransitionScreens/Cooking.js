import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Cooking() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/cooking.png")} />
      <Text style={styles.contentText}>
        This feature is not available yet but we’re cooking something special
        for the next update!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 260,
    height: 260,
  },

  contentText: {
    color: "#9095A1",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
