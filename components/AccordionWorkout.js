import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Accordion = ({
  routine_,
  navigation,
  index,
  isFavRoutine,
  setFavoriteRoutine,
  deleteFavoriteRoutine,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: routine_.image }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderRadius: 14,
            }}
          />
          {isFavRoutine ? (
            <Pressable
              style={styles.buttonFavorite}
              onPress={() => deleteFavoriteRoutine()}
            >
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          ) : (
            <Pressable
              style={styles.buttonFavorite}
              onPress={() => setFavoriteRoutine(routine_)}
            >
              <Ionicons name="heart-outline" size={24} color="white" />
            </Pressable>
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={styles.textTitle}>{routine_.routineName}</Text>
            <Text style={styles.routineInfo_}>
              {routine_.numberOfDays} days
            </Text>
          </View>
          <Pressable
            style={styles.textTapContainer}
            onPress={() => {
              navigation.navigate("Days List", {
                routine: routine_,
                index: index,
              });
            }}
          >
            <Text style={styles.textTap}>View</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24262B",
    borderRadius: 15,
    overflow: "hidden",
    width: "90%",
    marginBottom: 20,
  },

  textTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },

  viewContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  imageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    borderRadius: 14,
  },

  buttonFavorite: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#1565C0",
    padding: 10,
    borderRadius: 14,
  },

  content: {
    padding: 10,
    marginTop: 10,
  },

  routineInfo_: {
    fontSize: 12,
    color: "#a0a0a0",
    marginTop: 2,
  },

  textTapContainer: {
    width: "35%",
    backgroundColor: "#1565C0",
    height: 36,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
  },

  textTap: {
    fontSize: 12,
    color: "white",
    alignSelf: "center",
  },

  singleDay: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },

  singleExercise: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#313231",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 14,
  },

  textContent_: {
    fontSize: 16,
    color: "white",
  },

  textContent: {
    fontSize: 12,
    color: "gray",
    marginRight: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  buttonEdit: {
    width: "48%",
    height: 48,
    backgroundColor: "#1565C0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  buttonDelete: {
    width: "48%",
    height: 48,
    backgroundColor: "#840505",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
