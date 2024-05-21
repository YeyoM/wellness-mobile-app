import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
} from "react-native";
import { RefreshControl as WebRefreshControl } from "react-native-web-refresh-control";

import PreviewWorkout from "./PreviewWorkout";

import { AppContext } from "../context/AppContext.js";

export default function MyPlan({ navigation }) {
  const { user, days, favoriteRoutine, refreshDays } = useContext(AppContext);

  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userWeight, _setUserWeight] = useState(user?.weight);
  const [userWeightUnit, _setUserWeightUnit] = useState(user?.weightUnit);
  const [userGender, _setUserGender] = useState(user?.gender);

  // user weight and weight unit from storage
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setError(false);
      await refreshDays();
      setRefreshing(false);
    } catch (error) {
      setError(true);
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: 0 }}
        refreshControl={
          Platform.OS === "web" ? (
            <WebRefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          ) : (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          )
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
