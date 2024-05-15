import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import alert from "../components/Alert";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    setLoading(true);

    if (email === "") {
      setLoading(false);
      alert("Please enter your email");
      return;
    }

    // check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      alert("Please enter a valid email");
      return;
    }

    if (password === "") {
      setLoading(false);
      alert("Please enter your password");
      return;
    }

    if (password.length < 8) {
      setLoading(false);
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigation.navigate("User Input");
    } catch (error) {
      setLoading(false);
      alert("There was an error signing up");
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading && <ActivityIndicator size="large" color="#fff" />}
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={styles.title}>wellness</Text>
        <Text style={styles.subtitle}>Sign up to create an account</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="oneTimeCode"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            textContentType="oneTimeCode"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable
            onPress={handleShowPassword}
            style={{
              position: "absolute",
              right: 0,
              height: 25,
              width: 25,
              zIndex: 999,
            }}
          >
            {showPassword ? (
              <Image
                style={styles.showHide}
                source={require("../assets/eye-off.png")}
              />
            ) : (
              <Image
                style={styles.showHide}
                source={require("../assets/eye.png")}
              />
            )}
          </Pressable>
        </View>
        <Pressable style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btnText}>Sign up</Text>
        </Pressable>
        <Text style={styles.label}>
          Already have an account?{" "}
          <Text
            style={{ color: "#0496FF", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  title: {
    fontSize: 65,
    fontWeight: "bold",
    color: "#0496FF",
    marginBottom: 0,
  },

  subtitle: {
    fontSize: 19,
    color: "#fff",
    marginBottom: 40,
  },

  formGroup: {
    width: "85%",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: "rgba(147, 146, 154, 1)",
    marginBottom: 10,
  },

  input: {
    height: 50,
    borderWidth: 0,
    borderRadius: 90,
    paddingHorizontal: 20,
    backgroundColor: "#1F1F1F",
    color: "#fff",
  },

  // send to bottom
  formGroupBtn: {
    width: "85%",
    marginBottom: 40,
    alignItems: "center",
  },

  btn: {
    width: "85%",
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 16,
    backgroundColor: "#0496FF",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },

  showHide: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    position: "absolute",
    right: 15,
    top: 40,
  },
});
