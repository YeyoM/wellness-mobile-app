import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { Slider, HapticModeEnum } from "react-native-awesome-slider";
import * as Haptics from "expo-haptics";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputInitialWeight({ navigation }) {
  const { setInitialWeight } = useContext(InitialScreensContext);

  const [error, setError] = useState(false);
  const [weight, setWeight] = useState("");

  const [preferredSystem, setPreferredSystem] = useState("metric");

  const handleContinue = () => {
    if (weight === "") {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError("Por favor ingresa tu peso");
      return;
    }

    setInitialWeight(weight);

    navigation.navigate("Acerca de ti (Peso ideal)");
  };

  const progress_weight = useSharedValue(120);
  const min_weight = useSharedValue(40);
  const max_weight = useSharedValue(400);

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
          paddingHorizontal: 30,
          backgroundColor: "#24262B",
          borderRadius: 14,
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
          <Text style={{ color: "#fff", fontSize: 18 }}>kg</Text>
        </Pressable>
        <Pressable
          style={
            preferredSystem === "imperial" ? styles.selected : styles.unselected
          }
          onPress={() => {
            setPreferredSystem("imperial");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>lb</Text>
        </Pressable>
      </View>
      <View style={styles.weightContainer}>
        <Text style={styles.weight}>{weight}</Text>
        <Text style={styles.weight_}>
          {preferredSystem === "metric" ? "kg" : "lb"}
        </Text>
      </View>
      <View style={{ height: 80, width: "100%", alignItems: "center" }}>
        <Slider
          progress={progress_weight}
          minimumValue={min_weight}
          maximumValue={max_weight}
          step={10}
          style={{
            width: "75%",
            height: 60,
            margin: 0,
          }}
          onHapticFeedback={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onSlidingComplete={(e) => {
            setWeight(e.toFixed(0));
          }}
          thumbWidth={60}
          hapticMode={HapticModeEnum.STEP}
          theme={{
            disableMinTrackTintColor: "#157AFF",
            maximumTrackTintColor: "#fff",
            minimumTrackTintColor: "#157AFF",
            cacheTrackTintColor: "#fff",
            bubbleBackgroundColor: "#157AFF",
          }}
          markStyle={{
            width: 1,
            height: 10,
            backgroundColor: "#fff",
          }}
          renderBubble={(props) => {
            return;
          }}
          // render the current progress inside the thumb
          renderThumb={(props) => {
            return (
              <Image
                source={require("../../assets/thumb.png")}
                style={{ width: 60, height: 60 }}
              />
            );
          }}
        />
      </View>
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
    fontSize: 80,
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
    color: "#f0f0f0",
    marginBottom: 12,
    marginLeft: 5,
  },

  selected: {
    width: "45%",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#157AFF",
  },

  unselected: {
    width: "45%",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
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
