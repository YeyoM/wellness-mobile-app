import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

export default function TopNavigationBar({
  navigation,
  actualScreen,
  previousScreen,
  back,
  steps,
  currentStep,
}) {
  return (
    <View style={styles.topBar}>
      {back && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 10,
            left: 20,
            height: 36,
            width: 36,
            zIndex: 999,
            backgroundColor: "#24262B",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back-outline" size={36} color="white" />
        </Pressable>
      )}
      {previousScreen && (
        <Pressable
          onPress={() => navigation.navigate(previousScreen)}
          style={{
            position: "absolute",
            top: 10,
            left: 20,
            height: 36,
            width: 36,
            zIndex: 999,
            backgroundColor: "#24262B",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back-outline" size={36} color="white" />
        </Pressable>
      )}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>{actualScreen}</Text>
        {steps && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#142749",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#7BADEA", fontSize: 12 }}>
              {currentStep} of {steps}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    top: 0,
    marginTop: Constants.statusBarHeight + 10,
    zIndex: 900,
    backgroundColor: "#0B0B0B",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 5,
  },

  progressBar: {
    alignSelf: "center",
    marginBottom: 5,
  },
});

