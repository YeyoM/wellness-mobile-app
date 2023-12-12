import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserUpdateActive({ route, navigation }) {

  const { activityLevel } = route.params;

  const [selectSedentario, setSelectSedentario] = useState(false);
  const [selectModeradamenteActivo, setSelectModeradamenteActivo] = useState(false);
  const [selectMuyActivo, setSelectMuyActivo] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activityLevel === 'Sedentario') {
      setSelectSedentario(true);
    }
    if (activityLevel === 'Moderadamente activo') {
      setSelectModeradamenteActivo(true);
    }
    if (activityLevel === 'Muy activo') {
      setSelectMuyActivo(true);
    }
  }, []);

  const pressSelectSedentario = () => {
    setSelectSedentario(true);
    setSelectModeradamenteActivo(false);
    setSelectMuyActivo(false);
  }

  const pressSelectModeradamenteActivo = () => {
    setSelectSedentario(false);
    setSelectModeradamenteActivo(true);
    setSelectMuyActivo(false);
  }

  const pressSelectMuyActivo = () => {
    setSelectSedentario(false);
    setSelectModeradamenteActivo(false);
    setSelectMuyActivo(true);
  }

  const handleGuardar = async () => {
    if (!selectSedentario && !selectModeradamenteActivo && !selectMuyActivo) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona tu nivel de actividad');
      return;
    }

    let activityLevel = '';

    if (selectSedentario) {
      activityLevel = 'Sedentario';
    }

    if (selectModeradamenteActivo) {
      activityLevel = 'Moderadamente activo';
    }

    if (selectMuyActivo) {
      activityLevel = 'Muy activo';
    }

    setLoading(true);

    const userRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      await setDoc(userRef, {
        activityLevel,
      }, { merge: true });

      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 3000);
      setSuccess('Nivel de actividad actualizado');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setError('Hubo un error al actualizar tu información');
    }
  }

  const handleCancelar = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar nivel de actividad'} />
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={'Cargando...'} /> }
      <Text style={styles.title}>¿Qué tan activo eres?</Text>
      <Pressable
        style={selectSedentario ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectSedentario}
      >
        <Text style={styles.labelTitle}>Sedentario</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectModeradamenteActivo ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectModeradamenteActivo}
      >
        <Text style={styles.labelTitle}>Moderadamente activo</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectMuyActivo ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectMuyActivo}
      >
        <Text style={styles.labelTitle}>Muy activo</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
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
    </View>
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
    fontSize: 32,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 60,
    textAlign: 'center',
    width: '85%',
  },

  labelTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 4,
  },

  labelSubtitle: {
    color: '#A0A0A3',
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 4,
  },

  checkboxSelected: {
    width: '85%',
    height: 100,
    backgroundColor: 'rgba(4, 150, 255, 0.5)',
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0496FF',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  checkboxUnselected: {
    width: '85%',
    height: 100,
    backgroundColor: '#ECECEC',
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
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
