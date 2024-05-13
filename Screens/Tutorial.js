import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import generateImageURL from "../Utils/generateImageURL";

export default function Tutorial({ navigation, route }) {
  const [lift, setLift] = useState(null);
  const [liftName, setLiftName] = useState("");
  const [tutorial, setTutorial] = useState([]);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (route.params && route.params.lift) {
      setLift(route.params.lift.item);
      setLiftName(route.params.lift.item.name);
      setTutorial(route.params.lift.item.instructions);
      if (route.params.lift.item.images) {
        for (let i = 0; i < route.params.lift.item.images.length; i++) {
          setImages((prev) => [
            ...prev,
            generateImageURL(route.params.lift.item.images[i]),
          ]);
        }
      }
    } else {
      setError(
        "No tutorial was found for this exercise, go back and try again.",
      );
    }
  }, [route.params]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === images.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      </View>
      <View style={styles.tutorial}>
        {error ? (
          <Text style={{ color: "red", fontSize: 24, fontStyle: "italic" }}>
            {error}
          </Text>
        ) : null}
        <Text style={styles.liftName}>{liftName}</Text>
        {images && images.length > 0 && (
          <Image
            source={{ uri: images[currentImage] }}
            style={{
              width: 300,
              height: 180,
              marginBottom: 20,
              borderRadius: 10,
            }}
            cachePolicy={"fetchFromCacheOrNetwork"}
          />
        )}
        <View style={styles.instructions}>
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              marginBottom: 20,
              textAlign: "left",
              alignSelf: "flex-start",
            }}
          >
            instructions
          </Text>
          {tutorial &&
            tutorial.length > 0 &&
            tutorial.map((step, index) => (
              <Text
                key={index}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginBottom: 16,
                  width: "100%",
                  textAlign: "justify",
                }}
              >
                {index + 1}. {step}
              </Text>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    paddingTop: Constants.statusBarHeight + 10,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  tutorial: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 120,
  },

  liftName: {
    color: "#fff",
    fontSize: 32,
    marginBottom: 20,
    width: "80%",
    textAlign: "center",
  },

  instructions: {
    display: "flex",
    alignItems: "center",
    width: "90%",
  },
});
