import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getDoc, doc } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig.js";

import Constants from "expo-constants";

import { AppContext } from "../context/AppContext.js";

export default function Search({ navigation }) {
  const { firebaseUser, routines } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) {
      setError(true);
      setErrorMessage("Please enter the id or url your friend shared with you");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
      return;
    }

    setError(false);
    setLoading(true);
    setErrorMessage(null);

    // check if the search query is a url
    if (searchQuery.includes("/?resource=") && searchQuery.includes("&id=")) {
      const searchQueryParts = searchQuery.split("/?resource=");
      if (searchQueryParts.length !== 2) {
        setError(true);
        setErrorMessage(
          "We had trouble finding the resource, check if the url is correct",
        );
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
        return;
      }

      const [_url, resourceAndID] = searchQueryParts;
      const [resource, id] = resourceAndID.split("&id=");

      if (resource === "routine") {
        if (routines.find((routine) => routine.id === id)) {
          setLoading(false);
          setError(true);
          setErrorMessage("You can't view your own routine here");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        }
        try {
          const routineRef = doc(FIRESTORE, "routines", id);
          const routineDoc = await getDoc(routineRef);
          if (!routineDoc.exists()) {
            setError(true);
            setErrorMessage(
              "The routine you are looking for does not exist, check if the url is correct",
            );
            setTimeout(() => {
              setError(false);
              setErrorMessage("");
            }, 2000);
            return;
          } else {
            navigation.navigate("Shared Routine", {
              routineId: id,
            });
          }
        } catch (error) {
          setError(true);
          setErrorMessage(
            "We had trouble finding the resource, check if the url is correct",
          );
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        } finally {
          setLoading(false);
        }
      } else if (resource === "profile") {
        if (firebaseUser && firebaseUser.uid === id) {
          setLoading(false);
          setError(true);
          setErrorMessage("You can't view your own profile here");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        }
        try {
          const profileRef = doc(FIRESTORE, "users", id);
          const profileDoc = await getDoc(profileRef);
          if (!profileDoc.exists()) {
            setError(true);
            setErrorMessage(
              "The profile you are looking for does not exist, check if the url is correct",
            );
            setTimeout(() => {
              setError(false);
              setErrorMessage("");
            }, 2000);
            return;
          } else {
            navigation.navigate("Shared Profile", {
              profileId: id,
            });
          }
        } catch (error) {
          setError(true);
          setErrorMessage(
            "We had trouble finding the resource, check if the url is correct",
          );
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        } finally {
          setLoading(false);
        }
      } else {
        setError(true);
        setLoading(false);
        setErrorMessage(
          "We had trouble finding the resource, check if the url is correct",
        );
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
        return;
      }
    } else if (searchQuery.includes("/")) {
      const searchQueryParts = searchQuery.split("/");
      if (searchQueryParts.length !== 2) {
        setError(true);
        setErrorMessage("Invalid search query");
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
        return;
      }

      const [type, id] = searchQueryParts;

      if (type === "routine") {
        if (routines.find((routine) => routine.id === id)) {
          setLoading(false);
          setError(true);
          setErrorMessage("You can't view your own routine here");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        }
        try {
          const routineRef = doc(FIRESTORE, "routines", id);
          const routineDoc = await getDoc(routineRef);
          if (!routineDoc.exists()) {
            setError(true);
            setErrorMessage("The routine you are looking for does not exist");
            setTimeout(() => {
              setError(false);
              setErrorMessage("");
            }, 2000);
            return;
          } else {
            navigation.navigate("Shared Routine", {
              routineId: id,
            });
          }
        } catch (error) {
          setError(true);
          setErrorMessage("We had trouble finding the resource");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
        } finally {
          setLoading(false);
        }
      } else if (type === "profile") {
        if (firebaseUser && firebaseUser.uid === id) {
          setLoading(false);
          setError(true);
          setErrorMessage("You can't view your own profile here");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
          return;
        }
        try {
          const profileRef = doc(FIRESTORE, "users", id);
          const profileDoc = await getDoc(profileRef);
          if (!profileDoc.exists()) {
            setError(true);
            setErrorMessage("The profile you are looking for does not exist");
            setTimeout(() => {
              setError(false);
              setErrorMessage("");
            }, 2000);
            return;
          } else {
            navigation.navigate("Shared Profile", {
              profileId: id,
            });
          }
        } catch (error) {
          setError(true);
          setErrorMessage("We had trouble finding the resource");
          setTimeout(() => {
            setError(false);
            setErrorMessage("");
          }, 2000);
        } finally {
          setLoading(false);
        }
      } else {
        setError(true);
        setErrorMessage("We had trouble finding the resource");
        setLoading(false);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage("We had trouble finding the resource");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Pressable onPress={handleSearch}>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={{ marginHorizontal: 5 }}
            />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          Paste the id of the profile or routine your friend shared with you
          (you can also paste the url)!
        </Text>
        {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {loading ? (
          <View style={styles.errorText}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#0B0B0B",
  },

  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: Constants.statusBarHeight,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
    backgroundColor: "#24262B",
    borderRadius: 16,
    marginBottom: 20,
  },

  searchBar: {
    color: "white",
    flex: 1,
  },

  errorText: {
    width: "88%",
    color: "red",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
  },

  infoText: {
    width: "88%",
    color: "#a0a0a0",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
});
