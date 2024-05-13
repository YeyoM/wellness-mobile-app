import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import generateImageURL from "../Utils/generateImageURL";

export default function CurrentExercise({
  exerciseName,
  reps,
  sets,
  weight,
  restTime,
  time,
  incline,
  resistance,
  speed,
  images,
  defaultImage,
  instructions,
  navigation,
  type,
}) {
  const [lift, setLift] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLift({
      exerciseName: exerciseName,
      reps: reps,
      sets: sets,
      weight: weight,
      restTime: restTime,
      time: time,
      incline: incline,
      resistance: resistance,
      speed: speed,
      images: images,
      instructions: instructions,
    });

    setImage(null);
  }, [
    exerciseName,
    reps,
    sets,
    weight,
    restTime,
    time,
    incline,
    resistance,
    speed,
    images,
    instructions,
  ]);

  useEffect(() => {
    if (images && images.length > 1) {
      setImage(generateImageURL(images[0]));
    } else {
      setImage(defaultImage);
    }
  }, [exerciseName]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />
        )}
      </View>
      <View style={styles.bottom}>
        {type === "lift" ? (
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
              <Text style={styles.rest}>{restTime}s</Text>
            </View>
          </View>
        ) : (
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
              <Text style={styles.reps}>Duration</Text>
              <Text style={styles.reps}>{time} min</Text>
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
              <Text style={styles.sets}>Incline</Text>
              <Text style={styles.sets}>{incline ? incline : "N/A"}</Text>
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
              <Text style={styles.rest}>Resistance</Text>
              <Text style={styles.rest}>{resistance ? resistance : "N/A"}</Text>
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
              <Text style={styles.rest}>Speed</Text>
              <Text style={styles.rest}>{speed ? speed : "N/A"}</Text>
            </View>
          </View>
        )}
        <View style={styles.right}>
          <Pressable
            onPress={() => {
              navigation.navigate("Tutorial", { lift: lift });
              console.log("Lift:", lift);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#a0a0a0"
            />
            <Text
              style={{
                color: "#a0a0a0",
                fontSize: 12,
                fontStyle: "italic",
              }}
            >
              Tutorial
            </Text>
          </Pressable>
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
