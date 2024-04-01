import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function RoutineImageSelect({ image }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Pressable style={styles.selectButton}>
          <Text style={styles.selectText}>Select</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.viewOriginalText}>View Original</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    width: "100%",
    height: 240,
    borderRadius: 14,
    padding: 10,
  },

  image: {
    width: 300,
    height: 180,
    borderRadius: 14,
  },

  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  selectButton: {
    backgroundColor: "#157AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: "40%",
    display: "flex",
    alignItems: "center",
  },

  selectText: {
    color: "#fff",
  },

  viewOriginalText: {
    color: "#a0a0a0",
    textDecorationLine: "underline",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
});
