import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { SelectList } from "react-native-dropdown-select-list";
import CarouselRepsMaxes from "../components/CarouselRepsMaxes";
import getExercisesStorage from "../AsyncStorageFunctions/Exercises/getExercisesStorage.js";
import getStatsData from "../AsyncStorageFunctions/getStatsData.js";

import getUserWeightProgressDataForGraph from "../Utils/graphsDataFunctions/WeightData/getUserWeightProgressDataForGraph.js";
import getUserCaloriesProgressDataForGraph from "../Utils/graphsDataFunctions/CaloriesData/getUserCaloriesProgressDataForGraph.js";
import getUserTimeSpentProgressDataForGraph from "../Utils/graphsDataFunctions/TimeData/getUserTimeSpentProgressDataForGraph.js";

export default function MyStats({ navigation }) {
  const data = [
    { key: "1", value: "Calories" },
    { key: "2", value: "Weight" },
    { key: "3", value: "Time" },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("Calories");
  const [exercises, setExercises] = React.useState([]);

  const [weightLineData, setWeightLineData] = React.useState([]);
  const [weightLineDataByWeek, setWeightLineDataByWeek] = React.useState([]);
  const [weightLineDataByMonth, setWeightLineDataByMonth] = React.useState([]);

  const [caloriesLineData, setCaloriesLineData] = React.useState([]);
  const [caloriesLineDataByWeek, setCaloriesLineDataByWeek] = React.useState(
    [],
  );
  const [caloriesLineDataByMonth, setCaloriesLineDataByMonth] = React.useState(
    [],
  );

  const [timeLineData, setTimeLineData] = React.useState([]);
  const [timeLineDataByWeek, setTimeLineDataByWeek] = React.useState([]);
  const [timeLineDataByMonth, setTimeLineDataByMonth] = React.useState([]);

  const [totalCalories, setTotalCalories] = React.useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = React.useState(0);
  const [currentWeight, setCurrentWeight] = React.useState(0);

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getExercisesStorage()
        .then((exercises) => {
          setExercises(exercises);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setSelectedCategory("Calories");

    setLoading(true);
    getStatsData()
      .then((stats) => {
        const weightRecord = stats.weightRecord;
        const {
          weightProgressData,
          weightProgressDataByWeekForGraph,
          weightProgressDataByMonthForGraph,
          currentWeight,
        } = getUserWeightProgressDataForGraph({
          weightRecord,
        });
        setWeightLineData(weightProgressData);
        setWeightLineDataByWeek(weightProgressDataByWeekForGraph);
        setWeightLineDataByMonth(weightProgressDataByMonthForGraph);
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
      totalCalories,
      totalTimeSpent,
      currentWeight,
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
            <SelectList
              data={data}
              save="value"
              search={false}
              defaultOption={{ key: "1", value: "Calories" }}
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
          <View style={styles.graphContainer}>
            <View style={styles.graphHeader}>
              <Text style={{ color: "white", fontSize: 18 }}>
                {selectedCategory}
              </Text>
            </View>
            <View style={{ overflow: "hidden", width: "100%" }}>
              {!loading &&
              weightLineData.length > 0 &&
              selectedCategory === "Weight" ? (
                <LineChart
                  hideDataPoints
                  isAnimated
                  animationDuration={1200}
                  initialSpacing={30}
                  data={weightLineData}
                  spacing={40}
                  thickness={3}
                  yAxisTextStyle={{
                    color: "#a0a0a0",
                    fontSize: 10,
                    marginRight: 10,
                  }}
                  xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                  yAxisThickness={0}
                  rulesColor="#50535B"
                  rulesType="solid"
                  xAxisColor="#50535B"
                  color="#157AFF"
                  yAxisLabelSuffix={" kg"}
                />
              ) : !loading &&
                caloriesLineData.length > 0 &&
                selectedCategory === "Calories" ? (
                <LineChart
                  hideDataPoints
                  isAnimated
                  animationDuration={1200}
                  initialSpacing={caloriesLineData.length > 10 ? 20 : 40}
                  data={caloriesLineData}
                  spacing={caloriesLineData.length > 10 ? 40 : 60}
                  thickness={3}
                  yAxisTextStyle={{
                    color: "#a0a0a0",
                    fontSize: 10,
                    marginRight: 10,
                  }}
                  xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                  yAxisThickness={0}
                  rulesColor="#50535B"
                  rulesType="solid"
                  xAxisColor="#50535B"
                  color="#157AFF"
                  yAxisLabelSuffix=" Kcal "
                />
              ) : !loading &&
                timeLineData.length > 0 &&
                selectedCategory === "Time" ? (
                <LineChart
                  hideDataPoints
                  isAnimated
                  animationDuration={1200}
                  initialSpacing={timeLineData.length > 10 ? 20 : 40}
                  data={timeLineData}
                  spacing={timeLineData.length > 10 ? 40 : 60}
                  thickness={3}
                  yAxisTextStyle={{
                    color: "#a0a0a0",
                    fontSize: 10,
                    marginRight: 10,
                  }}
                  xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                  yAxisThickness={0}
                  rulesColor="#50535B"
                  rulesType="solid"
                  xAxisColor="#50535B"
                  color="#157AFF"
                  yAxisLabelSuffix=" min"
                />
              ) : loading ? (
                <ActivityIndicator size="large" color="#157AFF" />
              ) : (
                <Text style={{ color: "white" }}>No data available</Text>
              )}
            </View>
            {selectedCategory === "Calories" ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={styles.totals}>{totalCalories}</Text>
                <Text style={styles.totalsCategory}>Total Kcal</Text>
              </View>
            ) : selectedCategory === "Weight" ? (
              <View style={styles.weightInfo}>
                <Ionicons
                  name="information-outline"
                  size={14}
                  color="#a0a0a0"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.info}>
                  You can update your weight in the profile section
                </Text>
              </View>
            ) : selectedCategory === "Time" ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={styles.totals}>{totalTimeSpent}</Text>
                <Text style={styles.totalsCategory}>Total time spent</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.repMaxesHeader}>
            <Text style={styles.textHeader}>My one rep maxes</Text>
            <Pressable onPress={() => navigation.navigate("One Rep Max List")}>
              <Text style={styles.textSubHeader}>Edit</Text>
            </Pressable>
          </View>
          <CarouselRepsMaxes exercises={exercises} />
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
