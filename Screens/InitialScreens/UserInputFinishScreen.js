import {
  Alert,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";
export default function UserInputFinishScreen({ navigation }) {
  const { printState, registerInitialQuestionsFunction } = useContext(
    InitialScreensContext,
  );

  const [selectSeeIt, setSelectSeeIt] = useState(false);
  const [selectLater, setSelectLater] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSeeIt = () => {
    setSelectSeeIt(!selectSeeIt);
    setSelectLater(false);
  };

  const handleLater = () => {
    setSelectSeeIt(false);
    setSelectLater(!selectLater);
  };

  const handleContinue = async () => {
    if (!selectSeeIt && !selectLater) {
      Alert.alert("Please select an option");
      return;
    }
    printState();
    await registerInitialQuestionsFunction(setLoading, setError);
    if (error) {
      Alert.alert(error);
      return;
    }
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={"All done!"} />
      {loading && <ActivityIndicator size="large" color="#fff" />}
      <Text style={styles.title}>Your AI workout plan is ready!</Text>
      <View style={styles.objectives}>
        <Pressable
          style={
            selectSeeIt ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={handleSeeIt}
        >
          <Ionicons
            name="happy-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Awesome, let's see it</Text>
        </Pressable>
        <Pressable
          style={
            selectLater ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={handleLater}
        >
          <Ionicons
            name="time-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>I'll look at it later</Text>
        </Pressable>
      </View>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue and save</Text>
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
