import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useState, useContext } from "react";

import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputFrequency({ navigation }) {
  const { setTrainingFrequency } = useContext(InitialScreensContext);
  const [numberOfDays, setNumberOfDays] = useState(1);

  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (numberOfDays === 0) {
      setError(true);
    } else {
      setError(false);
      setTrainingFrequency(numberOfDays + " days");
      navigation.navigate("About you (Training Duration)");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Workout Plan"}
        steps={12}
        currentStep={10}
        back={true}
      />
      {error && <ErrorNotification message={"Error creating routine"} />}
      <View style={styles.content}>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          How many days/wk will you commit?
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 140,
            marginTop: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {numberOfDays}x
        </Text>
        <View
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            backgroundColor: "#24262B",
            padding: 4,
            borderRadius: 16,
          }}
        >
          <Pressable
            onPress={() => setNumberOfDays(1)}
            style={numberOfDays === 1 ? styles.btnSelected : styles.btn}
          >
            <Text style={styles.btnText}>1</Text>
          </Pressable>
          <Pressable
            onPress={() => setNumberOfDays(2)}
            style={numberOfDays === 2 ? styles.btnSelected : styles.btn}
          >
            <Text style={styles.btnText}>2</Text>
          </Pressable>
          <Pressable
            onPress={() => setNumberOfDays(3)}
            style={numberOfDays === 3 ? styles.btnSelected : styles.btn}
          >
            <Text style={styles.btnText}>3</Text>
          </Pressable>
          <Pressable
            onPress={() => setNumberOfDays(4)}
            style={numberOfDays === 4 ? styles.btnSelected : styles.btn}
          >
            <Text style={styles.btnText}>4</Text>
          </Pressable>
          <Pressable
            onPress={() => setNumberOfDays(5)}
            style={numberOfDays === 5 ? styles.btnSelected : styles.btn}
          >
            <Text style={styles.btnText}>5</Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          I’m commited to exercising {numberOfDays}x weekly
        </Text>
        <Pressable style={styles.btnContinue} onPress={handleContinue}>
          <Text style={styles.btnContinueText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0b0b",
    flex: 1,
    alignItems: "center",
  },

  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    backgroundColor: "#24262F",
    borderColor: "#24262F",
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 16,
  },

  btnSelected: {
    backgroundColor: "#0496FF",
    borderColor: "#142749",
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,

    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 16,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  btnContinue: {
    width: "85%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },

  btnContinueText: {
    color: "#0B0B0B",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
});
