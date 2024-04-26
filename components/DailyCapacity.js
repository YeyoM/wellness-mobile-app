import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";

import { BarChart } from "react-native-gifted-charts";

export default function DailyCapacity({ capacityDataForGraph }) {
  const width = Dimensions.get("window").width * 0.8;

  const [day, _setDay] = useState(new Date().getDay());
  const [dayString, setDayString] = useState("");

  const scrollViewRef = useRef();

  useEffect(() => {
    switch (day) {
      case 0:
        setDayString("Sunday");
        break;
      case 1:
        setDayString("Monday");
        break;
      case 2:
        setDayString("Tuesday");
        break;
      case 3:
        setDayString("Wednesday");
        break;
      case 4:
        setDayString("Thursday");
        break;
      case 5:
        setDayString("Friday");
        break;
      case 6:
        setDayString("Saturday");
        break;
    }
  }, [day]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const index = currentHour - 6;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * 80,
        y: 0,
        animated: true,
      });
    }
  }, [scrollViewRef, width, day]);

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 16, padding: 20 }}>
        {dayString}'s Usual Capacity
      </Text>
      {capacityDataForGraph ? (
        <BarChart
          scrollRef={scrollViewRef}
          isAnimated
          width={width}
          animationDuration={200}
          data={capacityDataForGraph}
          initialSpacing={20}
          spacing={40}
          barWidth={40}
          hideRules
          frontColor={"#0496FF"}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "#fff" }}
          yAxisLabelSuffix={"%"}
          xAxisThickness={0}
          xAxisTextStyle={{ color: "#fff" }}
          barBorderRadius={4}
          noOfSections={5}
        />
      ) : (
        <Text style={{ color: "#fff" }}>No data available</Text>
      )}
      <Text
        style={{
          color: "#a0a0a0",
          fontSize: 13,
          textAlign: "center",
          marginTop: 20,
          fontStyle: "italic",
        }}
      >
        Scroll to see the capacity throughout the day
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0b0b",
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
  },

  viewContainer: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonEnable: {
    width: "30%",
    backgroundColor: "#0496FF",
    height: 36,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

