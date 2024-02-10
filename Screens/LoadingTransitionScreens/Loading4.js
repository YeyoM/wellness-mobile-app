import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Loading4() {
  return (
    <View style={styles.container}>
      <Image sytle={styles.quote} source={require("../../assets/quote.png")} />
      <Image
        style={styles.logo}
        source={require("../../assets/loading_4.png")}
      />
      <Text style={styles.contentText}>
        “No man has the right to be an amateur in the matter of physical
        training.”
      </Text>
      <Text style={styles.contentText}>- Socrates</Text>
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
