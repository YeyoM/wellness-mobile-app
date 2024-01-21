import React, { useState, useContext } from "react";
import { StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";

import { interpolate } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Carousel from "react-native-reanimated-carousel";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputInitialWeight({ navigation }) {
  const { weight, setWeight } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);

  const [preferredSystem, setPreferredSystem] = useState("metric");

  const handleContinue = () => {
    if (weight === "") {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError("Please select your weight");
      return;
    }
    navigation.navigate("About you (Height)");
  };

  const ref = React.useRef(null);

  const data = [...new Array(65).keys()].map((i) => i + 16);

  const scale = 0.9;

  const RIGHT_OFFSET = Dimensions.get("window").width * (1 - scale) * 0.5;

  const ITEM_WIDTH = Dimensions.get("window").width * 0.35;
  const ITEM_HEIGHT = 100;

  const animationStyle = React.useCallback(
    (value) => {
      "worklet";
      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [-ITEM_WIDTH, 0, ITEM_WIDTH],
      );
      return {
        transform: [{ translateX }],
      };
    },
    [RIGHT_OFFSET],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        back={true}
        steps={12}
        currentStep={4}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>What is your weight?</Text>
      <View
        style={{
          width: "90%",
          paddingVertical: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#24262B",
          paddingHorizontal: 8,
          borderRadius: 22,
          marginVertical: 20,
        }}
      >
        <Pressable
          style={
            preferredSystem === "metric" ? styles.selected : styles.unselected
          }
          onPress={() => {
            setPreferredSystem("metric");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>kg</Text>
        </Pressable>
        <Pressable
          style={
            preferredSystem === "imperial" ? styles.selected : styles.unselected
          }
          onPress={() => {
            setPreferredSystem("imperial");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>lb</Text>
        </Pressable>
      </View>
      <View style={styles.weightContainer}>
        <Text style={styles.weight}>{weight}</Text>
        <Text style={styles.weight_}>
          {preferredSystem === "metric" ? "kg" : "lb"}
        </Text>
      </View>

      <Carousel
        loop
        vertical={false}
        style={{
          justifyContent: "center",
          width: Dimensions.get("window").width,
          height: 100,
        }}
        ref={ref}
        onSnapToItem={(index) => {
          setWeight(data[index]);
        }}
        width={ITEM_WIDTH}
        pagingEnabled={false}
        height={ITEM_HEIGHT}
        data={data}
        renderItem={({ index }) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor: "#0B0B0B",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {data[index] === weight ? null : (
                <Text
                  numberOfLines={1}
                  style={{
                    maxWidth: "100%",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: [{ translateX: -5 }],
                  }}
                >
                  {data[index]}
                </Text>
              )}
              <View
                style={{
                  width: 6,
                  height: 50,
                  backgroundColor: "#157AFF",
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#0450B4",
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 30,
                  backgroundColor: "#50535B",
                  position: "absolute",
                  left: "25%",
                  top: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#50535B",
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 30,
                  backgroundColor: "#50535B",
                  position: "absolute",
                  left: "75%",
                  top: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#50535B",
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 40,
                  backgroundColor: "#50535B",
                  position: "absolute",
                  left: "0%",
                  top: 5,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#50535B",
                }}
              />
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
      <View
        style={{
          height: 20,
          width: "100%",
          alignItems: "center",
        }}
      ></View>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: "85%",
    marginBottom: 20,
  },

  weight: {
    fontSize: 90,
    fontWeight: "bold",
    color: "white",
    margin: 0,
  },

  weightContainer: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "85%",
    marginVertical: 20,
  },

  weight_: {
    fontSize: 30,
    color: "#9EA0A5",
    marginBottom: 16,
    marginLeft: 5,
  },

  selected: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#157AFF",
  },

  unselected: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#24262B",
  },

  btn: {
    width: "85%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },

  btnText: {
    color: "#0B0B0B",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
});
