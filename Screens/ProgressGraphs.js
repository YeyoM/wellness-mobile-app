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

const customLabel = (label) => {
  return (
    <View style={{ width: 30, marginLeft: 10 }}>
      <Text style={{ color: "white", fontSize: 10 }}>{label}</Text>
    </View>
  );
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
    { value: 20, labelComponent: () => customLabel("1/9") },
    { value: 10, labelComponent: () => customLabel("1/10") },
    { value: 2, labelComponent: () => customLabel("1/11") },
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
              isAnimated
              width={Dimensions.get("window").width * 0.8}
              animationDuration={1200}
              initialSpacing={20}
              data={lineData}
              /*spacing={
                (Dimensions.get("window").width * 0.8) / (lineData.length + 2)
              } */
              spacing={40}
              yAxisThickness={0}
              xAxisThickness={0}
              rulesColor="#0B0B0B"
              rulesType="solid"
              xAxisColor="#50535B"
              color="#157AFF"
              dataPointsColor="#157AFF"
              pointerConfig={{
                pointerStripUptoDataPoint: false,
                pointerVanishDelay: 600000,
                pointerStripColor: "#0496FF",
                pointerStripWidth: 2,
                pointerStripHeight: 160,
                strokeDashArray: [2, 5],
                pointerColor: "#0496FF",
                radius: 5,
                pointerLabelWidth: 100,
                pointerLabelHeight: 40,
                activatePointersOnLongPress: true,
                pointerLabelComponent: (items) => {
                  return (
                    <View
                      style={{
                        height: 40,
                        width: 50,
                        backgroundColor: "#0496FF",
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 9,
                        }}
                      >
                        1 / 1
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 11,
                        }}
                      >
                        {items[0].value} Kcal
                      </Text>
                    </View>
                  );
                },
              }}
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
            <View style={styles.categorySelected}>
              <Ionicons name="flame-outline" size={36} color="white" />
              <Text
                style={{ color: "white", marginTop: 5, fontWeight: "bold" }}
              >
                Calories
              </Text>
            </View>
            <View style={styles.categoryUnselected}>
              <Ionicons name="time-outline" size={36} color="white" />
              <Text
                style={{ color: "white", marginTop: 5, fontWeight: "bold" }}
              >
                Time
              </Text>
            </View>
            <View style={styles.categoryUnselected}>
              <Ionicons name="person-outline" size={36} color="white" />
              <Text
                style={{ color: "white", marginTop: 5, fontWeight: "bold" }}
              >
                Weight
              </Text>
            </View>
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
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },

  categorySelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#157AFF",
    width: 80,
    height: 98,
    borderRadius: 20,
  },

  categoryUnselected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#24262B",
    width: 80,
    height: 98,
    borderRadius: 20,
  },
});
