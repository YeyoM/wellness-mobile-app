import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";
import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputTrainingHours({ navigation }) {
  const { setTrainingHours } = useContext(InitialScreensContext);

  const [selectEarly, setSelectEarly] = useState(false);
  const [selectNoon, setSelectNoon] = useState(false);
  const [selectAfternoon, setSelectAfterNoon] = useState(false);
  const [selectNight, setSelectNight] = useState(false);
  const [selectWhenever, setSelectWhenever] = useState(false);

  const [error, setError] = useState(false);

  const handleHealthierLifestyle = () => {
    setSelectEarly(!selectEarly);
    setSelectNoon(false);
    setSelectAfterNoon(false);
    setSelectNight(false);
    setSelectWhenever(false);
  };

  const handleLooseWeight = () => {
    setSelectEarly(false);
    setSelectNoon(!selectNoon);
    setSelectAfterNoon(false);
    setSelectNight(false);
    setSelectWhenever(false);
  };

  const handleGainMuscle = () => {
    setSelectEarly(false);
    setSelectNoon(false);
    setSelectAfterNoon(!selectAfternoon);
    setSelectNight(false);
    setSelectWhenever(false);
  };

  const handleGainEndurance = () => {
    setSelectEarly(false);
    setSelectNoon(false);
    setSelectAfterNoon(false);
    setSelectNight(!selectNight);
    setSelectWhenever(false);
  };

  const handleJustTrying = () => {
    setSelectEarly(false);
    setSelectNoon(false);
    setSelectAfterNoon(false);
    setSelectNight(false);
    setSelectWhenever(!selectWhenever);
  };

  const handleContinue = () => {
    if (
      !selectEarly &&
      !selectNoon &&
      !selectAfternoon &&
      !selectNight &&
      !selectWhenever
    ) {
      setError("Please select at least one option");
    } else {
      setError(false);
      setTrainingHours({
        selectEarly,
        selectNoon,
        selectAfternoon,
        selectNight,
        selectWhenever,
      });
      navigation.navigate("About you (Finish)");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Workout Plan"}
        steps={12}
        currentStep={12}
        back={true}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>At what time you like to workout?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={
            selectNoon ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleLooseWeight()}
        >
          <Ionicons
            name="cafe-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Early Bird</Text>
          <Text
            style={{
              position: "absolute",
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            6-10 am
          </Text>
        </Pressable>
        <Pressable
          style={
            selectEarly ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleHealthierLifestyle()}
        >
          <Ionicons
            name="sunny-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Around noon</Text>
          <Text
            style={{
              position: "absolute",
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            10 am - 2 pm
          </Text>
        </Pressable>
        <Pressable
          style={
            selectAfternoon
              ? styles.checkboxSelected
              : styles.checkboxUnselected
          }
          onPress={() => handleGainMuscle()}
        >
          <Ionicons
            name="partly-sunny-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Afternoon</Text>
          <Text
            style={{
              position: "absolute",
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            2-7 pm
          </Text>
        </Pressable>
        <Pressable
          style={
            selectNight ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleGainEndurance()}
        >
          <Ionicons
            name="moon-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Night Owl</Text>
          <Text
            style={{
              position: "absolute",
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            7-11 pm
          </Text>
        </Pressable>
        <Pressable
          style={
            selectWhenever ? styles.checkboxSelected : styles.checkboxUnselected
          }
          onPress={() => handleJustTrying()}
        >
          <Ionicons
            name="briefcase-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.label}>Whenever I can</Text>
          <Text
            style={{
              position: "absolute",
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            Anytime
          </Text>
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
