import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function SharedRoutine({ navigation, route }) {
  const { routineId } = route.params;

  console.log(routineId);

  return (
    <View style={styles.container}>
      <Text>Shared Routine</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
