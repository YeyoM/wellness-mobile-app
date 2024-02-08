import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Constants from "expo-constants";
import DeleteUser from "../FirebaseFunctions/Users/DeleteUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

export default function DeleteAccount({ navigation }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    // reauthenticate the user
    console.log(password);
    const user = FIREBASE_AUTH.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    setLoading(true);
    try {
      const result = await reauthenticateWithCredential(user, credential);
      console.log(result);
      setError(false);
      // delete the Account
      await DeleteUser();
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
      </View>
      <Text style={styles.text}>Delete Account</Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - 200,
          backgroundColor: "#0b0b0b",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
            height: "100%",
            width: "80%",
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ zIndex: 100, marginBottom: 20 }}
            />
          ) : null}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginVertical: 40,
              textAlign: "center",
            }}
          >
            Input your password to delete your account, this action is
            irreversible.
          </Text>
          <TextInput
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderRadius: 10,
              padding: 20,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            textContentType="oneTimeCode"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {error ? (
            <Text
              style={{
                color: "red",
                marginTop: 10,
                textAlign: "left",
                width: "100%",
              }}
            >
              {error}
            </Text>
          ) : null}
          <Pressable
            style={styles.deleteAccountButton}
            onPress={handleDeleteAccount}
          >
            <Text
              style={{ color: "#C70202", fontWeight: "bold", fontSize: 16 }}
            >
              Delete Account
            </Text>
          </Pressable>
        </View>
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

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  content: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
  },

  deleteAccountButton: {
    width: "65%",
    backgroundColor: "#fff",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 20,
  },
});
