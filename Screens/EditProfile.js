import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function EditProfile({ navigation }) {
  const [setSwitch, setSetSwitch] = React.useState(false);
  const [setSwitch2, setSetSwitch2] = React.useState(false);

  const handleSwitch = () => {
    setSetSwitch(!setSwitch);
  };

  const handleSwitch2 = () => {
    setSetSwitch2(!setSwitch2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
      </View>
      <View style={styles.doneButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              color: "#0496FF",
            }}
          >
            Done
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Edit Profile
      </Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - 200,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          paddingTop: 40,
        }}
      >
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Name
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>John Doe</Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Bio
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                Fitness Freak
              </Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Weight
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>75 kg</Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>170 cm</Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.group}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Show Weight
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                and Height
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleSwitch}
                  value={setSwitch}
                />
              </View>
            </View>
            <View style={styles.groupBottom}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Private
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Profile
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleSwitch2}
                  value={setSwitch2}
                />
              </View>
            </View>
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

  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
    backgroundColor: "#0b0b0b",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },

  doneButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 36,
    right: 20,
  },

  content: {
    flex: 1,
  },

  card: {
    backgroundColor: "#1E1F25",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  group: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3B3F",
  },

  groupBottom: {
    paddingVertical: 14,
  },
});
