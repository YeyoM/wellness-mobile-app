import React from "react";
import { View, Text } from "react-native";

export default function Crowdmeter({ navigation }) {
  return (
    <View style={{ backgroundColor: "#0b0b0b", height: 500 }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        Crowdmeter
      </Text>
    </View>
  )
}