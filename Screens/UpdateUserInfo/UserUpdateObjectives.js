import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopNavigationBar from '../../components/TopNavigationBar';

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export default function UserUpdateObjectives({ route, navigation }) {

  const { objectives_ } = route.params;

  const [selectFormaFisica, setSelectFormaFisica] = useState(false);
  const [selectQuemarGrasa, setSelectQuemarGrasa] = useState(false);
  const [selectDesarrollarMusculo, setSelectDesarrollarMusculo] = useState(false);
  const [selectAumentarResistencia, setSelectAumentarResistencia] = useState(false);
  const [selectFortalecerMente, setSelectFortalecerMente] = useState(false);
  const [selectPerdidaPeso, setSelectPerdidaPeso] = useState(false);
  const [selectManejarEstes, setSelectManejarEstes] = useState(false);
  const [selectFlexibilidad, setSelectFlexibilidad] = useState(false);
  const [selectOptimizarEntrenamientos, setSelectOptimizarEntrenamientos] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (objectives_.includes('Mejorar mi forma física')) {
      setSelectFormaFisica(true);
    }

    if (objectives_.includes('Quemar grasa')) {
      setSelectQuemarGrasa(true);
    }

    if (objectives_.includes('Desarrollar músculo')) {
      setSelectDesarrollarMusculo(true);
    }

    if (objectives_.includes('Aumentar resistencia')) {
      setSelectAumentarResistencia(true);
    }

    if (objectives_.includes('Fortalecer la mente')) {
      setSelectFortalecerMente(true);
    }

    if (objectives_.includes('Pérdida de peso')) {
      setSelectPerdidaPeso(true);
    }

    if (objectives_.includes('Manejar el estés')) {
      setSelectManejarEstes(true);
    }

    if (objectives_.includes('Flexibilidad')) {
      setSelectFlexibilidad(true);
    }

    if (objectives_.includes('Optimizar mis entrenamientos')) {
      setSelectOptimizarEntrenamientos(true);
    }
  }, []);

  const handleGuardar = async () => {
    if (!selectFormaFisica && !selectQuemarGrasa && !selectDesarrollarMusculo && !selectAumentarResistencia && !selectFortalecerMente && !selectPerdidaPeso && !selectManejarEstes && !selectFlexibilidad && !selectOptimizarEntrenamientos) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona al menos un objetivo');
      return;
    }

    let objectives = [];

    if (selectFormaFisica) {
      objectives.push('Mejorar mi forma física');
    }

    if (selectQuemarGrasa) {
      objectives.push('Quemar grasa');
    }

    if (selectDesarrollarMusculo) {
      objectives.push('Desarrollar músculo');
    }

    if (selectAumentarResistencia) {
      objectives.push('Aumentar resistencia');
    }

    if (selectFortalecerMente) {
      objectives.push('Fortalecer la mente');
    }

    if (selectPerdidaPeso) {
      objectives.push('Pérdida de peso');
    }

    if (selectManejarEstes) {
      objectives.push('Manejar el estés');
    }

    if (selectFlexibilidad) {
      objectives.push('Flexibilidad');
    }

    if (selectOptimizarEntrenamientos) {
      objectives.push('Optimizar mis entrenamientos');
    }

    setLoading("Guardando...");

    const userId = FIREBASE_AUTH.currentUser.uid;

    const docRef = doc(FIRESTORE, 'users', userId);

    try {
      await setDoc(docRef, {
        objectives: objectives,
      }, { merge: true });

      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 2000);
      setSuccess('Objetivos actualizados correctamente');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Error al actualizar los objetivos');
    }

  }

  const handleCancelar = () => {
    // go back
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Actualizar objetivos'} back={false}/>
      { error && <ErrorNotification message={error} /> }
      { success && <SuccessNotification message={success} /> }
      { loading && <PrimaryNotification message={loading} /> }
      <Text style={styles.title}>¿Cuales son tus objetivos?</Text>
      <View style={styles.objectives}>
        <Pressable
          style={selectFormaFisica ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectFormaFisica(!selectFormaFisica)}
        >
          <Text style={styles.label}>Mejorar mi forma física </Text>
        </Pressable>
        <Pressable
          style={selectQuemarGrasa ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectQuemarGrasa(!selectQuemarGrasa)}
        >
          <Text style={styles.label}>Quemar grasa </Text>
        </Pressable>
        <Pressable
          style={selectDesarrollarMusculo ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectDesarrollarMusculo(!selectDesarrollarMusculo)}
        >
          <Text style={styles.label}>Desarrollar músculo </Text>
        </Pressable>
        <Pressable
          style={selectAumentarResistencia ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectAumentarResistencia(!selectAumentarResistencia)}
        >
          <Text style={styles.label}>Aumentar resistencia </Text>
        </Pressable>
        <Pressable
          style={selectFortalecerMente ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectFortalecerMente(!selectFortalecerMente)}
        >
          <Text style={styles.label}>Fortalecer la mente </Text>
        </Pressable>
        <Pressable
          style={selectPerdidaPeso ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectPerdidaPeso(!selectPerdidaPeso)}
        >
          <Text style={styles.label}>Pérdida de peso</Text>
        </Pressable>
        <Pressable
          style={selectManejarEstes ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectManejarEstes(!selectManejarEstes)}
        >
          <Text style={styles.label}>Manejar el estés</Text>
        </Pressable>
        <Pressable
          style={selectFlexibilidad ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectFlexibilidad(!selectFlexibilidad)}
        >
          <Text style={styles.label}>Flexibilidad </Text>
        </Pressable>
        <Pressable
          style={selectOptimizarEntrenamientos ? styles.checkboxSelected : styles.checkboxUnselected}
          onPress={() => setSelectOptimizarEntrenamientos(!selectOptimizarEntrenamientos)}
        >
          <Text style={styles.label}>Optimizar mis entrenamientos</Text>
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
