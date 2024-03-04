import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async () => {
    setLoading(true);

    if (email === "") {
      setLoading(false);
      Alert.alert("Please enter your email");
      return;
    }

    // check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      Alert.alert("Please enter a valid email");
      return;
    }

    if (password === "") {
      setLoading(false);
      Alert.alert("Please enter your password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        // delay 3 seconds, and then show the error of invalid credentials
        setTimeout(() => {
          setLoading(false);
          setError("email or password invalid");
        }, 3000);
      } else {
        setLoading(false);
        Alert.alert("There was an error, please try again later");
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ width: "100%", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {loading && <ActivityIndicator size="large" color="#fff" />}
        <Text style={styles.title}>wellness</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={"rgba(147, 146, 154, 0.8)"}
            value={email}
            keyboardType="email-address"
            autoCompleteType="off"
            onChangeText={setEmail}
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
          {error && (
            <Text
              style={{
                color: "red",
                marginTop: 5,
                marginLeft: 5,
                fontSize: 12,
                fontStyle: "italic",
              }}
            >
              {error}
            </Text>
          )}
        </View>
        <Text style={styles.label}>
          {" "}
          You forgot your{" "}
          <Text style={{ color: "#0496FF", fontWeight: "bold" }}>password</Text>
          ?
        </Text>
        <Pressable style={styles.btn} onPress={handleSignin}>
          <Text style={styles.btnText}>Log in</Text>
        </Pressable>
        <Text style={styles.label}>
          Don't have an account?{" "}
          <Text
            style={{ color: "#0496FF", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up now
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
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
    borderRadius: 20,
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
