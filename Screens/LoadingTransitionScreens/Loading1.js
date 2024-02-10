import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Loading1() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/loading_1.png")}
      />
      <Text style={styles.headerText}>Did you know?</Text>
      <Text style={styles.contentText}>
        The more muscle mass you have, the more fat your body burns while
        resting.
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

  headerText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },

  contentText: {
    color: "#9095A1",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
});
