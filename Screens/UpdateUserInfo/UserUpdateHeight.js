import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState, useContext } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserUpdateHeight({ route, navigation }) {

  const { height_, system } = route.params;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [height, setHeight] = useState(height_);

  const handleGuardar = async () => {
    if (!height) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor ingresa tu altura');
      return;
    }
    
    setLoading("Guardando...");
    let height_ = height;

    try {
      await setDoc(doc(FIRESTORE, "users", FIREBASE_AUTH.currentUser.uid), { height: height_ }, { merge: true });
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 2000);
      setSuccess('Altura actualizada correctamente');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Error al actualizar la altura');
    }
  }

  const handleCancelar = () => {
    // go back
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar altura'} back={false}/>
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
      <Text style={styles.title}>¿Cuál es tu altura?</Text>
      <View style={{ width: '85%', marginBottom: 60, backgroundColor: "#ECECEC", padding: 30, borderRadius: 55 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15}}>🤔️ Altura</Text>
        <Text style={{ fontWeight: "normal", fontSize: 14}}>Al saber tu edad podemos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <TextInput
        style={styles.input}
        textAlign={'center'}
        placeholder="00.0"
        placeholderTextColor={'rgba(47, 46, 54, 0.4)'}
        keyboardType='numeric'
        returnKeyType='done'
        value={height}
        onChangeText={setHeight}
      />
      <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#2F2E36', marginBottom: 40 }}>{system === 'Metrico' ? 'cm' : 'in'}</Text>
      </View>
      <Pressable
        style={ loading || success ? styles.btnDisabled : styles.btn }
        onPress={handleGuardar}
        disabled={loading || success}
      >
        <Text style={styles.btnText}>Guardar</Text>
      </Pressable>
      <Pressable
        style={ loading || success ? styles.btnDisabled : styles.btnCancelar }
        onPress={handleCancelar}
        disabled={loading || success}
      >
        <Text style={styles.btnText}>Cancelar</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    width: '85%',
  },

  input: {
    width: 'auto',
    height: 48,
    fontSize: 22,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 40,
    marginRight: 10,
    paddingHorizontal: 30,
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },

  btnCancelar: {
    width: '85%',
    height: 48,
    backgroundColor: '#FF3333',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },

  btnDisabled: {
    width: '85%',
    height: 48,
    backgroundColor: '#ECECEC',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 4,
  }
});
