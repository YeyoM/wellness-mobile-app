import React from "react";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useState, useContext } from "react";

import TopNavigationBar from "../../components/TopNavigationBar";
import { CreateRoutineContext } from "../../context/CreateRoutineContext";

import { FIREBASE_AUTH } from "../../firebaseConfig";
import createRoutine from "../../FirebaseFunctions/Routines/createRoutine.js";

import SuccessNotification from "../../components/SuccessNotification";

export default function SelectNumberDaysPerWeek({ navigation }) {
  const {
    numberOfDays,
    setNumberOfDays,
    userId,
    setUserId,
    routineName,
    generatedAI,
    days,
    image,
  } = useContext(CreateRoutineContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContinue = async () => {
    setLoading(true);

    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setUserId(user.uid);
    }

    if (!user) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }

    // create the routine object
    const routine = {
      routineName: routineName,
      userId: userId,
      image: image,
      generatedAI: generatedAI,
      numberOfDays: numberOfDays,
      days: days,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await createRoutine(userId, routine);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Error", "Something went wrong, please try again later.");
      navigation.navigate("Home");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Routine Creator"}
        back={!loading}
      />
      {success && (
        <SuccessNotification message={"Routine created, redirecting..."} />
      )}
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
        {loading ? (
          <Pressable style={styles.btnContinue} disabled={true}>
            <ActivityIndicator size="small" color="#000" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handleContinue()}
            style={styles.btnContinue}
          >
            <Text style={styles.btnContinueText}>Continue</Text>
          </Pressable>
        )}
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
