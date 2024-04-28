import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { AppContext } from "../context/AppContext";
import GetUser from "../FirebaseFunctions/Users/GetUser";

export default function SharedProfile({ navigation, route }) {
  const { profileId } = route.params;
  const { firebaseUser } = useContext(AppContext);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profileId === firebaseUser.uid) {
      console.log("this is your profile");
      navigation.navigate("Profile");
      return;
    }

    GetUser(profileId)
      .then((profile) => {
        if (!profile) {
          setError("User not found");
          setLoading(false);
          return;
        }
        if (profile?.privateProfile) {
          setError("This profile is private");
          setLoading(false);
          return;
        }
        console.log(profile);
        setLoading(false);
        setProfile(profile);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred");
        setLoading(false);
      });
  }, []);

  const handleSeeStats = () => {
    navigation.navigate("Shared Profile Stats", {
      profile: profile,
      workoutsIds: profile?.workouts || [],
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0496FF"
          style={{ zIndex: 100, marginBottom: 20 }}
        />
      ) : null}
      {error ? (
        <Text style={{ color: "#FF0000", fontSize: 16, marginBottom: 20 }}>
          {error}
        </Text>
      ) : null}
      {profile ? (
        <View
          style={{
            width: "100%",
            height: Dimensions.get("window").height * 0.75,
            backgroundColor: "#0b0b0b",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            paddingTop: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.left}>
              <Text style={styles.name}>{profile?.name}</Text>
              <Text style={styles.bio}>
                {profile?.bio ? profile.bio : "no bio"}
              </Text>
            </View>
            <View style={styles.right}></View>
          </View>
          <View style={styles.subHeader}>
            {/**{!profile?.showHeightAndWeight ? (*/}
            <View style={styles.top}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.weight}>{profile?.weight}</Text>
                <Text style={styles.unit}>{profile?.weightUnit}</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.weight}>{profile?.height}</Text>
                <Text style={styles.unit}>{profile?.heightUnit}</Text>
              </View>
            </View>
            {/** ) : null} */}
          </View>
          <ScrollView style={styles.content}>
            <View style={styles.stats}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 5,
                }}
              >
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
                <Pressable
                  onPress={() => {
                    handleSeeStats();
                  }}
                >
                  <Text
                    style={{
                      color: "#a0a0a0",
                      fontSize: 14,
                      marginBottom: 10,
                      fontStyle: "italic",
                      textDecorationLine: "underline",
                    }}
                  >
                    See more
                  </Text>
                </Pressable>
              </View>

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
                      {profile?.workouts?.length}
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
      ) : null}
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

  followButton: {
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
