import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import ErrorNotification from "../../components/ErrorNotification";
import { Ionicons } from "@expo/vector-icons";
import { InitialScreensContext } from "../../context/InitialScreensContext";

export default function UserInputDietPreference({ navigation }) {
  const { dietPreference, setDietPreference } = useContext(
    InitialScreensContext,
  );

  const [selectPlantBased, setSelectPlantBased] = useState(false);
  const [selectSpecializedDiet, setSelectSpecializedDiet] = useState(false);
  const [selectCarboDiet, setSelectCarboDiet] = useState(false);
  const [selectTraditionalDiet, setSelectTraditionalDiet] = useState(false);

  const [error, setError] = useState(false);

  const handlePlantBased = () => {
    setSelectPlantBased(!selectPlantBased);
    setSelectSpecializedDiet(false);
    setSelectCarboDiet(false);
    setSelectTraditionalDiet(false);
  };

  const handleSpecializedDiet = () => {
    setSelectPlantBased(false);
    setSelectSpecializedDiet(!selectSpecializedDiet);
    setSelectCarboDiet(false);
    setSelectTraditionalDiet(false);
  };

  const handleCarboDiet = () => {
    setSelectPlantBased(false);
    setSelectSpecializedDiet(false);
    setSelectCarboDiet(!selectCarboDiet);
    setSelectTraditionalDiet(false);
  };

  const handleTraditionalDiet = () => {
    setSelectPlantBased(false);
    setSelectSpecializedDiet(false);
    setSelectCarboDiet(false);
    setSelectTraditionalDiet(!selectTraditionalDiet);
  };

  const handleContinue = () => {};

  return (
    <View style={styles.container}>
      <TopNavigationBar
        navigation={navigation}
        actualScreen={"Health"}
        steps={12}
        currentStep={9}
        back={true}
      />
      {error && <ErrorNotification message={error} />}
      <Text style={styles.title}>Do you have a specific diet preference?</Text>
      <View style={styles.objectives}>
        <View
          style={{
            width: "100%",
            height: 150,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={
              selectPlantBased
                ? styles.checkboxSelected
                : styles.checkboxUnselected
            }
            onPress={() => handlePlantBased()}
          >
            <Ionicons
              name="leaf-outline"
              size={24}
              color="white"
              style={{
                marginRight: 10,
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            />
            <View>
              <Text style={styles.label}>Plant based</Text>
              <Text style={styles.subLabel}>Vegan.</Text>
            </View>
          </Pressable>
          <Pressable
            style={
              selectCarboDiet
                ? styles.checkboxSelected
                : styles.checkboxUnselected
            }
            onPress={() => handleCarboDiet()}
          >
            <Ionicons
              name="leaf-outline"
              size={24}
              color="white"
              style={{
                marginRight: 10,
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            />
            <View>
              <Text style={styles.label}>Carbo diet</Text>
              <Text style={styles.subLabel}>Bread, pasta, etc.</Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            height: 150,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={
              selectSpecializedDiet
                ? styles.checkboxSelected
                : styles.checkboxUnselected
            }
            onPress={() => handleSpecializedDiet()}
          >
            <Ionicons
              name="restaurant-outline"
              size={24}
              color="white"
              style={{
                marginRight: 10,
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            />
            <View>
              <Text style={styles.label}>Specialized diet</Text>
              <Text style={styles.subLabel}>Paleo, keto, etc.</Text>
            </View>
          </Pressable>
          <Pressable
            style={
              selectTraditionalDiet
                ? styles.checkboxSelected
                : styles.checkboxUnselected
            }
            onPress={() => handleTraditionalDiet()}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color="white"
              style={{
                marginRight: 10,
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            />
            <View>
              <Text style={styles.label}>Traditional diet</Text>
              <Text style={styles.subLabel}>Whatever mom cooks</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
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
    marginBottom: 30,
    textAlign: "center",
    width: "85%",
  },

  objectives: {
    width: "80%",
    // grid 2x2
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },

  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },

  subLabel: {
    color: "#9EA0A5",
    fontSize: 12,
    fontWeight: "normal",
    marginTop: 2,
  },

  checkboxSelected: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#157AFF",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#0F2F66",
  },

  checkboxUnselected: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#24262B",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#24262B",
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
