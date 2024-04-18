import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import RenderProgressGraphs from "../components/RenderProgressGraphs";

export default function ProgressGraphs({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = React.useState("Calories");
  const [selectedPeriod, setSelectedPeriod] = React.useState("Day");

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

  const [weightLiftedLineData, setWeightLiftedLineData] = React.useState([]);
  const [weightLiftedLineDataByWeek, setWeightLiftedLineDataByWeek] =
    React.useState([]);
  const [weightLiftedLineDataByMonth, setWeightLiftedLineDataByMonth] =
    React.useState([]);

  const [totalCalories, setTotalCalories] = React.useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = React.useState(0);
  const [currentWeight, setCurrentWeight] = React.useState(0);
  const [totalWeightLifted, setTotalWeightLifted] = React.useState(0);

  React.useEffect(() => {
    if (route.params) {
      if (route.params.weightLineData) {
        setWeightLineData(route.params.weightLineData);
      }
      if (route.params.weightLineDataByWeek) {
        setWeightLineDataByWeek(route.params.weightLineDataByWeek);
      }
      if (route.params.weightLineDataByMonth) {
        setWeightLineDataByMonth(route.params.weightLineDataByMonth);
      }
      if (route.params.caloriesLineData) {
        setCaloriesLineData(route.params.caloriesLineData);
      }
      if (route.params.caloriesLineDataByWeek) {
        setCaloriesLineDataByWeek(route.params.caloriesLineDataByWeek);
      }
      if (route.params.caloriesLineDataByMonth) {
        setCaloriesLineDataByMonth(route.params.caloriesLineDataByMonth);
      }
      if (route.params.timeLineData) {
        setTimeLineData(route.params.timeLineData);
      }
      if (route.params.timeLineDataByWeek) {
        setTimeLineDataByWeek(route.params.timeLineDataByWeek);
      }
      if (route.params.timeLineDataByMonth) {
        setTimeLineDataByMonth(route.params.timeLineDataByMonth);
      }
      if (route.params.weightLiftedLineData) {
        setWeightLiftedLineData(route.params.weightLiftedLineData);
      }
      if (route.params.weightLiftedLineDataByWeek) {
        setWeightLiftedLineDataByWeek(route.params.weightLiftedLineDataByWeek);
      }
      if (route.params.weightLiftedLineDataByMonth) {
        setWeightLiftedLineDataByMonth(
          route.params.weightLiftedLineDataByMonth,
        );
      }
      if (route.params.totalCalories) {
        setTotalCalories(route.params.totalCalories);
      }
      if (route.params.totalTimeSpent) {
        setTotalTimeSpent(route.params.totalTimeSpent);
      }
      if (route.params.currentWeight) {
        setCurrentWeight(route.params.currentWeight);
      }
      if (route.params.totalWeightLifted) {
        setTotalWeightLifted(route.params.totalWeightLifted);
      }
    }
  }, [route.params]);

  const handleSelectCalories = () => {
    setSelectedCategory("Calories");
  };

  const handleSelectTime = () => {
    setSelectedCategory("Time");
  };

  const handleSelectWeight = () => {
    setSelectedCategory("Weight");
  };

  const handleSelectWeightLifted = () => {
    setSelectedCategory("Weight Lifted");
  };

  const handleSelectDay = () => {
    setSelectedPeriod("Day");
  };

  const handleSelectWeek = () => {
    setSelectedPeriod("Week");
  };

  const handleSelectMonth = () => {
    setSelectedPeriod("Month");
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
              fontSize: 28,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Progress Graphs
          </Text>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.pillPicker}>
              <Pressable
                style={
                  selectedPeriod === "Day"
                    ? styles.optionSelected
                    : styles.optionUnselected
                }
                onPress={handleSelectDay}
              >
                <Text style={styles.day}>Day</Text>
              </Pressable>
              <Pressable
                style={
                  selectedPeriod === "Week"
                    ? styles.optionSelected
                    : styles.optionUnselected
                }
                onPress={handleSelectWeek}
              >
                <Text style={styles.day}>Week</Text>
              </Pressable>
              <Pressable
                style={
                  selectedPeriod === "Month"
                    ? styles.optionSelected
                    : styles.optionUnselected
                }
                onPress={handleSelectMonth}
              >
                <Text style={styles.day}>Month</Text>
              </Pressable>
            </View>
            <View style={styles.infoHeader}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 13, color: "#a0a0a0" }}
                >
                  {selectedCategory === "Calories"
                    ? "Total Calories"
                    : selectedCategory === "Time"
                      ? "Total Time"
                      : selectedCategory === "Weight"
                        ? "Current Weight"
                        : "Total Weight Lifted"}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  {selectedCategory === "Calories"
                    ? `${totalCalories}Kcal`
                    : selectedCategory === "Time"
                      ? totalTimeSpent
                      : selectedCategory === "Weight"
                        ? `${currentWeight}kg`
                        : `${totalWeightLifted}kg`}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 13, color: "#a0a0a0" }}
                >
                  {selectedCategory === "Calories"
                    ? "Average Calories"
                    : selectedCategory === "Time"
                      ? "Average Time"
                      : ""}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  {selectedCategory === "Calories"
                    ? ""
                    : selectedCategory === "Time"
                      ? ""
                      : ""}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <RenderProgressGraphs
              category={selectedCategory}
              selectedPeriod={selectedPeriod}
              weightLineData={weightLineData}
              weightLineDataByWeek={weightLineDataByWeek}
              weightLineDataByMonth={weightLineDataByMonth}
              caloriesLineData={caloriesLineData}
              caloriesLineDataByWeek={caloriesLineDataByWeek}
              caloriesLineDataByMonth={caloriesLineDataByMonth}
              timeLineData={timeLineData}
              timeLineDataByWeek={timeLineDataByWeek}
              timeLineDataByMonth={timeLineDataByMonth}
              weightLiftedLineData={weightLiftedLineData}
              weightLiftedLineDataByWeek={weightLiftedLineDataByWeek}
              weightLiftedLineDataByMonth={weightLiftedLineDataByMonth}
            />
          </View>
          <View style={styles.info}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color="#a0a0a0"
            />
            <Text style={styles.infoText}>
              Swipe left or right on the graph to see more data
            </Text>
          </View>
          <View style={styles.info}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color="#a0a0a0"
            />
            <Text style={styles.infoText}>
              Tap and hold on each point to see more details
            </Text>
          </View>
          <View style={styles.categories}>
            <Pressable
              style={
                selectedCategory === "Calories"
                  ? styles.categorySelected
                  : styles.categoryUnselected
              }
              onPress={handleSelectCalories}
            >
              <Ionicons name="flame-outline" size={36} color="white" />
              <Text
                style={{ color: "white", marginTop: 5, fontWeight: "bold" }}
              >
                Calories
              </Text>
            </Pressable>
            <Pressable
              style={
                selectedCategory === "Time"
                  ? styles.categorySelected
                  : styles.categoryUnselected
              }
              onPress={handleSelectTime}
            >
              <Ionicons name="time-outline" size={36} color="white" />
              <Text
                style={{ color: "white", marginTop: 5, fontWeight: "bold" }}
              >
                Time
              </Text>
            </Pressable>
            <Pressable
              style={
                selectedCategory === "Weight Lifted"
                  ? styles.categorySelected
                  : styles.categoryUnselected
              }
              onPress={handleSelectWeightLifted}
            >
              <Ionicons name="barbell-outline" size={36} color="white" />
              <Text
                style={{
                  color: "white",
                  marginTop: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Weight Lifted
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 20,
              marginBottom: 40,
              width: "95%",
            }}
          >
            <Pressable
              style={
                selectedCategory === "Weight"
                  ? styles.categorySelected
                  : styles.categoryUnselected
              }
              onPress={handleSelectWeight}
            >
              <Ionicons name="person-outline" size={36} color="white" />
              <Text
                style={{
                  color: "white",
                  marginTop: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                User Weight
              </Text>
            </Pressable>
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

  pillPicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    backgroundColor: "#24262B",
    borderRadius: 20,
    marginVertical: 30,
  },

  optionUnselected: {
    backgroundColor: "#24262B",
    paddingVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  optionSelected: {
    backgroundColor: "#157AFF",
    paddingVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  day: {
    color: "white",
    fontSize: 12,
  },

  infoHeader: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  graphContainer: {
    width: Dimensions.get("window").width,
    marginTop: 20,
    backgroundColor: "#0B0B0B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    borderRadius: 20,
  },

  info: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    color: "#a0a0a0",
    fontSize: 12,
    marginLeft: 5,
  },

  categories: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 30,
  },

  categorySelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#157AFF",
    width: 80,
    height: 110,
    borderRadius: 20,
  },

  categoryUnselected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#24262B",
    width: 80,
    height: 110,
    borderRadius: 20,
  },
});
