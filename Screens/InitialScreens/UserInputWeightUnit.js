import React, { useState, useContext } from "react";
import { StyleSheet, View, Alert, Text, Pressable } from "react-native";
import TopNavigationBar from "../../components/TopNavigationBar";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputWeightUnit({ navigation }) {
  const { setWeightUnit, setWeight } = useContext(InitialScreensContext);

  const [selectKg, setSelectKg] = useState(true);
  const [selectLb, setSelectLb] = useState(false);

  const handleSelectKg = () => {
    setSelectKg(true);
    setSelectLb(false);
  };

  const handleSelectLb = () => {
    setSelectKg(false);
    setSelectLb(true);
  };

  const handleContinue = () => {
    if (!selectKg && !selectLb) {
      Alert.alert("Please select a weight unit");
      return;
    }
    if (selectKg) {
      setWeightUnit("kg");
      setWeight("70");
    } else {
      setWeightUnit("lb");
      setWeight("154");
    }
    navigation.navigate("About you (Weight)");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        back={true}
        steps={12}
        currentStep={4}
      />
      <Text style={styles.title}>Select your preferred weight unit</Text>
      <Pressable
        style={selectKg ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={handleSelectKg}
      >
        <Text style={styles.label}>Kilograms (kg)</Text>
      </Pressable>
      <Pressable
        style={selectLb ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={handleSelectLb}
      >
        <Text style={styles.label}>Pounds (lb)</Text>
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
