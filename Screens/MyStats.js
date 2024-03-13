import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { SelectList } from "react-native-dropdown-select-list";
import CarouselRepsMaxes from "../components/CarouselRepsMaxes";
import getExercisesStorage from "../AsyncStorageFunctions/Exercises/getExercisesStorage.js";
import getStatsData from "../AsyncStorageFunctions/getStatsData.js";

import getUserWeightProgressDataForGraph from "../Utils/graphsDataFunctions/getUserWeightProgressDataForGraph.js";
import getUserCaloriesProgressDataForGraph from "../Utils/graphsDataFunctions/getUserCaloriesProgressDataForGraph.js";

const customLabel = (val) => {
  return (
    <View style={{ width: 20, marginLeft: 10 }}>
      <Text style={{ color: "#a0a0a0", fontSize: 10 }}>{val}</Text>
    </View>
  );
};

export default function MyStats({ navigation }) {
  const lineData = [
    { value: 20, labelComponent: () => customLabel("1/1") },
    { value: 10, labelComponent: () => customLabel("1/2") },
    { value: 2, labelComponent: () => customLabel("1/3") },
    { value: 40, labelComponent: () => customLabel("1/4") },
    { value: 36, labelComponent: () => customLabel("1/5") },
    { value: 40, labelComponent: () => customLabel("1/6") },
    { value: 54, labelComponent: () => customLabel("1/7") },
    { value: 0, labelComponent: () => customLabel("1/8") },
  ];

  const data = [
    { key: "1", value: "Calories" },
    { key: "2", value: "Weight" },
    { key: "3", value: "Time" },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("Calories");
  const [exercises, setExercises] = React.useState([]);
  const [weightLineData, setWeightLineData] = React.useState([]);

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
    setLoading(true);
    getStatsData()
      .then((stats) => {
        const weightRecord = stats.weightRecord;
        const weightProgressData = getUserWeightProgressDataForGraph({
          weightRecord,
        });
        setWeightLineData(weightProgressData);
        const caloriesProgressData = getUserCaloriesProgressDataForGraph({
          caloriesRecord: stats.caloriesRecord,
        });
        console.log("Calories record", stats.caloriesRecord);
        console.log(caloriesProgressData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onPressDetailedView = () => {
    console.log("Pressed");
    navigation.navigate("Progress Graphs");
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
              setSelected={setSelectedCategory}
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
            {!loading &&
            weightLineData.length > 0 &&
            selectedCategory === "Weight" ? (
              <LineChart
                hideDataPoints
                isAnimated
                animationDuration={1200}
                initialSpacing={20}
                data={weightLineData}
                spacing={40}
                thickness={3}
                yAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                yAxisThickness={0}
                rulesColor="#50535B"
                rulesType="solid"
                xAxisColor="#50535B"
                color="#157AFF"
              />
            ) : !loading && selectedCategory === "Calories" ? (
              <LineChart
                hideDataPoints
                isAnimated
                animationDuration={1200}
                initialSpacing={20}
                data={lineData}
                spacing={40}
                thickness={3}
                yAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                yAxisThickness={0}
                rulesColor="#50535B"
                rulesType="solid"
                xAxisColor="#50535B"
                color="#157AFF"
              />
            ) : !loading && selectedCategory === "Time" ? (
              <LineChart
                hideDataPoints
                isAnimated
                animationDuration={1200}
                initialSpacing={20}
                data={lineData}
                spacing={40}
                thickness={3}
                yAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
                yAxisThickness={0}
                rulesColor="#50535B"
                rulesType="solid"
                xAxisColor="#50535B"
                color="#157AFF"
              />
            ) : loading ? (
              <ActivityIndicator size="large" color="#157AFF" />
            ) : (
              <Text style={{ color: "white" }}>No data available</Text>
            )}
            {selectedCategory === "Calories" ? (
              <View>
                <Text style={styles.totals}>2000</Text>
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
            ) : selectedCategory === "Time" ? null : null}
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
    paddingRight: 0,
    paddingLeft: 5,
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
    paddingHorizontal: 20,
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
