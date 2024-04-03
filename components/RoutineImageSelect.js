import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function RoutineImageSelect({
  image,
  handleSelect,
  handleViewOriginal,
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image.urls.small,
        }}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Pressable style={styles.selectButton} onPress={handleSelect}>
          <Text style={styles.selectText}>Select</Text>
        </Pressable>
        <Pressable onPress={handleViewOriginal}>
          <Text style={styles.viewOriginalText}>Full view</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    width: "85%",
    height: 255,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingBottom: 5,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 40,
    alignSelf: "center",
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 14,
  },

  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 6,
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
