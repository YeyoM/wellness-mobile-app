import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserInputExercises({ route, navigation }) {

  const { exercises } = route.params; 

  const [selectHIIT, setSelectHIIT] = useState(false);
  const [selectGAP, setSelectGAP] = useState(false);
  const [selectZumba, setSelectZumba] = useState(false);
  const [selectBox, setSelectBox] = useState(false);
  const [selectCrossFit, setSelectCrossFit] = useState(false);
  const [selectGym, setSelectGym] = useState(false);
  const [selectYoga, setSelectYoga] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {

    if (!exercises) {
      return;
    }

    if (exercises.includes('HIIT')) {
      setSelectHIIT(true);
    }

    if (exercises.includes('GAP')) {
      setSelectGAP(true);
    }

    if (exercises.includes('Zumba')) {
      setSelectZumba(true);
    }

    if (exercises.includes('Box')) {
      setSelectBox(true);
    }

    if (exercises.includes('CrossFit')) {
      setSelectCrossFit(true);
    }

    if (exercises.includes('Gym')) {
      setSelectGym(true);
    }

    if (exercises.includes('Yoga')) {
      setSelectYoga(true);
    }

  }, []);

  const handleGuardar = async () => {
    if (!selectHIIT && !selectGAP && !selectZumba && !selectBox && !selectCrossFit && !selectGym && !selectYoga) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona al menos un ejercicio');
      return;
    }

    let exercises = [];

    if (selectHIIT) {
      exercises.push('HIIT');
    }

    if (selectGAP) {
      exercises.push('GAP');
    }

    if (selectZumba) {
      exercises.push('Zumba');
    }

    if (selectBox) {
      exercises.push('Box');
    }

    if (selectCrossFit) {
      exercises.push('CrossFit');
    }

    if (selectGym) {
      exercises.push('Gym');
    }

    if (selectYoga) {
      exercises.push('Yoga');
    }

    setLoading('Guardando información...');

    const userId = FIREBASE_AUTH.currentUser.uid;

    const docRef = doc(FIRESTORE, 'users', userId);

    try {
      await setDoc(docRef, { exercises }, { merge: true });
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 3000);
      setSuccess('Información guardada con éxito');
    } catch (e) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Ocurrió un error guardando la información');
    }

  }

  const handleCancelar = () => {
    // go back
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar ejercicios'} back={false}/>
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
      <Text style={styles.title}>¿En que ejercicios estás interesado?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={selectHIIT ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectHIIT(!selectHIIT)}
        >
          <Text style={styles.label}>HIIT</Text>
        </Pressable>
        <Pressable
          style={selectGAP ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectGAP(!selectGAP)}
        >
          <Text style={styles.label}>GAP</Text>
        </Pressable>
        <Pressable
          style={selectZumba ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectZumba(!selectZumba)}
        >
          <Text style={styles.label}>Zumba</Text>
        </Pressable>
        <Pressable
          style={selectBox ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectBox(!selectBox)}
        >
          <Text style={styles.label}>Box</Text>
        </Pressable>
        <Pressable
          style={selectCrossFit ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectCrossFit(!selectCrossFit)}
        >
          <Text style={styles.label}>CrossFit </Text>
        </Pressable>
        <Pressable
          style={selectGym ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectGym(!selectGym)}
        >
          <Text style={styles.label}>Gym</Text>
        </Pressable>
        <Pressable
          style={selectYoga ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectYoga(!selectYoga)}
        >
          <Text style={styles.label}>Yoga</Text>
        </Pressable>
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
    marginBottom: 30,
    textAlign: 'center',
    width: '85%',
  },

  objectives: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 2,
  },

  checkboxSelected: {
    width: 'auto',
    height: 42,
    backgroundColor: 'rgba(4, 150, 255, 0.5)',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0496FF',
    paddingHorizontal: 20,
    marginRight: 5,
  },

  checkboxUnselected: {
    width: 'auto',
    height: 42,
    backgroundColor: '#ECECEC',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    marginRight: 5,
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
