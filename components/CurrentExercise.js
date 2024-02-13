import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CurrentExercise({
  exercise,
  reps,
  sets,
  weight,
  image,
  navigation,
}) {
  console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 180,
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRightColor: "#a0a0a0",
            }}
          >
            <Text style={styles.reps}>Reps</Text>
            <Text style={styles.reps}>{reps}</Text>
          </View>
          <View
            style={{
              width: 1,
              height: 30,
              backgroundColor: "#a0a0a0",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRightColor: "#a0a0a0",
            }}
          >
            <Text style={styles.sets}>Sets</Text>
            <Text style={styles.sets}>{sets}</Text>
          </View>
          <View
            style={{
              width: 1,
              height: 30,
              backgroundColor: "#a0a0a0",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRightColor: "#a0a0a0",
            }}
          >
            <Text style={styles.weight}>Weight</Text>
            <Text style={styles.weight}>{weight}kg</Text>
          </View>
          <View
            style={{
              width: 1,
              height: 30,
              backgroundColor: "#a0a0a0",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.rest}>Rest</Text>
            <Text style={styles.rest}>30s</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
            <Ionicons name="play-circle-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "#a0a0a0", fontSize: 12, marginTop: 0 }}>
            Tutorial
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262B",
    width: "95%",
    height: 280,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },

  exerciseText: {
    color: "white",
    fontSize: 24,
    marginVertical: 10,
  },

  exerciseText_: {
    color: "white",
    fontSize: 18,
    marginVertical: 5,
  },

  top: {
    width: "100%",
    height: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 14,
  },

  bottom: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  left: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  right: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  reps: {
    color: "#a0a0a0",
    fontSize: 12,
  },

  sets: {
    color: "#a0a0a0",
    fontSize: 12,
  },

  weight: {
    color: "#a0a0a0",
    fontSize: 12,
  },

  rest: {
    color: "#a0a0a0",
    fontSize: 12,
  },
});
