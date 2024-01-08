import React, { useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

const NUM_ITEMS = 10;

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
            { backgroundColor: item.backgroundColor, height: 100 },
          ]}
        >
          <Text style={styles.text}>{`${item.text}`}</Text>
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
      />
    </View>
  );
}

const UnderlayLeft = () => {
  const { close } = useSwipeableItemParams();
  return (
    <View style={[styles.row, styles.underlayLeft]}>
      <TouchableOpacity onPress={() => close()}>
        <Text style={styles.text}>CLOSE</Text>
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
    backgroundColor,
  };
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});