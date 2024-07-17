import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

import getStatsData from "../AsyncStorageFunctions/getStatsData.js";

import getUserWeightProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/WeightData/getUserWeightProgressDataForWebGraph.js";
import getUserCaloriesProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/CaloriesData/getUserCaloriesProgressDataForWebGraph.js";
import getUserTimeSpentProgressDataForGraph from "../Utils/graphsDataFunctions/web/TimeData/getUserTimeSpentProgressDataForWebGraph.js";
import getUserWeightLiftedProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/WeightLiftedData/getUserWeightLiftedProgressDataForWebGraph.js";

import RenderTimeAllTimeGraph from "../components/RenderGraphs/Web/Time/RenderTimeAllTimeGraph.js";
import RenderCaloriesAllTimeGraph from "../components/RenderGraphs/Web/Calories/RenderCaloriesAllTimeGraph.js";
import RenderUserWeightAllTimeGraph from "../components/RenderGraphs/Web/UserWeight/RenderUserWeightAllTimeGraph.js";
import RenderWeightLiftedAllTimeGraph from "../components/RenderGraphs/Web/WeightLifted/RenderWeightLiftedAllTimeGraph.js";

import { AppContext } from "../context/AppContext.js";

export default function MyStatsWeb({ navigation }) {
  const { exercises } = useContext(AppContext);

  const data = [
    { key: "1", value: "Calories" },
    { key: "2", value: "Weight Lifted" },
    { key: "3", value: "Time" },
    { key: "4", value: "User Weight" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Calories");

  const [weightLineData, setWeightLineData] = useState([]);
  const [weightLineDataByWeek, setWeightLineDataByWeek] = useState([]);
  const [weightLineDataByMonth, setWeightLineDataByMonth] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const [minWeight, setMinWeight] = useState(0);

  const [caloriesLineData, setCaloriesLineData] = useState([]);
  const [caloriesLineDataByWeek, setCaloriesLineDataByWeek] = useState([]);
  const [caloriesLineDataByMonth, setCaloriesLineDataByMonth] = useState([]);
  const [maxCaloriesDaily, setMaxCaloriesDaily] = useState(0);
  const [maxCaloriesWeekly, setMaxCaloriesWeekly] = useState(0);
  const [maxCaloriesMonthly, setMaxCaloriesMonthly] = useState(0);

  const [timeLineData, setTimeLineData] = useState([]);
  const [timeLineDataByWeek, setTimeLineDataByWeek] = useState([]);
  const [timeLineDataByMonth, setTimeLineDataByMonth] = useState([]);
  const [maxTimeDaily, setMaxTimeSpentDaily] = useState(0);
  const [maxTimeWeekly, setMaxTimeSpentWeekly] = useState(0);
  const [maxTimeMonthly, setMaxTimeSpentMonthly] = useState(0);

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
  const [maxWeightLiftedDaily, setMaxWeightLiftedDaily] = useState(0);
  const [maxWeightLiftedWeekly, setMaxWeightLiftedWeekly] = useState(0);
  const [maxWeightLiftedMonthly, setMaxWeightLiftedMonthly] = useState(0);
  const [minWeightLifted, setMinWeightLifted] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStatsData()
      .then((stats) => {
        const weightRecord = stats.weightRecord;
        const {
          weightProgressData,
          weightProgressDataByWeekForWebGraph,
          weightProgressDataByMonthForWebGraph,
          currentWeight,
          maxWeight,
          minWeight,
        } = getUserWeightProgressDataForWebGraph({
          weightRecord,
        });
        setWeightLineData(weightProgressData);
        setWeightLineDataByWeek(weightProgressDataByWeekForWebGraph);
        setWeightLineDataByMonth(weightProgressDataByMonthForWebGraph);
        setCurrentWeight(currentWeight);
        setMaxWeight(maxWeight);
        setMinWeight(minWeight);
        const {
          caloriesProgressData,
          caloriesProgressDataByWeek,
          caloriesProgressDataByMonth,
          totalCalories,
          maxCaloriesDaily,
          maxCaloriesWeekly,
          maxCaloriesMonthly,
        } = getUserCaloriesProgressDataForWebGraph({
          caloriesRecord: stats.caloriesRecord,
        });
        setCaloriesLineData(caloriesProgressData);
        setCaloriesLineDataByWeek(caloriesProgressDataByWeek);
        setCaloriesLineDataByMonth(caloriesProgressDataByMonth);
        setTotalCalories(totalCalories);
        setMaxCaloriesDaily(maxCaloriesDaily);
        setMaxCaloriesWeekly(maxCaloriesWeekly);
        setMaxCaloriesMonthly(maxCaloriesMonthly);
        const {
          timeProgressData,
          timeProgressDataByWeek,
          timeProgressDataByMonth,
          totalTime,
          maxTimeSpentDaily,
          maxTimeSpentWeekly,
          maxTimeSpentMonthly,
        } = getUserTimeSpentProgressDataForGraph({
          timeRecord: stats.totalTimeRecord,
        });
        setTimeLineData(timeProgressData);
        setTimeLineDataByWeek(timeProgressDataByWeek);
        setTimeLineDataByMonth(timeProgressDataByMonth);
        setTotalTimeSpent(totalTime);
        setMaxTimeSpentDaily(maxTimeSpentDaily);
        setMaxTimeSpentWeekly(maxTimeSpentWeekly);
        setMaxTimeSpentMonthly(maxTimeSpentMonthly);
        const {
          weightLiftedProgressData,
          weightLiftedProgressDataByWeek,
          weightLiftedProgressDataByMonth,
          totalWeightLifted,
          maxWeightLiftedDaily,
          maxWeightLiftedWeekly,
          maxWeightLiftedMonthly,
        } = getUserWeightLiftedProgressDataForWebGraph({
          weightLiftedRecord: stats.weightLiftedRecord,
        });
        setWeightLiftedLineData(weightLiftedProgressData);
        setWeightLiftedLineDataByWeek(weightLiftedProgressDataByWeek);
        setWeightLiftedLineDataByMonth(weightLiftedProgressDataByMonth);
        setTotalWeightLifted(totalWeightLifted);
        setMaxWeightLiftedDaily(maxWeightLiftedDaily);
        setMaxWeightLiftedWeekly(maxWeightLiftedWeekly);
        setMaxWeightLiftedMonthly(maxWeightLiftedMonthly);
        setMinWeightLifted(0);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  const onPressDetailedView = () => {
    navigation.navigate("Progress Graphs", {
      weightLineData,
      weightLineDataByWeek,
      weightLineDataByMonth,
      maxWeight,
      currentWeight,
      caloriesLineData,
      caloriesLineDataByWeek,
      caloriesLineDataByMonth,
      totalCalories,
      maxCaloriesDaily,
      maxCaloriesWeekly,
      maxCaloriesMonthly,
      timeLineData,
      timeLineDataByWeek,
      timeLineDataByMonth,
      totalTimeSpent,
      maxTimeDaily,
      maxTimeWeekly,
      maxTimeMonthly,
      weightLiftedLineData,
      weightLiftedLineDataByWeek,
      weightLiftedLineDataByMonth,
      totalWeightLifted,
      maxWeightLiftedDaily,
      maxWeightLiftedWeekly,
      maxWeightLiftedMonthly,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", marginTop: Constants.statusBarHeight }}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <Text style={styles.headerText}>My Stats</Text>
        </View>
        <View style={styles.secondHeader}>
          <View style={styles.left}>
            <Text style={styles.progressGraphsText}>Progress Graphs</Text>
            <Pressable onPress={() => onPressDetailedView()}>
              <Text style={styles.detailedViewText}>Detailed view</Text>
            </Pressable>
          </View>
          <View style={styles.right}>
            <SelectList
              data={data}
              save="value"
              search={false}
              defaultOption={{ key: "0", value: "Select" }}
              setSelected={(value) => setSelectedCategory(value)}
              onSelected={(value) => setSelectedCategory(value)}
              boxStyles={{
                backgroundColor: "#157AFF",
                color: "white",
                borderWidth: 0,
                borderRadius: 20,
                width: 120,
              }}
              dropdownStyles={{
                backgroundColor: "#157AFF",
                borderWidth: 0,
                color: "white",
                borderRadius: 20,
              }}
              dropdownItemStyles={{
                backgroundColor: "#157AFF",
                color: "white",
              }}
              dropdownTextStyles={{
                color: "white",
              }}
            />
          </View>
        </View>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
            Loading...
          </Text>
        ) : (
          <View style={{ marginBottom: 100 }}>
            {selectedCategory === "Calories" ? (
              <RenderCaloriesAllTimeGraph
                caloriesLineData={caloriesLineData}
                minCalories={0}
                maxCalories={maxCaloriesDaily}
              />
            ) : selectedCategory === "Time" ? (
              <RenderTimeAllTimeGraph
                timeLineData={timeLineData}
                minTime={0}
                maxTime={maxTimeDaily}
              />
            ) : selectedCategory === "User Weight" ? (
              <RenderUserWeightAllTimeGraph
                weightLineData={weightLineData}
                minWeight={minWeight}
                maxWeight={maxWeight}
              />
            ) : selectedCategory === "Weight Lifted" ? (
              <RenderWeightLiftedAllTimeGraph
                weightLiftedLineData={weightLiftedLineData}
                minWeight={0}
                maxWeight={maxWeightLiftedDaily}
              />
            ) : null}
          </View>
        )}
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

  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  secondHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
    padding: 20,
  },

  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    overflow: "hidden",
  },

  progressGraphsText: {
    color: "white",
    fontSize: 26,
    fontWeight: "normal",
  },

  detailedViewText: {
    color: "#a0a0a0",
    fontSize: 12,
    fontWeight: "thin",
    fontStyle: "italic",
    textDeorationLine: "underline",
  },

  graphContainer: {
    width: "auto",
    marginTop: 20,
    backgroundColor: "#0b0b0b",
    display: "flex",
    alignItems: "center",
    padding: 0,
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
    overflow: "hidden",
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
