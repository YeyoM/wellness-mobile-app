import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Loading2() {
  return (
    <View style={styles.container}>
      <Image sytle={styles.quote} source={require("../../assets/quote.png")} />
      <Image
        style={styles.logo}
        source={require("../../assets/loading_2.png")}
      />
      <Text style={styles.contentText}>
        “Excellence is not a singular act but a habit. You are what you do
        repeatedly”
      </Text>
      <Text style={styles.contentText}>- Shaquille O'Neal</Text>
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

  quote: {
    width: 60,
    height: 60,
  },

  logo: {
    marginTop: 20,
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
  },
});
