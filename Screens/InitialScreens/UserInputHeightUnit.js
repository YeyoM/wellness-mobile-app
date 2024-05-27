import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import TopNavigationBar from "../../components/TopNavigationBar";
import alert from "../../components/Alert";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputHeightUnit({ navigation }) {
  const { setHeightUnit, setHeight } = useContext(InitialScreensContext);

  const [selectCm, setSelectCm] = useState(true);
  const [selectIn, setSelectIn] = useState(false);

  const handleSelectCm = () => {
    setSelectCm(true);
    setSelectIn(false);
  };

  const handleSelectIn = () => {
    setSelectCm(false);
    setSelectIn(true);
  };

  const handleContinue = () => {
    if (!selectCm && !selectIn) {
      alert("Please select a height unit");
      return;
    }
    if (selectCm) {
      setHeightUnit("cm");
      setHeight("170");
    } else {
      setHeightUnit("in");
      setHeight("67");
    }
    navigation.navigate("About you (Height)");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        back={true}
        steps={12}
        currentStep={5}
      />
      <Text style={styles.title}>Select your preferred height unit</Text>
      <Pressable
        style={selectCm ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={handleSelectCm}
      >
        <Text style={styles.label}>Centimeters (cm)</Text>
      </Pressable>
      <Pressable
        style={selectIn ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={handleSelectIn}
      >
        <Text style={styles.label}>Inches (in)</Text>
      </Pressable>
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
    marginBottom: 60,
  },

  checkboxSelected: {
    width: "85%",
    paddingVertical: 20,
    backgroundColor: "#157AFF",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(4, 150, 255, 0.5)",
  },

  checkboxUnselected: {
    width: "85%",
    paddingVertical: 20,
    backgroundColor: "#1F1F1F",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },

  label: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
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
