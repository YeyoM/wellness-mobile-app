import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import TopNavigationBar from "../../components/TopNavigationBar";
import alert from "../../components/Alert";

import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputGender({ navigation }) {
  const { setGender } = useContext(InitialScreensContext);

  const [selectMale, setSelectMale] = useState(false);
  const [selectFemale, setSelectFemale] = useState(false);

  const pressSelectMale = () => {
    setSelectMale(true);
    setSelectFemale(false);
  };

  const pressSelectFemale = () => {
    setSelectMale(false);
    setSelectFemale(true);
  };

  const handleContinue = () => {
    if (!selectMale && !selectFemale) {
      alert("Please select at least one option");
      return;
    }

    if (selectMale) {
      setGender("Male");
    } else if (selectFemale) {
      setGender("Female");
    }

    navigation.navigate("About you (Age)");
  };

  const handleSkip = () => {
    setGender("Other");
    navigation.navigate("About you (Age)");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={2}
        back={true}
      />
      <Text style={styles.title}>What is your gender?</Text>
      <Pressable
        style={selectMale ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectMale}
      >
        <Ionicons
          name="man-outline"
          size={25}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.label}>Male</Text>
      </Pressable>
      <Pressable
        style={
          selectFemale ? styles.checkboxSelected : styles.checkboxUnselected
        }
        onPress={pressSelectFemale}
      >
        <Ionicons
          name="woman-outline"
          size={25}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.label}>Female</Text>
      </Pressable>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pressable style={styles.btnSkip} onPress={handleSkip}>
          <Text style={styles.btnTextSkip}>Prefer to skip, thanks!</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>
      </View>
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
    marginBottom: 50,
    marginTop: 70,
    textAlign: "center",
    width: "85%",
  },

  label: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
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

  btnSkip: {
    width: "85%",
    paddingVertical: 16,
    backgroundColor: "#05538B",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
  },

  btnTextSkip: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
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
    marginTop: 16,
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
