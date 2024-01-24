import { StyleSheet, Text, Dimensions, Pressable, Image } from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";

import { useSharedValue } from "react-native-reanimated";
import { Slider, HapticModeEnum } from "react-native-awesome-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputFitnessLevel({ navigation }) {
  const { fitnessLevel, setFitnessLevel } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);

  const progress = useSharedValue(1);
  const min = useSharedValue(0);
  const max = useSharedValue(3);

  const handleContinue = () => {
    if (fitnessLevel === "") {
      setError("Please select a fitness level");
    } else {
      navigation.navigate("About you (Physical Limitations)");
    }
  };

  const handleSetFitnessLevel = (level) => {
    if (level === 0) {
      setFitnessLevel("Beginner");
    } else if (level === 1) {
      setFitnessLevel("Intermediate");
    } else if (level === 2) {
      setFitnessLevel("Advanced");
    } else if (level === 3) {
      setFitnessLevel("Expert");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={7}
        back={true}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>How would you rate your fitness level?</Text>
      <Image
        source={require("../../assets/fitness_level.png")}
        style={{
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").width * 0.8,
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 80,
        }}
      >
        {fitnessLevel}
      </Text>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        step={3}
        onHapticFeedback={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onSlidingComplete={(e) => {
          handleSetFitnessLevel(e);
        }}
        thumbWidth={70}
        hapticMode={HapticModeEnum.STEP}
        theme={{
          disableMinTrackTintColor: "#157AFF",
          maximumTrackTintColor: "#fff",
          minimumTrackTintColor: "#157AFF",
          cacheTrackTintColor: "#fff",
          bubbleBackgroundColor: "#157AFF",
        }}
        style={{
          width: "75%",
          height: 60,
          position: "absolute",
          bottom: 160,
        }}
        markStyle={{
          width: 4,
          height: 24,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
        renderBubble={(props) => {
          return;
        }}
        renderThumb={(props) => {
          return (
            <Image
              source={require("../../assets/thumb.png")}
              style={{ width: 70, height: 70 }}
            />
          );
        }}
        sliderHeight={10}
      />
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
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    textAlign: "center",
    width: "85%",
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
