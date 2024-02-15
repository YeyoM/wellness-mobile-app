import React from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SetsTable({ currentSets, setCurrentSets }) {
  const AddSet = () => {
    let newSets = [...currentSets];
    // Add a new set with the values of the last set
    // or 0 if there are no sets yet
    newSets.push({
      reps: newSets.length > 0 ? newSets[newSets.length - 1].reps : 0,
      weight: newSets.length > 0 ? newSets[newSets.length - 1].weight : 0,
      finished: false,
    });
    setCurrentSets(newSets);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Set</Text>
        <Text style={styles.headerText}>Reps</Text>
        <Text style={styles.headerText}>Weight</Text>
        <Text style={styles.headerText}>Finished</Text>
      </View>
      <View style={styles.divider} />
      {currentSets &&
        currentSets.map((set, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.rowText}>{index + 1}</Text>
            <TextInput
              style={styles.rowTextInput}
              value={set.reps.toString()}
              textAlign={"center"}
              onChangeText={(text) => {
                let newSets = [...currentSets];
                newSets[index].reps = text;
                if (parseInt(text) < 0) {
                  newSets[index].reps = 0;
                }
                if (parseInt(text) > 100) {
                  newSets[index].reps = 100;
                }
                setCurrentSets(newSets);
              }}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.rowTextInput}
              value={set.weight.toString()}
              textAlign={"center"}
              onChangeText={(text) => {
                let newSets = [...currentSets];
                newSets[index].weight = text;
                setCurrentSets(newSets);
              }}
              keyboardType="number-pad"
            />
            <View
              style={{ flexDirection: "row", width: 60, alignItems: "center" }}
            >
              <Checkbox
                value={set.finished}
                onValueChange={() => {
                  let newSets = [...currentSets];
                  newSets[index].finished = !newSets[index].finished;
                  setCurrentSets(newSets);
                }}
              />
              {index === currentSets.length - 1 && index !== 0 ? (
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#FF4242"
                  onPress={() => {
                    let newSets = [...currentSets];
                    newSets.splice(index, 1);
                    setCurrentSets(newSets);
                  }}
                  marginLeft={20}
                />
              ) : null}
            </View>
          </View>
        ))}
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
        You can modify the number of reps and weight for each set by tapping on
        the value.
      </Text>
      <Pressable onPress={AddSet} style={styles.addSetButton}>
        <Text style={styles.rowText}>
          Add Set <Ionicons name="add" size={15} color="white" />
        </Text>
      </Pressable>
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
