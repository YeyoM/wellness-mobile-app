import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import TopNavigationBar from '../components/TopNavigationBar';

import { InitialScreensContext } from '../context/InitialScreensContext';

export default function UserInputSummary({ navigation }) {

  const {
    name, 
    gender,
    birthDate,
    preferredSystem,
    initialWeight,
    goalWeight,
    height,
    objectives,
    exercises,
    exerciseFrequency,
    exerciseDays,
    reminders,
    exerciseDuration,
    fitnessLevel,
    activityLevel
  } = useContext(InitialScreensContext);

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Tu Resumen'} progress={1} back={true}/>
      <Text style={styles.title}>Resumen</Text>
      <Text style={styles.summary}>Nombre: {name}</Text>
      <Text style={styles.summary}>Genero: {gender}</Text>
      <Text style={styles.summary}>Fecha de nacimiento: {birthDate}</Text>
      <Text style={styles.summary}>Sistema de unidades: {preferredSystem}</Text>
      <Text style={styles.summary}>Peso inicial: {initialWeight}</Text>
      <Text style={styles.summary}>Peso objetivo: {goalWeight}</Text>
      <Text style={styles.summary}>Altura: {height}</Text>
      <Text style={styles.summary}>Objetivos: {objectives}</Text>
      <Text style={styles.summary}>Ejercicios: {exercises}</Text>
      <Text style={styles.summary}>Frecuencia de ejercicio: {exerciseFrequency}</Text>
      <Text style={styles.summary}>Días de ejercicio: {exerciseDays}</Text>
      <Text style={styles.summary}>Recordatorios: {reminders}</Text>
      <Text style={styles.summary}>Duración del ejercicio: {exerciseDuration}</Text>
      <Text style={styles.summary}>Nivel de fitness: {fitnessLevel}</Text>
      <Text style={styles.summary}>Nivel de actividad: {activityLevel}</Text>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}
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
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    color: 'black',
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
    width: '85%',
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

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 4,
  }
});
