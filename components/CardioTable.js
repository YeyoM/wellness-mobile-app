import React from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CardioTable({
  duration,
  setDuration,
  isDurationValid,
  incline,
  setIncline,
  isInclineValid,
  resistance,
  setResistance,
  isResistanceValid,
  speed,
  setSpeed,
  isSpeedValid,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Duration</Text>
        <Text style={styles.headerText}>Incline</Text>
        <Text style={styles.headerText}>Resistance</Text>
        <Text style={styles.headerText}>Speed</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <TextInput
          style={styles.rowTextInput}
          value={duration.toString()}
          textAlign={"center"}
          onChangeText={(text) => {
            setDuration(text);
          }}
          keyboardType="numeric"
          editable={isDurationValid}
        />
        <TextInput
          style={styles.rowTextInput}
          value={isInclineValid ? incline.toString() : "N/A"}
          textAlign={"center"}
          onChangeText={(text) => {
            setIncline(text);
          }}
          keyboardType="number-pad"
          editable={isInclineValid}
        />
        <TextInput
          style={styles.rowTextInput}
          value={isResistanceValid ? resistance.toString() : "N/A"}
          textAlign={"center"}
          onChangeText={(text) => {
            setResistance(text);
          }}
          keyboardType="number-pad"
          editable={isResistanceValid}
        />
        <TextInput
          style={styles.rowTextInput}
          value={isSpeedValid ? speed.toString() : "N/A"}
          textAlign={"center"}
          onChangeText={(text) => {
            setSpeed(text);
          }}
          keyboardType="number-pad"
          editable={isSpeedValid}
        />
      </View>
      <Text
        style={{
          color: "#a0a0a0",
          marginTop: 10,
          fontStyle: "italic",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        <Ionicons name="information-circle-outline" size={12} color="#a0a0a0" />
        You can modify the duration, incline, resistance, and speed of the
        exercise by tapping on the values
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "90%",
    marginBottom: 20,
  },
  divider: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "white",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
  },
  rowText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  rowTextInput: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingVertical: 1,
    width: 40,
  },
  addSetButton: {
    backgroundColor: "#24262B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
});
