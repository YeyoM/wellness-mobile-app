import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import { interpolate, Extrapolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputAge({ navigation }) {
  const { age, setAge } = useContext(InitialScreensContext);

  const handleContinue = () => {
    if (age === "") {
      Alert.alert("Please enter your age");
      return;
    }
    navigation.navigate("About you (Weight Unit)");
  };

  const ref = React.useRef(null);

  // possible values: 16 - 80
  const data = [...new Array(65).keys()].map((i) => i + 16);
  const scale = 0.9;

  const RIGHT_OFFSET = Dimensions.get("window").width * (1 - scale) * 0.5;

  const ITEM_WIDTH = Dimensions.get("window").width * 0.5;
  const ITEM_HEIGHT = 130;

  const PAGE_HEIGHT = Dimensions.get("window").height * 0.48;
  const PAGE_WIDTH = Dimensions.get("window").width;

  const animationStyle = React.useCallback(
    (value) => {
      "worklet";
      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
      );
      const scale = interpolate(
        value,
        [-1, 0, 1],
        [1, 1.25, 1],
        Extrapolate.CLAMP,
      );
      const opacity = interpolate(
        value,
        [-1, 0, 1],
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{ translateY }, { scale }],
        opacity,
      };
    },
    [RIGHT_OFFSET, ITEM_HEIGHT],
  );

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={3}
        back={true}
      />
      <Text style={styles.title}>What is your age?</Text>
      <View
        style={{
          height: PAGE_HEIGHT,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Carousel
          loop
          vertical
          style={{
            justifyContent: "center",
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            marginBottom: 20,
            alignItems: "center",
            alignSelf: "center",
          }}
          ref={ref}
          onSnapToItem={(index) => {
            setAge(data[index]);
          }}
          width={ITEM_WIDTH}
          pagingEnabled={false}
          height={ITEM_HEIGHT}
          data={data}
          defaultIndex={5}
          renderItem={({ index }) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: "#157AFF",
                  borderRadius: 24,
                  width: ITEM_WIDTH,
                  marginVertical: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#0496FF",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    maxWidth: "100%",
                    color: "white",
                    fontSize: 60,
                    fontWeight: "bold",
                  }}
                >
                  {data[index]}
                </Text>
              </View>
            );
          }}
          customAnimation={animationStyle}
        />
      </View>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    marginBottom: 40,
    marginTop: 80,
    textAlign: "center",
    width: "85%",
  },

  input: {
    width: "60%",
    height: 64,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 22,
    fontSize: 22,
    fontWeight: "normal",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderTopColor: "#0B0B0B",
    borderRightColor: "#0B0B0B",
    borderLeftColor: "#0B0B0B",
    color: "#fff",
    backgroundColor: "#0B0B0B",
    marginBottom: 60,
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
