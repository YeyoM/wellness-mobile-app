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
import { LineChart } from "react-native-gifted-charts";

const customLabel = () => {
  return <View style={{ width: 0, marginLeft: 10 }}></View>;
};

export default function ProgressGraphs({ navigation }) {
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
              <View style={styles.optionSelected}>
                <Text style={styles.day}>Day</Text>
              </View>
              <View style={styles.optionUnselected}>
                <Text style={styles.day}>Week</Text>
              </View>
              <View style={styles.optionUnselected}>
                <Text style={styles.day}>Month</Text>
              </View>
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
                  Total calories
                </Text>
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  1256
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
                  Change in Kcal
                </Text>
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  21
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <LineChart
              hideDataPoints
              isAnimated
              animationDuration={1200}
              initialSpacing={10}
              data={lineData}
              spacing={
                (Dimensions.get("window").width * 0.8) / (lineData.length + 2)
              }
              yAxisThickness={0}
              xAxisThickness={0}
              rulesColor="#01040A"
              rulesType="solid"
              xAxisColor="#50535B"
              color="#157AFF"
            />
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
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  optionSelected: {
    backgroundColor: "#157AFF",
    paddingVertical: 5,
    borderRadius: 20,
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
    width: "100%",
    marginTop: 20,
    backgroundColor: "#01040A",
    display: "flex",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
});
