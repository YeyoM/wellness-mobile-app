import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

export default function RenderTimeAllTimeGraph({
  timeLineData,
  minTime,
  maxTime,
}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          paddingHorizontal: 20,
        }}
      >
        All time
      </Text>
      {!timeLineData.length ? (
        <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
          No data to display :(
        </Text>
      ) : (
        <View style={{ marginBottom: 100 }}>
          <View style={styles.graphContainer}>
            <VictoryChart
              minDomain={{ y: minTime - 5 }}
              maxDomain={{ y: maxTime + 5 }}
              scale={{ x: "time" }}
              height={Dimensions.get("window").height * 0.6}
              width={Dimensions.get("window").width}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) =>
                    `${datum.y}min on ${datum.x.getDate()}/${datum.x.getMonth() + 1}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      cornerRadius={8}
                      flyoutStyle={{
                        fill: "#fff",
                        stroke: "transparent",
                      }}
                    />
                  }
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
              />
              <VictoryLine
                data={timeLineData}
                style={{
                  data: {
                    stroke: "#157AFF",
                    strokeWidth: ({ active }) => (active ? 4 : 2),
                  },
                  labels: { fill: "#000", fontSize: 16, padding: 10 },
                }}
              />
            </VictoryChart>
          </View>
        </View>
      )}
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
