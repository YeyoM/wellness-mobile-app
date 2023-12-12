import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserUpdateFitnessLevel({ route, navigation }) {

  const { fitnessLevel } = route.params;

  const [selectPrincipiante, setSelectPrincipiante] = useState(false);
  const [selectIntermedio, setSelectIntermedio] = useState(false);
  const [selectAvanzado, setSelectAvanzado] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (fitnessLevel === 'Principiante') {
      setSelectPrincipiante(true);
    }
    if (fitnessLevel === 'Intermedio') {
      setSelectIntermedio(true);
    }
    if (fitnessLevel === 'Avanzado') {
      setSelectAvanzado(true);
    }
  }, []);

  const pressSelectPrincipiante = () => {
    setSelectPrincipiante(true);
    setSelectIntermedio(false);
    setSelectAvanzado(false);
  }

  const pressSelectIntermedio = () => {
    setSelectPrincipiante(false);
    setSelectIntermedio(true);
    setSelectAvanzado(false);
  }

  const pressSelectAvanzado = () => {
    setSelectPrincipiante(false);
    setSelectIntermedio(false);
    setSelectAvanzado(true);
  }

  const handleGuardar = async () => {
    if (!selectPrincipiante && !selectIntermedio && !selectAvanzado) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona tu nivel de fitness');
      return;
    }

    let fitnessLevel = '';

    if (selectPrincipiante) {
      fitnessLevel = 'Principiante';
    }

    if (selectIntermedio) {
      fitnessLevel = 'Intermedio';
    }

    if (selectAvanzado) {
      fitnessLevel = 'Avanzado';
    }

    setLoading(true);

    const userRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      await setDoc(userRef, {
        fitnessLevel: fitnessLevel,
      }, { merge: true });

      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 3000);
      setSuccess('Nivel de fitness actualizado');
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
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar nivel de fitness'} />
      { error && <ErrorNotification message={error} /> }
      { loading && <PrimaryNotification message={'Cargando...'} /> }
      { success && <SuccessNotification message={success} /> }
      <Text style={styles.title}>¿Cuál es tu nivel de fitness?</Text>
      <Pressable
        style={selectPrincipiante ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectPrincipiante}
      >
        <Text style={styles.labelTitle}>Principiante</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectIntermedio ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectIntermedio}
      >
        <Text style={styles.labelTitle}>Intermedio</Text>
        <Text style={styles.labelSubtitle}>Tus entrenamientos durarán 1 hora en promedio</Text>
      </Pressable>
      <Pressable
        style={selectAvanzado ? styles.checkboxSelected : styles.checkboxUnselected}
        onPress={pressSelectAvanzado}
      >
        <Text style={styles.labelTitle}>Avanzado</Text>
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
    marginTop: 30,
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
