import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import alert from "../../components/Alert";

import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function UpdateBio({ route, navigation }) {
  const { bio, setBio } = route.params;
  const [bio_, setBio_] = useState(bio);
  const [counter, setCounter] = useState(bio?.length || 0);

  const handleContinue = () => {
    if (bio_ === "") {
      alert("Please enter your bio");
      return;
    }
    // transform multiline string to single line
    // and remove leading and trailing whitespaces
    const updatedBio = bio_.replace(/\s+/g, " ").trim();
    setBio(updatedBio);
    navigation.goBack();
  };

  const handleTextChange = (text) => {
    setBio_(text);
    setCounter(text.length);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <Text style={styles.title}>Update your bio</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Bio"
              placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
              textAlign={"left"}
              value={bio_}
              onChangeText={handleTextChange}
              multiline={true}
              numberOfLines={3}
              maxLength={60}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 10,
                alignSelf: "flex-end",
              }}
            >
              {counter}/60
            </Text>
          </View>
          <Pressable style={styles.btn} onPress={handleContinue}>
            <Text style={styles.btnText}>Update</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    width: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  input: {
    width: "100%",
    height: 120,
    padding: 16,
    fontSize: 18,
    fontWeight: "normal",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    color: "white",
    backgroundColor: "#0B0B0B",
    marginTop: 20,
    borderRadius: 16,
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
