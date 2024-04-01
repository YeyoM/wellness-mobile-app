import React from "react";
import {
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useContext } from "react";

import { CreateRoutineContext } from "../../context/CreateRoutineContext";

import TopNavigationBar from "../../components/TopNavigationBar";

import RoutineImageSelect from "../../components/RoutineImageSelect";

export default function SelectRoutineImage({ navigation, route }) {
  const { setImage } = useContext(CreateRoutineContext);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = () => {};
  const handleContinue = ({ image }) => {};
  const handleSkip = () => {
    setImage("");
    navigation.navigate("Select Number Days Per Week");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Routine Creator"}
        back={true}
      />
      <View style={styles.content}>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 80,
            textAlign: "center",
          }}
        >
          Select an image for your routine
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor="rgba(147, 146, 154, 1)"
            style={{
              height: 50,
              borderWidth: 0,
              borderRadius: 14,
              paddingHorizontal: 20,
              backgroundColor: "#24262B",
              color: "#fff",
              width: "84%",
              marginBottom: 20,
            }}
          />
          <Pressable style={styles.buttonSearch} onPress={() => handleSearch()}>
            <Ionicons name="search" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <RoutineImageSelect />
      </ScrollView>
      <Pressable onPress={() => handleSkip()} style={styles.buttonSkip}>
        <Text style={styles.buttonSkipText}>Skip</Text>
      </Pressable>
    </View>
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

  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonSearch: {
    height: 50,
    width: "15%",
    borderRadius: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  buttonSkip: {
    width: "85%",
    paddingVertical: 16,
    backgroundColor: "#24262B",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },

  buttonSkipText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
});
