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
import { Picker } from "@react-native-picker/picker";

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
              fontSize: 30,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            My Stats
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              marginTop: 50,
              alignSelf: "flex-start",
            }}
          >
            Progrss Graphs
          </Text>
          <View style={styles.graphContainer}>
            <View style={styles.graphHeader}>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{ width: "40%", color: "white", height: 40 }}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, _itemIndex) =>
                    setSelectedCategory(itemValue)
                  }
                  mode="dropdown"
                  itemStyle={{ fontSize: 14, color: "white" }}
                >
                  <Picker.Item
                    label="Calories"
                    value={"Calories"}
                    color="white"
                  />
                  <Picker.Item label="Weight" value={"Weight"} />
                  <Picker.Item label="Time" value={"Time"} />
                </Picker>
              </View>
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
            </View>
            <LineChart
              hideDataPoints
              isAnimated
              animationDuration={1200}
              initialSpacing={10}
              data={lineData}
              curved
              spacing={
                (Dimensions.get("window").width * 0.8) / (lineData.length + 2)
              }
              thickness={3}
              yAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
              xAxisTextStyle={{ color: "#a0a0a0", fontSize: 10 }}
              yAxisThickness={0}
              rulesColor="#50535B"
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

  graphContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#24262B",
    display: "flex",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },

  graphHeader: {
    width: "100%",
    backgroundColor: "#24262B",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  pickerContainer: {
    width: "50%",
    backgroundColor: "#24262B",
    borderWidth: 1,
    borderColor: "#50535B",
    borderRadius: 10,
  },
});
