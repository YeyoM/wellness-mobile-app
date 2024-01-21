import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputPreviuosFitnessExperience({ navigation }) {
  const { setPrevExperience } = useContext(InitialScreensContext);

  const handleContinuePrevExperience = () => {
    setPrevExperience(true);
    navigation.navigate("About you (Fitness Level)");
  };

  const handleContinueNoPrevExperience = () => {
    setPrevExperience(false);
    navigation.navigate("About you (Fitness Level)");
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"About you"}
        steps={12}
        currentStep={6}
        back={true}
      />
      <Text style={styles.title}>Do you have previous fitness experience?</Text>
      <Image
        source={require("../../assets/prev_experience.png")}
        style={{
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").width * 0.8,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={styles.btnSkip}
          onPress={handleContinueNoPrevExperience}
        >
          <Text style={styles.btnTextSkip}>No</Text>
          <Ionicons name="close-outline" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.btn} onPress={handleContinuePrevExperience}>
          <Text style={styles.btnText}>Yes</Text>
          <Ionicons name="checkmark-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    marginBottom: 50,
    marginTop: 70,
    textAlign: "center",
    width: "85%",
  },

  btnSkip: {
    width: "45%",
    paddingVertical: 16,
    backgroundColor: "#157AFF",
    borderRadius: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  btnTextSkip: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 4,
  },

  btn: {
    width: "45%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#0B0B0B",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 4,
  },
});
