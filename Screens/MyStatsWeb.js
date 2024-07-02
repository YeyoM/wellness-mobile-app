import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
// import { SelectList } from "react-native-dropdown-select-list";
// import CarouselRepsMaxes from "../components/CarouselRepsMaxes";

import getStatsData from "../AsyncStorageFunctions/getStatsData.js";

import getUserWeightProgressDataForWebGraph from "../Utils/graphsDataFunctions/WeightData/getUserWeightProgressDataForWebGraph.js";
import getUserCaloriesProgressDataForGraph from "../Utils/graphsDataFunctions/CaloriesData/getUserCaloriesProgressDataForGraph.js";
import getUserTimeSpentProgressDataForGraph from "../Utils/graphsDataFunctions/TimeData/getUserTimeSpentProgressDataForGraph.js";
import getUserWeightLiftedProgressDataForGraph from "../Utils/graphsDataFunctions/WeightLiftedData/getUserWeightLiftedProgressDataForGraph.js";

import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory";

import { AppContext } from "../context/AppContext.js";

export default function MyStatsWeb({ navigation }) {
  const { exercises } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("Calories");

  const [weightLineData, setWeightLineData] = useState([]);
  const [weightLineDataByWeek, setWeightLineDataByWeek] = useState([]);
  const [weightLineDataByMonth, setWeightLineDataByMonth] = useState([]);

  const [caloriesLineData, setCaloriesLineData] = useState([]);
  const [caloriesLineDataByWeek, setCaloriesLineDataByWeek] = useState([]);
  const [caloriesLineDataByMonth, setCaloriesLineDataByMonth] = useState([]);

  const [timeLineData, setTimeLineData] = useState([]);
  const [timeLineDataByWeek, setTimeLineDataByWeek] = useState([]);
  const [timeLineDataByMonth, setTimeLineDataByMonth] = useState([]);

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [totalWeightLifted, setTotalWeightLifted] = useState(0);

  const [weightLiftedLineData, setWeightLiftedLineData] = useState([]);
  const [weightLiftedLineDataByWeek, setWeightLiftedLineDataByWeek] = useState(
    [],
  );
  const [weightLiftedLineDataByMonth, setWeightLiftedLineDataByMonth] =
    useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedCategory("Calories");

    setLoading(true);
    getStatsData()
      .then((stats) => {
        const weightRecord = stats.weightRecord;
        const {
          weightProgressData,
          weightProgressDataByWeekForWebGraph,
          weightProgressDataByMonthForWebGraph,
          currentWeight,
        } = getUserWeightProgressDataForWebGraph({
          weightRecord,
        });
        console.log(weightProgressData);
        setWeightLineData(weightProgressData);
        setWeightLineDataByWeek(weightProgressDataByWeekForWebGraph);
        setWeightLineDataByMonth(weightProgressDataByMonthForWebGraph);
        setCurrentWeight(currentWeight);
        const {
          caloriesProgressData,
          totalCalories,
          caloriesProgressDataByWeek,
          caloriesProgressDataByMonth,
        } = getUserCaloriesProgressDataForGraph({
          caloriesRecord: stats.caloriesRecord,
        });
        setTotalCalories(totalCalories);
        setCaloriesLineData(caloriesProgressData);
        setCaloriesLineDataByWeek(caloriesProgressDataByWeek);
        setCaloriesLineDataByMonth(caloriesProgressDataByMonth);
        const {
          timeProgressData,
          totalTime,
          timeProgressDataByWeek,
          timeProgressDataByMonth,
        } = getUserTimeSpentProgressDataForGraph({
          timeRecord: stats.totalTimeRecord,
        });
        setTotalTimeSpent(totalTime);
        setTimeLineData(timeProgressData);
        setTimeLineDataByWeek(timeProgressDataByWeek);
        setTimeLineDataByMonth(timeProgressDataByMonth);
        const {
          weightLiftedProgressData,
          totalWeightLifted,
          weightLiftedProgressDataByWeek,
          weightLiftedProgressDataByMonth,
        } = getUserWeightLiftedProgressDataForGraph({
          weightLiftedRecord: stats.weightLiftedRecord,
        });
        setWeightLiftedLineData(weightLiftedProgressData);
        setWeightLiftedLineDataByWeek(weightLiftedProgressDataByWeek);
        setWeightLiftedLineDataByMonth(weightLiftedProgressDataByMonth);
        setTotalWeightLifted(totalWeightLifted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onPressDetailedView = () => {
    navigation.navigate("Progress Graphs", {
      weightLineData,
      weightLineDataByWeek,
      weightLineDataByMonth,
      caloriesLineData,
      caloriesLineDataByWeek,
      caloriesLineDataByMonth,
      timeLineData,
      timeLineDataByWeek,
      timeLineDataByMonth,
      weightLiftedLineData,
      weightLiftedLineDataByWeek,
      weightLiftedLineDataByMonth,
      currentWeight,
      totalCalories,
      totalTimeSpent,
      totalWeightLifted,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 22,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            My Stats
          </Text>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 50,
              marginBottom: -100,
              height: 150,
              zIndex: 999,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: -10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  marginTop: 10,
                }}
              >
                Progress Graphs
              </Text>
              <Pressable onPress={() => onPressDetailedView()}>
                <Text
                  style={{
                    color: "#a0a0a0",
                    fontSize: 14,
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                  }}
                >
                  Detailed view
                </Text>
              </Pressable>
            </View>
          </View>
          {loading ? (
            <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
              Loading...
            </Text>
          ) : (
            <VictoryChart
              minDomain={{ y: 40 }}
              maxDomain={{ y: 90 }}
              scale={{ x: "time" }}
            >
              {/* y axis */}
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "transparent", fill: "transparent" },
                  ticks: { stroke: "transparent", fill: "transparent" },
                  grid: { stroke: "#a0a0a0" },
                  tickLabels: { fill: "#fff" },
                }}
              />
              {/* x axis */}
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent", fill: "transparent" },
                  ticks: { stroke: "transparent", fill: "transparent" },
                  grid: { stroke: "transparent" },
                  tickLabels: { fill: "#fff" },
                }}
              />
              <VictoryLine
                data={weightLineData}
                interpolation="natural"
                style={{
                  data: { stroke: "#157AFF" },
                  labels: { fill: "#157AFF" },
                }}
              />
            </VictoryChart>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 36,
    width: 36,
    zIndex: 999,
    backgroundColor: "#24262B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  graphContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#24262B",
    display: "flex",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  graphHeader: {
    width: "100%",
    backgroundColor: "#24262B",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 40,
  },

  pickerContainer: {
    width: "50%",
    backgroundColor: "#157AFF",
    borderWidth: 0,
    borderRadius: 10,
  },

  totals: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  totalsCategory: {
    color: "#a0a0a0",
    fontSize: 18,
  },

  repMaxesHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  textHeader: {
    color: "white",
    fontSize: 22,
  },

  textSubHeader: {
    color: "#a0a0a0",
    fontSize: 14,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },

  weightInfo: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  info: {
    color: "#a0a0a0",
    fontSize: 12,
    fontStyle: "italic",
    marginLeft: 5,
  },
});
