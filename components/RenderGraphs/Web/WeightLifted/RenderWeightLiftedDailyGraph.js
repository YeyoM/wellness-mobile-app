import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory";

import {
  timeToMilliseconds,
  MILLISECONDS_IN_A_DAY,
} from "../../../../Utils/dateToMilliseconds.js";

import advanceOneWeek from "../../../../Utils/renderGraphsFunctions/advanceOneWeek.js";
import retreatOneWeek from "../../../../Utils/renderGraphsFunctions/retreatOneWeek.js";

import AdvanceRetreatButtons from "../../../AdvanceRetreatButtons.js";

export default function RenderWeightLiftedDailyGraph({
  weightLiftedLineDataByDay,
  minWeight,
  maxWeight,
}) {
  const [zoomState, setZoomState] = useState({ x: [0, 0] });
  const [maxDomain, setMaxDomain] = useState(0);
  const [minDomain, setMinDomain] = useState(0);

  const [weightLiftedLineData, setWeightLiftedLineData] = useState([]);

  useEffect(() => {
    if (weightLiftedLineDataByDay.length) {
      const leftDate = new Date(weightLiftedLineDataByDay[0].x);
      const rightDate = new Date(
        weightLiftedLineDataByDay[weightLiftedLineDataByDay.length - 1].x,
      );

      let rightUnixTime = timeToMilliseconds(rightDate);
      let leftUnixTime = timeToMilliseconds(leftDate);

      setMaxDomain(rightUnixTime + MILLISECONDS_IN_A_DAY);
      setMinDomain(leftUnixTime - MILLISECONDS_IN_A_DAY);

      if (rightUnixTime - leftUnixTime > MILLISECONDS_IN_A_DAY * 4) {
        rightUnixTime = leftUnixTime + MILLISECONDS_IN_A_DAY * 4;
      }

      const newDomain = {
        x: [leftUnixTime - MILLISECONDS_IN_A_DAY, rightUnixTime],
      };

      setZoomState({ x: newDomain.x, y: zoomState.y });

      setWeightLiftedLineData(
        weightLiftedLineDataByDay.map((data) => {
          return {
            x: new Date(data.x),
            y: data.y,
          };
        }),
      );
    }
  }, [weightLiftedLineDataByDay]);

  const handleZoom = (domain) => {
    setZoomState({ x: domain.x, y: domain.y });
  };

  return (
    <View style={styles.container}>
      {!weightLiftedLineData.length ? (
        <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
          No data to display :(
        </Text>
      ) : (
        <View style={styles.graphContainer}>
          <VictoryChart
            minDomain={{ y: minWeight - 5 }}
            maxDomain={{ y: maxWeight + 5 }}
            scale={{ x: "time" }}
            height={Dimensions.get("window").height * 0.6}
            width={Dimensions.get("window").width}
            domainPadding={{ x: 10 }}
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
              data={weightLiftedLineData}
              style={{
                data: {
                  stroke: "#157AFF",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
              }}
            />
            <VictoryScatter
              data={weightLiftedLineData}
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
      )}
      <AdvanceRetreatButtons
        advanceFunction={() =>
          advanceOneWeek(zoomState, setZoomState, maxDomain)
        }
        retreatFunction={() =>
          retreatOneWeek(zoomState, setZoomState, minDomain)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    marginBottom: 40,
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
