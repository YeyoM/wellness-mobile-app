import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.8,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          paddingTop: 40,
        }}
      >
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.bio}>Fitness Enthusiast</Text>
          </View>
          <View style={styles.right}>
            <Pressable onPress={() => navigation.navigate("Account Settings")}>
              <Ionicons name="settings-outline" size={32} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={styles.subHeader}>
          <View style={styles.top}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.weight}>75</Text>
              <Text style={styles.unit}>kg</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.weight}>170</Text>
              <Text style={styles.unit}>cm</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Pressable style={styles.editButton}>
              <Text style={{ color: "white" }}>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.shareButton}>
              <Text style={{ color: "white" }}>Share Profile</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.stats}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Statistics
            </Text>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.stat}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Finished Workouts
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#0496FF",
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    12
                  </Text>
                </View>
              </View>
              <View style={styles.stat}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="hourglass-outline" size={24} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Hours Trained
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#0496FF",
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    30
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.badges}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Badges
            </Text>
            <Text style={{ color: "#a0a0a0", fontSize: 16 }}>
              Coming soon...
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  left: {
    flexDirection: "column",
  },

  right: {
    flexDirection: "column",
  },

  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  bio: {
    color: "#a0a0a0",
    fontSize: 16,
  },

  subHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  weight: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  unit: {
    color: "#a0a0a0",
    fontSize: 16,
  },

  bottom: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  editButton: {
    backgroundColor: "#24262B",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  shareButton: {
    backgroundColor: "#0496FF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  stats: {
    marginTop: 20,
  },

  stat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#24262B",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },

  badges: {
    marginTop: 20,
  },
});
