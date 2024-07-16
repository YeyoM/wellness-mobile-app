import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
// import { SelectList } from "react-native-dropdown-select-list";
// import CarouselRepsMaxes from "../components/CarouselRepsMaxes";

import getStatsData from "../AsyncStorageFunctions/getStatsData.js";

import getUserWeightProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/WeightData/getUserWeightProgressDataForWebGraph.js";
import getUserCaloriesProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/CaloriesData/getUserCaloriesProgressDataForWebGraph.js";
import getUserTimeSpentProgressDataForGraph from "../Utils/graphsDataFunctions/web/TimeData/getUserTimeSpentProgressDataForWebGraph.js";
import getUserWeightLiftedProgressDataForWebGraph from "../Utils/graphsDataFunctions/web/WeightLiftedData/getUserWeightLiftedProgressDataForWebGraph.js";

import RenderCaloriesAllTimeGraph from "../components/RenderGraphs/Web/Calories/RenderCaloriesAllTimeGraph.js";
import RenderCaloriesDailyGraph from "../components/RenderGraphs/Web/Calories/RenderCaloriesDailyGraph.js";
import RenderCaloriesWeeklyGraph from "../components/RenderGraphs/Web/Calories/RenderCaloriesWeeklyGraph.js";
import RenderCaloriesMonthlyGraph from "../components/RenderGraphs/Web/Calories/RenderCaloriesMonthlyGraph.js";

import { AppContext } from "../context/AppContext.js";

export default function MyStatsWeb({ navigation }) {
  const { exercises } = useContext(AppContext);

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
            paddingHorizontal: 0,
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
            <View style={{ marginBottom: 100 }}>
              <RenderCaloriesAllTimeGraph
                caloriesLineData={caloriesLineData}
                minCalories={0}
                maxCalories={maxCaloriesDaily}
              />
            </View>
          )}
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Per month
          </Text>
          {loading ? (
            <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
              Loading...
            </Text>
          ) : (
            <RenderCaloriesMonthlyGraph
              caloriesLineDataByMonth={caloriesLineDataByMonth}
              minCalories={0}
              maxCalories={maxCaloriesMonthly}
            />
          )}

          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Per week
          </Text>
          {loading ? (
            <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
              Loading...
            </Text>
          ) : (
            <RenderCaloriesWeeklyGraph
              caloriesLineDataByWeek={caloriesLineDataByWeek}
              minCalories={0}
              maxCalories={maxCaloriesWeekly}
            />
          )}

          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Per day
          </Text>
          {loading ? (
            <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
              Loading...
            </Text>
          ) : (
            <RenderCaloriesDailyGraph
              caloriesLineDataByDay={caloriesLineData}
              minCalories={0}
              maxCalories={maxCaloriesDaily}
            />
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
