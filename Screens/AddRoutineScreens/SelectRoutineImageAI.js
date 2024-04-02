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
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import TopNavigationBar from "../../components/TopNavigationBar";
import RoutineImageSelect from "../../components/RoutineImageSelect";
import getPicturesByKeyword from "../../Utils/unsplash/getPicturesByKeyword";
import { CreateRoutineContext } from "../../context/CreateRoutineContext";

export default function SelectRoutineImageAI({ navigation, route }) {
  const { setImage } = useContext(CreateRoutineContext);

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setError(false);
    getPicturesByKeyword(keyword)
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleContinue = ({ image }) => {
    setImage(image.urls.regular);
    navigation.navigate("Select Number Days Per Week AI");
  };

  const handleSkip = () => {
    setImage(
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JheXxlbnwwfHwwfHx8MA%3D%3D",
    );
    navigation.navigate("Select Number Days Per Week AI");
  };

  const handleViewOriginal = ({ image }) => {
    Linking.openURL(image.links.html);
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
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <Pressable style={styles.buttonSearch} onPress={() => handleSearch()}>
            <Ionicons name="search" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: 80,
        }}
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <RoutineImageSelect
              key={index}
              image={image}
              handleSelect={() => handleContinue({ image })}
              handleViewOriginal={() => handleViewOriginal({ image })}
            />
          ))
        ) : loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={{ color: "#fff" }}>Error loading images</Text>
        ) : null}
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
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    height: Dimensions.get("window").height * 0.4,
    marginBottom: 20,
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
    backgroundColor: "#fff",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },

  buttonSkipText: {
    color: "#0b0b0b",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
});
