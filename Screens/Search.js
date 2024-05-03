import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

export default function Search({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchType, setSearchType] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const handleSearch = async () => {
    console.log("searching");
    console.log(searchQuery);
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
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
        {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text>Search Results</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 40,
  },

  searchBar: {
    color: "white",
    flex: 1,
  },

  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
