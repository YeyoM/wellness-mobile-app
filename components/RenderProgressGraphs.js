import { LineChart } from "react-native-gifted-charts";
import React from "react";
import { View, Text, Dimensions } from "react-native";

export default function RenderProgressGraphs({
  category,
  selectedPeriod,
  caloriesLineData,
  caloriesLineDataByMonth,
  caloriesLineDataByWeek,
  weightLineData,
  weightLineDataByMonth,
  weightLineDataByWeek,
  timeLineData,
  timeLineDataByMonth,
  timeLineDataByWeek,
}) {
  if (
    !caloriesLineData ||
    !weightLineData ||
    !weightLineDataByMonth ||
    !weightLineDataByWeek ||
    !timeLineData ||
    !caloriesLineDataByMonth ||
    !caloriesLineDataByWeek ||
    !timeLineDataByMonth ||
    !timeLineDataByWeek
  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No data available</Text>
      </View>
    );
  }

  if (category === "Weight") {
    return (
      <LineChart
        isAnimated
        width={Dimensions.get("window").width * 0.8}
        animationDuration={1200}
        initialSpacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        data={
          selectedPeriod === "Month"
            ? weightLineDataByMonth
            : selectedPeriod === "Week"
              ? weightLineDataByWeek
              : weightLineData
        }
        spacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{
          color: "#0B0B0B",
        }}
        rulesColor="#0B0B0B"
        rulesType="solid"
        xAxisColor="#50535B"
        color="#157AFF"
        dataPointsColor="#157AFF"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "#0496FF",
          pointerVanishDelay: 1000,
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
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  {items[0].value.toFixed(2)} Kg
                </Text>
              </View>
            );
          },
        }}
      />
    );
  } else if (category === "Time") {
    return (
      <LineChart
        isAnimated
        width={Dimensions.get("window").width * 0.8}
        animationDuration={1200}
        initialSpacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        data={
          selectedPeriod === "Month"
            ? timeLineDataByMonth
            : selectedPeriod === "Week"
              ? timeLineDataByWeek
              : timeLineData
        }
        spacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        yAxisThickness={0}
        yAxisTextStyle={{
          color: "#0B0B0B",
        }}
        xAxisThickness={0}
        rulesColor="#0B0B0B"
        rulesType="solid"
        xAxisColor="#50535B"
        color="#157AFF"
        dataPointsColor="#157AFF"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerVanishDelay: 1000,
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
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  {items[0].value.toFixed(2)} min
                </Text>
              </View>
            );
          },
        }}
      />
    );
  } else if (category === "Calories") {
    return (
      <LineChart
        isAnimated
        width={Dimensions.get("window").width * 0.8}
        animationDuration={1200}
        initialSpacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        data={
          selectedPeriod === "Month"
            ? caloriesLineDataByMonth
            : selectedPeriod === "Week"
              ? caloriesLineDataByWeek
              : caloriesLineData
        }
        spacing={
          selectedPeriod === "Month" ? 80 : selectedPeriod === "Week" ? 60 : 40
        }
        yAxisThickness={0}
        xAxisThickness={0}
        rulesColor="#0B0B0B"
        rulesType="solid"
        xAxisColor="#0B0B0B"
        color="#157AFF"
        yAxisTextStyle={{
          color: "#0B0B0B",
        }}
        dataPointsColor="#157AFF"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "#0496FF",
          pointerStripWidth: 2,
          pointerVanishDelay: 1000,
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
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  {items[0].value.toFixed(2)} Kcal
                </Text>
              </View>
            );
          },
        }}
      />
    );
  }
}
