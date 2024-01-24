import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputPhysicalLimitations({ navigation }) {
  const { setPhysicalLimitations } = useContext(InitialScreensContext);

  const [physicalLimitations_, setPhysicalLimitations_] = useState([]);

  const [singlePhysicalLimitation, setSinglePhysicalLimitation] = useState("");

  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (physicalLimitations_.length === 0) {
      setPhysicalLimitations([]);
    }
    navigation.navigate("About you (Objectives)");
  };

  const addPhysicalLimitation = () => {
    if (singlePhysicalLimitation === "") {
      setError("Please type a physical limitation");
    } else {
      setPhysicalLimitations_([
        ...physicalLimitations_,
        singlePhysicalLimitation,
      ]);
      setSinglePhysicalLimitation("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Health"}
        steps={12}
        currentStep={7}
        back={true}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>Do you have any physical limitations?</Text>
      <Image
        source={require("../../assets/physical_limitations.png")}
        style={{
          width: Dimensions.get("window").width * 0.6,
          height: Dimensions.get("window").width * 0.6,
          marginVertical: 10,
        }}
      />
      {/* Here the list of physical limitations will be displayed as separate "pill" components */}
      <View
        style={{
          width: "85%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {physicalLimitations_ &&
          physicalLimitations_.map((limitation, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#142749",
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 8,
                margin: 5,
              }}
            >
              <Text style={{ color: "#157AFF" }}>{limitation}</Text>
            </View>
          ))}
      </View>
      <TextInput
        style={{
          width: "85%",
          height: 40,
          borderColor: "#142749",
          borderWidth: 2,
          borderRadius: 22,
          backgroundColor: "#24262B",
          paddingHorizontal: 16,
          marginTop: 10,
          color: "white",
        }}
        onChangeText={(text) => setSinglePhysicalLimitation(text)}
        value={singlePhysicalLimitation}
        onSubmitEditing={() => {
          addPhysicalLimitation();
        }}
        placeholder="Type here..."
      />
      <View
        style={{
          width: "85%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 110,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
            marginRight: 5,
          }}
        >
          Most Common:
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
            color: "#256CD0",
          }}
        >
          Back pain, knee pain
        </Text>
      </View>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "white",
    textAlign: "center",
    width: "85%",
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
