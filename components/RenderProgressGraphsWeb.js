import React from "react";
import { View, Text, Dimensions } from "react-native";

import RenderCaloriesDailyGraph from "./RenderGraphs/Web/Calories/RenderCaloriesDailyGraph";
import RenderCaloriesMonthlyGraph from "./RenderGraphs/Web/Calories/RenderCaloriesMonthlyGraph";
import RenderCaloriesWeeklyGraph from "./RenderGraphs/Web/Calories/RenderCaloriesWeeklyGraph";

import RenderUserWeightDailyGraph from "./RenderGraphs/Web/UserWeight/RenderUserWeightDailyGraph";
import RenderUserWeightMonthlyGraph from "./RenderGraphs/Web/UserWeight/RenderUserWeightMonthlyGraph";
import RenderUserWeightWeeklyGraph from "./RenderGraphs/Web/UserWeight/RenderUserWeightWeeklyGraph";

import RenderTimeDailyGraph from "./RenderGraphs/Web/Time/RenderTimeDailyGraph";
import RenderTimeMonthlyGraph from "./RenderGraphs/Web/Time/RenderTimeMonthlyGraph";
import RenderTimeWeeklyGraph from "./RenderGraphs/Web/Time/RenderTimeWeeklyGraph";

import RenderWeightLiftedDailyGraph from "./RenderGraphs/Web/WeightLifted/RenderWeightLiftedDailyGraph";
import RenderWeightLiftedMonthlyGraph from "./RenderGraphs/Web/WeightLifted/RenderWeightLiftedMonthlyGraph";
import RenderWeightLiftedWeeklyGraph from "./RenderGraphs/Web/WeightLifted/RenderWeightLiftedWeeklyGraph";

export default function RenderProgressGraphsWeb({
  category,
  selectedPeriod,
  caloriesLineData,
  caloriesLineDataByMonth,
  caloriesLineDataByWeek,
  maxCaloriesDaily,
  maxCaloriesWeekly,
  maxCaloriesMonthly,
  weightLineData,
  weightLineDataByMonth,
  weightLineDataByWeek,
  maxWeight,
  minWeight,
  timeLineData,
  timeLineDataByMonth,
  timeLineDataByWeek,
  maxTimeDaily,
  maxTimeWeekly,
  maxTimeMonthly,
  weightLiftedLineData,
  weightLiftedLineDataByMonth,
  weightLiftedLineDataByWeek,
  maxWeightLiftedDaily,
  maxWeightLiftedWeekly,
  maxWeightLiftedMonthly,
}) {
  console.log("RenderProgressGraphsWeb", category, selectedPeriod);

  if (category === "Weight") {
    if (selectedPeriod === "Day") {
      return (
        <RenderUserWeightDailyGraph
          weightLineDataByDay={weightLineData}
          minWeight={minWeight}
          maxWeight={maxWeight}
        />
      );
    } else if (selectedPeriod === "Week") {
      return (
        <RenderUserWeightWeeklyGraph
          weightLineDataByWeek={weightLineDataByWeek}
          minWeight={minWeight}
          maxWeight={maxWeight}
        />
      );
    } else if (selectedPeriod === "Month") {
      return (
        <RenderUserWeightMonthlyGraph
          weightLineDataByMonth={weightLineDataByMonth}
          minWeight={minWeight}
          maxWeight={maxWeight}
        />
      );
    }
  } else if (category === "Weight Lifted") {
    if (selectedPeriod === "Day") {
      return (
        <RenderWeightLiftedDailyGraph
          weightLiftedLineDataByDay={weightLiftedLineData}
          minWeight={0}
          maxWeight={maxWeightLiftedDaily}
        />
      );
    } else if (selectedPeriod === "Week") {
      return (
        <RenderWeightLiftedWeeklyGraph
          weightLiftedLineDataByWeek={weightLiftedLineDataByWeek}
          minWeight={0}
          maxWeight={maxWeightLiftedWeekly}
        />
      );
    } else if (selectedPeriod === "Month") {
      return (
        <RenderWeightLiftedMonthlyGraph
          weightLiftedLineDataByMonth={weightLiftedLineDataByMonth}
          minWeight={0}
          maxWeight={maxWeightLiftedMonthly}
        />
      );
    }
  } else if (category === "Time") {
    if (selectedPeriod === "Day") {
      return (
        <RenderTimeDailyGraph
          timeLineDataByDay={timeLineData}
          minTime={0}
          maxTime={maxTimeDaily}
        />
      );
    } else if (selectedPeriod === "Week") {
      return (
        <RenderTimeWeeklyGraph
          timeLineDataByWeek={timeLineDataByWeek}
          minTime={0}
          maxTime={maxTimeWeekly}
        />
      );
    } else if (selectedPeriod === "Month") {
      return (
        <RenderTimeMonthlyGraph
          timeLineDataByMonth={timeLineDataByMonth}
          minTime={0}
          maxTime={maxTimeMonthly}
        />
      );
    }
  } else if (category === "Calories") {
    if (selectedPeriod === "Day") {
      return (
        <RenderCaloriesDailyGraph
          caloriesLineDataByDay={caloriesLineData}
          minCalories={0}
          maxCalories={maxCaloriesDaily}
        />
      );
    } else if (selectedPeriod === "Week") {
      return (
        <RenderCaloriesWeeklyGraph
          caloriesLineDataByWeek={caloriesLineDataByWeek}
          minCalories={0}
          maxCalories={maxCaloriesWeekly}
        />
      );
    } else if (selectedPeriod === "Month") {
      return (
        <RenderCaloriesMonthlyGraph
          caloriesLineDataByMonth={caloriesLineDataByMonth}
          minCalories={0}
          maxCalories={maxCaloriesMonthly}
        />
      );
    }
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No data available</Text>
      </View>
    );
  }
}
