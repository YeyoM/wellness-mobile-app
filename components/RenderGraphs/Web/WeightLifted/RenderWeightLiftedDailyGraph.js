import React, { useState } from "react";
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

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryLabel,
  createContainer,
  VictoryScatter,
} from "victory";

export default function RenderWeightLiftedDailyGraph({
  weightLiftedLineDataByDay,
}) {
  const [zoomState, setZoomState] = useState({ x: [0, 2592000000] }); // this is equal to 7 days in milliseconds

  const [weightLiftedLineDataByDay, setWeightLiftedLineDataByDay] = useState(
    weightLiftedLineDataByDay || [],
  );

  const handleZoom = (domain) => {
    console.log("domain", domain);
    setZoomState({ x: domain.x, y: domain.y });
  };

  const advanceOneWeek = () => {
    const right_prevUnixTime = zoomState.x[0].getTime() / 1000;
    const right_nextUnixTime = right_prevUnixTime + 604800;
    const right_newDate = new Date(right_nextUnixTime * 1000);

    const left_prevUnixTime = zoomState.x[1].getTime() / 1000;
    const left_nextUnixTime = left_prevUnixTime + 604800;
    const left_newDate = new Date(left_nextUnixTime * 1000);

    const newDomain = {
      x: [right_newDate, left_newDate],
    };

    setZoomState({ x: newDomain.x, y: zoomState.y });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        Per week
      </Text>
      {!weightLiftedLineDataByDay.length ? (
        <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
          No data to display :(
        </Text>
      ) : (
        <View style={{ marginBottom: 100 }}>
          <View style={styles.graphContainer}>
            <VictoryChart
              minDomain={{ y: minWeight - 5 }}
              maxDomain={{ y: maxWeight + 5 }}
              scale={{ x: "time" }}
              height={Dimensions.get("window").height * 0.6}
              width={Dimensions.get("window").width}
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                  allowZoom={false}
                  zoomDomain={zoomState}
                  onZoomDomainChange={handleZoom}
                />
              }
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
                fixLabelOverlap={true}
              />
              {/* x axis */}
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent", fill: "transparent" },
                  ticks: { stroke: "transparent", fill: "transparent" },
                  grid: { stroke: "transparent" },
                  tickLabels: { fill: "#fff" },
                  labels: { fill: "#fff", fontSize: 16 },
                }}
                fixLabelOverlap={true}
              />
              <VictoryLine
                data={weightLiftedLineDataByDay}
                interpolation="natural"
                style={{
                  data: {
                    stroke: "#157AFF",
                    strokeWidth: ({ active }) => (active ? 4 : 2),
                  },
                }}
              />
              <VictoryScatter
                data={weightLiftedLineDataByDay}
                size={5}
                style={{
                  data: {
                    fill: "#157AFF",
                  },
                  labels: { fill: "#fff", fontSize: 16, padding: 10 },
                }}
                labels={({ datum }) => `${datum.y}kg`}
              />
            </VictoryChart>
          </View>
        </View>
      )}
      <Pressable
        onPress={() => advanceOneWeek()}
        style={{
          backgroundColor: "#157AFF",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, padding: 10 }}>
          Advance one week
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
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
});
