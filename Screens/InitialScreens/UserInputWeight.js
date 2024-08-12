import React, { useState, useContext } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
} from "react-native";

import alert from "../../components/Alert";
import TopNavigationBar from "../../components/TopNavigationBar";

import { interpolate } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Carousel from "react-native-reanimated-carousel";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputWeight({ navigation }) {
  const { weight, setWeight, weightUnit } = useContext(InitialScreensContext);

  const [weight_, setWeight_] = useState(Platform.OS === "web" ? "" : weight);

  const [data] = useState(
    weightUnit === "kg"
      ? [...new Array(65).keys()].map((i) => i + 35)
      : [...new Array(140).keys()].map((i) => i + 77),
  );
  const [defaultIndex] = useState(weightUnit === "kg" ? 35 : 77);

  const handleContinue = () => {
    if (weight_ === "" || weight_ < 35 || weight_ > 1000) {
      alert("Please enter your weight");
      return;
    }
    setWeight(weight_);
    navigation.navigate("About you (Height Unit)");
  };

  const handleWeight = (value) => {
    setWeight_(value);
  };

  const ref1 = React.useRef();
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
      <Text style={styles.title}>What is your weight?</Text>
      {Platform.OS !== "web" ? (
        <View style={styles.weightContainer}>
          <Text style={styles.weight}>{weight_}</Text>
          <Text style={styles.weight_}>{weightUnit}</Text>
        </View>
      ) : null}
      {Platform.OS === "web" ? (
        <View style={styles.webInputContainer}>
          <TextInput
            style={styles.webInput}
            value={weight_}
            onChangeText={handleWeight}
            keyboardType="numeric"
            placeholderTextColor="#a0a0a0"
            placeholder="0"
          />
        </View>
      ) : (
        <Carousel
          loop
          vertical={false}
          style={{
            justifyContent: "center",
            width: Dimensions.get("window").width,
            height: 100,
          }}
          ref={ref1}
          onSnapToItem={(index) => {
            setWeight_(data[index]);
          }}
          width={ITEM_WIDTH}
          pagingEnabled={false}
          height={ITEM_HEIGHT}
          data={data}
          defaultIndex={defaultIndex}
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
                {data[index] === weight_ ? null : (
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
      )}
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

  webInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginVertical: 20,
  },

  webInput: {
    width: "100%",
    backgroundColor: "#24262B",
    color: "white",
    fontSize: 90,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
    borderRadius: 16,
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
