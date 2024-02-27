import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import PreviewWorkout from "./PreviewWorkout";
import getAllDays from "../FirebaseFunctions/Days/getAllDays";
import getUserStorage from "../AsyncStorageFunctions/Users/getUserStorage";
import getDaysStorage from "../AsyncStorageFunctions/Days/getDaysStorage.js";
import saveDaysStorage from "../AsyncStorageFunctions/Days/saveDaysStorage.js";

export default function MyPlan({ navigation }) {
  const [days, setDays] = useState([]);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userWeight, setUserWeight] = useState(null);
  const [userWeightUnit, setUserWeightUnit] = useState(null);

  useEffect(() => {
    // Check in the async storage if the user has saved days
    // If the user has saved days, set them in the state
    // If the user doesn't have saved days, fetch them from the API
    // and save them in the async storage
    setError(false);
    setRefreshing(true);
    getDaysStorage().then((days) => {
      if (days) {
        setDays(days);
        setRefreshing(false);
        setError(false);
      } else {
        getAllDays()
          .then((days) => {
            setDays(days);
            saveDaysStorage(days);
            setRefreshing(false);
            setError(false);
          })
          .catch((error) => {
            console.log(error);
            setError(true);
            setRefreshing(false);
          });
      }
    });
    getUserStorage()
      .then((data) => {
        if (data) {
          console.log(data);
          console.log("Weight: ", data.weight);
          console.log("Weight unit: ", data.weightUnit);
          setUserWeight(data.weight);
          setUserWeightUnit(data.weightUnit);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("Home");
      });
  }, []);

  // user weight and weight unit from storage
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setError(false);
      const days = await getAllDays();
      setDays(days);
      saveDaysStorage(days);
      setRefreshing(false);
    } catch (error) {
      setError(true);
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.plan}>
          <Text
            style={{
              color: "#a0a0a0",
              fontSize: 13,
              textAlign: "center",
              marginTop: 20,
              fontStyle: "italic",
            }}
          >
            Scroll down to refresh{" "}
          </Text>
          <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
            What muscle group are we training today?
          </Text>
          <View
            style={{ flexDirection: "column", marginTop: 20, width: "90%" }}
          >
            {days && days.length > 0 && !refreshing ? (
              days.map((day, index) => {
                return (
                  <PreviewWorkout
                    day={day}
                    userWeight={userWeight}
                    userWeightUnit={userWeightUnit}
                    navigation={navigation}
                    key={index}
                  />
                );
              })
            ) : error ? (
              <Text style={{ color: "#fff" }}>
                Oops! Something went wrong. Please try again later.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
  },

  plan: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 16,
  },
});
