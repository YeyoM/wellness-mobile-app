import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Platform,
} from "react-native";
import { RefreshControl as WebRefreshControl } from "react-native-web-refresh-control";

import EnableLocation from "./EnableLocation";
import CurrentCapacity from "./CurrentCapacity";
import DailyCapacity from "./DailyCapacity";

import getCurrentCapacity from "../Utils/crowdmeterFunctions/getCurrentCapacity";
import getCapacityDataForGraph from "../Utils/crowdmeterFunctions/getCapacityDataForGraph";

export default function Crowdmeter() {
  const [location, setLocation] = useState(true);

  const [percentage, setPercentage] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const [capacityDataForGraph, setCapacityDataForGraph] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onRefresh = async () => {
      try {
        setRefreshing(true);
        setError(null);
        const currentCapacity = await getCurrentCapacity();
        setPercentage(currentCapacity.percentage);
        setCapacity(currentCapacity.capacity);
        setTimestamp(currentCapacity.timestamp);
        const capacityData = await getCapacityDataForGraph();
        setCapacityDataForGraph(capacityData);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
        setError("Something went wrong. Please try again later.");
        setRefreshing(false);
      }
    };

    onRefresh();
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const currentCapacity = await getCurrentCapacity();
      setPercentage(currentCapacity.percentage);
      setCapacity(currentCapacity.capacity);
      setTimestamp(currentCapacity.timestamp);
      const capacityData = await getCapacityDataForGraph();
      setCapacityDataForGraph(capacityData);
      setRefreshing(false);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          Platform.OS === "web" ? (
            <WebRefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#fff"]}
            />
          ) : (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      >
        <View style={styles.crowdmeter}>
          <Text
            style={{
              color: "#a0a0a0",
              fontSize: 13,
              textAlign: "center",
              marginTop: 40,
              fontStyle: "italic",
            }}
          >
            {refreshing ? "Refreshing..." : "Pull down to refresh"}
          </Text>
          <View style={{ flexDirection: "column", marginTop: 0, width: "90%" }}>
            {location === null ? (
              <EnableLocation />
            ) : error ? (
              <Text style={{ color: "#fff" }}>{error}</Text>
            ) : !refreshing &&
              percentage &&
              capacity &&
              timestamp &&
              capacityDataForGraph ? (
              <View>
                <CurrentCapacity
                  percentage={percentage}
                  capacity={capacity}
                  timestamp={timestamp}
                />
                <DailyCapacity capacityDataForGraph={capacityDataForGraph} />
              </View>
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
    backgroundColor: "#0b0b0b",
    alignItems: "center",
  },

  crowdmeter: {
    width: "100%",
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 16,
  },
});
