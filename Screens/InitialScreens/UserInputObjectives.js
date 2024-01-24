import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";
import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputObjectives({ navigation }) {
  const { setObjectives } = useContext(InitialScreensContext);

  const [selectHealtyLifestyle, setSelectHealthyLifestyle] = useState(false);
  const [looseWeight, setLooseWeight] = useState(false);
  const [gainMuscle, setGainMuscle] = useState(false);
  const [gainEndurance, setGainEndurance] = useState(false);
  const [justTrying, setJustTrying] = useState(false);

  const [error, setError] = useState(false);

  const handleHealthierLifestyle = () => {
    setSelectHealthyLifestyle(!selectHealtyLifestyle);
    setLooseWeight(false);
    setGainMuscle(false);
    setGainEndurance(false);
    setJustTrying(false);
  };

  const handleLooseWeight = () => {
    setSelectHealthyLifestyle(false);
    setLooseWeight(!looseWeight);
    setGainMuscle(false);
    setGainEndurance(false);
    setJustTrying(false);
  };

  const handleGainMuscle = () => {
    setSelectHealthyLifestyle(false);
    setLooseWeight(false);
    setGainMuscle(!gainMuscle);
    setGainEndurance(false);
    setJustTrying(false);
  };

  const handleGainEndurance = () => {
    setSelectHealthyLifestyle(false);
    setLooseWeight(false);
    setGainMuscle(false);
    setGainEndurance(!gainEndurance);
    setJustTrying(false);
  };

  const handleJustTrying = () => {
    setSelectHealthyLifestyle(false);
    setLooseWeight(false);
    setGainMuscle(false);
    setGainEndurance(false);
    setJustTrying(!justTrying);
  };

  const handleContinue = () => {
    if (
      !selectHealtyLifestyle &&
      !looseWeight &&
      !gainMuscle &&
      !gainEndurance &&
      !justTrying
    ) {
      setError("Please select at least one objective");
    } else {
      if (selectHealtyLifestyle) {
        setObjectives(["Healthy Lifestyle"]);
      }
      if (looseWeight) {
        setObjectives(["Loose Weight"]);
      }
      if (gainMuscle) {
        setObjectives(["Gain Muscle"]);
      }
      if (gainEndurance) {
        setObjectives(["Gain Endurance"]);
      }
      if (justTrying) {
        setObjectives([]);
      }
      navigation.navigate("About you (Diet Preference)");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={8}
        back={true}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>What’s your fitness goal/target?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={
            looseWeight ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleLooseWeight()}
        >
          <Ionicons
            name="flame-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>I want to lose weight</Text>
        </Pressable>
        <Pressable
          style={
            selectHealtyLifestyle
              ? styles.checkboxSelected
              : styles.checkboxUnselected
          }
          onPress={() => handleHealthierLifestyle()}
        >
          <Ionicons
            name="walk-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>I want a healthier lifestyle</Text>
        </Pressable>
        <Pressable
          style={
            gainMuscle ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleGainMuscle()}
        >
          <Ionicons
            name="barbell-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>I want to gain muscle</Text>
        </Pressable>
        <Pressable
          style={
            gainEndurance ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleGainEndurance()}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>I want to gain endurance</Text>
        </Pressable>
        <Pressable
          style={
            justTrying ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleJustTrying()}
        >
          <Ionicons
            name="happy-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Just trying out the app! </Text>
        </Pressable>
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
    marginBottom: 30,
    textAlign: "center",
    width: "85%",
  },

  objectives: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },

  label: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },

  checkboxSelected: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#157AFF",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#0F2F66",
  },

  checkboxUnselected: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#24262B",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#24262B",
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
