import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import PreviewWorkout from "./PreviewWorkout";
import getAllDays from "../FirebaseFunctions/Days/getAllDays";
import getDaysStorage from "../AsyncStorageFunctions/Days/getDaysStorage.js";
import saveDaysStorage from "../AsyncStorageFunctions/Days/saveDaysStorage.js";
import getFavoriteRoutine from "../AsyncStorageFunctions/Routines/getFavoriteRoutine.js";

import { AppContext } from "../context/AppContext.js";

export default function MyPlan({ navigation, refresh, setRefresh }) {
  const { user } = useContext(AppContext);

  const [days, setDays] = useState([]);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userWeight, _setUserWeight] = useState(user.weight);
  const [userWeightUnit, _setUserWeightUnit] = useState(user.weightUnit);
  const [userGender, _setUserGender] = useState(user.gender);
  const [favoriteRoutine, setFavoriteRoutine] = useState(null);

  useEffect(() => {
    // Check in the async storage if the user has saved days
    // If the user has saved days, set them in the state
    // If the user doesn't have saved days, fetch them from the API
    // and save them in the async storage
    setError(false);
    setRefreshing(true);
    getDaysStorage().then((days) => {
      if (days) {
        console.log(days);
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
  }, []);

  useEffect(() => {
    getFavoriteRoutine()
      .then((routine) => {
        console.log(routine);
        setFavoriteRoutine(routine);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, setRefresh, days, setDays]);

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

  useEffect(() => {
    onRefresh();
    setRefresh(false);
  }, [refresh]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: 20 }}
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
            {refreshing ? "Refreshing..." : "Pull down to refresh"}
          </Text>
          {refreshing ? null : (
            <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
              What muscle group are we training today?
            </Text>
          )}
          <View
            style={{ flexDirection: "column", marginTop: 20, width: "95%" }}
          >
            {days && days.length > 0 && !refreshing ? (
              // if there is a fav routine, just display the days in which
              // day.routineId === favoriteRoutine.id, else display all days
              favoriteRoutine ? (
                days.map((day, index) => {
                  if (day.routineId === favoriteRoutine.id) {
                    return (
                      <PreviewWorkout
                        key={index}
                        navigation={navigation}
                        day={day}
                        userWeight={userWeight}
                        userWeightUnit={userWeightUnit}
                        userGender={userGender}
                      />
                    );
                  }
                })
              ) : (
                days.map((day, index) => (
                  <PreviewWorkout
                    key={index}
                    navigation={navigation}
                    day={day}
                    userWeight={userWeight}
                    userWeightUnit={userWeightUnit}
                    userGender={userGender}
                  />
                ))
              )
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
