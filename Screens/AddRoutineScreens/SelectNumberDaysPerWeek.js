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
import { FIRESTORE } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  runTransaction,
  getDoc,
} from "firebase/firestore";

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

  // create routine and save it to firebase, then navigate to Edit Routine screen
  const handleContinue = async () => {
    // set loading to true
    setLoading(true);

    // get the user id from firebase
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

    // 1. save the routine to firebase with auto-generated id
    // 2. save the routine id to the user's routines array
    // 3. save the days to firebase with auto-generated ids on the days collection and save the ids to the daysIds array
    // 4. update the routine with the daysIds array

    try {
      // 1. save the routine to firebase with auto-generated id
      const routineRef = await addDoc(
        collection(FIRESTORE, "routines"),
        routine,
      );
      // console.log("routineRef");
      // console.log(routineRef);

      // Create n-day objects based on the number of days
      const days_ = [];
      for (let i = 0; i < numberOfDays; i++) {
        const day_ = {
          dayName: `Day ${i + 1}`,
          routineId: routineRef.id,
          totalDuration: "0",
          totalCalories: "0",
          totalSets: "0",
          exercises: [],
        };
        days_.push(day_);
      }

      // 2. save the routine id to the user's routines array
      const userRef = doc(FIRESTORE, "users", userId);
      await runTransaction(FIRESTORE, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw "Document does not exist!";
        }
        const routines = userDoc.data().routines;
        routines.push(routineRef.id);
        transaction.update(userRef, { routines: routines });
      });

      const daysIds = [];

      // 3. save the days to firebase with auto-generated ids on the days collection and save the ids to the daysIds array
      const daysRef = await Promise.all(
        days_.map(async (day) => {
          const dayRef = await addDoc(collection(FIRESTORE, "days"), day);
          // console.log("dayRef");
          // console.log(dayRef);
          return dayRef;
        }),
      );
      // console.log("daysRef");
      // console.log(daysRef);
      daysRef.forEach((dayRef) => {
        daysIds.push(dayRef.id);
      });

      // 4. update the routine with the daysIds array
      await setDoc(
        doc(FIRESTORE, "routines", routineRef.id),
        { days: daysIds },
        { merge: true },
      );

      // get the routine from firebase
      const routineSnap = await getDoc(
        doc(FIRESTORE, "routines", routineRef.id),
      );

      if (!routineSnap.exists()) {
        navigation.navigate("Home");
      }

      // set loading to false
      setLoading(false);
      // set success to true
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate("Edit Routine", { routine: routineSnap.data() });
      }, 1000);
      setSuccess(true);
    } catch (e) {
      console.log("Error adding document: ", e);
      setLoading(false);
      Alert.alert("Error", "There was an error creating the routine");
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
