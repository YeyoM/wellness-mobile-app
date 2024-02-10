import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Loading3() {
  return (
    <View style={styles.container}>
      <Image sytle={styles.quote} source={require("../../assets/quote.png")} />
      <Image
        style={styles.logo}
        source={require("../../assets/loading_3.png")}
      />
      <Text style={styles.contentText}>
        “It is a shame for a man to grow old without seeing the beauty and
        strength of which his body is capable.”
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
