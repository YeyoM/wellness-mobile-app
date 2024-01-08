import React, { useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Pressable
} from "react-native";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

import { Ionicons } from "@expo/vector-icons";

const NUM_ITEMS = 4;

export default function EditingRoutineExerciseList() {
  const renderItem = useCallback(({ item }) => {
    return (
      <SwipeableItem
        key={item.key}
        item={item}
        renderUnderlayLeft={() => <UnderlayLeft />}
        snapPointsLeft={[150]}
      >
        <View
          style={[
            styles.row,
            { height: 100 },
          ]}
        >
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#4A4A4B", padding: 14, borderRadius: 20 }}>
              <Ionicons name="barbell-outline" size={40} color="white" />
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 16 }}>
                Bench Press
              </Text>
              <Text style={{ color: "#9095A1", fontSize: 12, marginLeft: 16 }}>
                4 sets of 10 reps
              </Text>
            </View>
          </View>
          <Pressable style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 6 }}>
            <Ionicons name="play-circle-outline" size={36} color="white" />
            <Text style={{ color: "#9095A1", fontSize: 10 }}>
              Tutorial
            </Text>
          </Pressable>
        </View>
      </SwipeableItem>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={initialData}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const UnderlayLeft = () => {
  const { close } = useSwipeableItemParams();
  return (
    <View style={[styles.row_, styles.underlayLeft]}>
      <TouchableOpacity onPress={() => close()} style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FF0431", padding: 20, borderRadius: 20, width: "20%", marginRight: "2%" }}>
        <Ionicons name="trash-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => close()} style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#316ADA", padding: 20, borderRadius: 20, width: "20%" }}>
        <Ionicons name="create-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    text: `${index}`,
    key: `key-${backgroundColor}`,
  };
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    backgroundColor: "#313231",
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  row_: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
  },

  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 32,
  },

  underlayLeft: {
    flex: 1,
  },
});