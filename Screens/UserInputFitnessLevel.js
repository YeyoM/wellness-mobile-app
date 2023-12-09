import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import TopNavigationBar from '../components/TopNavigationBar';

import ErrorNotification from '../components/ErrorNotification';

export default function UserInputFitnessLevel({ navigation }) {

  const [selectPrincipiante, setSelectPrincipiante] = useState(false);
  const [selectIntermedio, setSelectIntermedio] = useState(false);
  const [selectAvanzado, setSelectAvanzado] = useState(false);

  const [error, setError] = useState(false);

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

  const handleContinue = () => {
    if (!selectPrincipiante && !selectIntermedio && !selectAvanzado) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona tu nivel de fitness');
      return;
    }
    navigation.navigate('Acerca de ti (Activo)');
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Acerca de ti'} progress={0.836} back={true}/>
      { error && <ErrorNotification message={error} /> }
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
        style={styles.btn}
        onPress={handleContinue}
      >
        <Text style={styles.btnText}>Continuar</Text>
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
    marginTop: 60,
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
