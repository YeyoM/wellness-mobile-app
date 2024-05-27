import React, { useState, useContext } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import TopNavigationBar from "../../components/TopNavigationBar";
import alert from "../../components/Alert";

import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputName({ navigation }) {
  const { setName } = useContext(InitialScreensContext);
  const [name_, setName_] = useState("");
  const handleContinue = () => {
    if (name_ === "") {
      alert("Please enter your name");
      return;
    }
    setName(name_);
    navigation.navigate("About you (Gender)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={1}
        back={false}
      />
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
        <Text style={styles.title}>What is your name?</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
            textAlign={"center"}
            value={name_}
            onChangeText={setName_}
          />
        </View>
        <Pressable style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>Continue</Text>
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
    fontSize: 22,
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
