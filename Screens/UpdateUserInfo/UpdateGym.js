import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function UpdateGym({ route, navigation }) {
  const { gym, setGym } = route.params;
  const [gym_, setGym_] = useState(gym);

  const handleContinue = () => {
    if (gym_ === "") {
      Alert.alert("Please enter your gym");
      return;
    }
    setGym(gym_);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Update your gym</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="gym"
            placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
            textAlign={"center"}
            value={gym_}
            onChangeText={setGym_}
          />
        </View>
        <Pressable style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>Update</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },

  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
    backgroundColor: "#24262B",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    textAlign: "center",
    width: "85%",
    margin: 0,
  },

  formGroup: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0,
  },

  input: {
    width: "60%",
    height: 48,
    fontSize: 18,
    fontWeight: "normal",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E5E5",
    borderTopColor: "#0B0B0B",
    borderRightColor: "#0B0B0B",
    borderLeftColor: "#0B0B0B",
    color: "white",
    backgroundColor: "#0B0B0B",
    marginTop: 20,
  },

  btn: {
    width: "85%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },

  btnText: {
    color: "#0B0B0B",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
});
