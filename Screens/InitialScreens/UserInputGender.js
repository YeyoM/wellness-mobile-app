import { StyleSheet, Alert, Text, View, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputGender({ navigation }) {
  const { setGender } = useContext(InitialScreensContext);

  const [selectHombre, setSelectHombre] = useState(false);
  const [selectMujer, setSelectMujer] = useState(false);

  const pressSelectHombre = () => {
    setSelectHombre(true);
    setSelectMujer(false);
  };

  const pressSelectMujer = () => {
    setSelectHombre(false);
    setSelectMujer(true);
  };

  const handleContinue = () => {
    if (!selectHombre && !selectMujer) {
      Alert.alert("Please select at least one option");
      return;
    }

    if (selectHombre) {
      setGender("Hombre");
    } else if (selectMujer) {
      setGender("Mujer");
    }

    navigation.navigate("About you (Age)");
  };

  const handleSkip = () => {
    setGender("Otro");
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
        style={
          selectHombre ? styles.checkboxSelected : styles.checkboxUnselected
        }
        onPress={pressSelectHombre}
      >
        <Text style={styles.label}>Male</Text>
      </Pressable>
      <Pressable
        style={
          selectMujer ? styles.checkboxSelected : styles.checkboxUnselected
        }
        onPress={pressSelectMujer}
      >
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
    justifyContent: "center",
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
    justifyContent: "center",
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
