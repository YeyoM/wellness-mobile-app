import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import TopNavigationBar from '../../components/TopNavigationBar';

import { InitialScreensContext } from '../../context/InitialScreensContext';

import { FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

import ErrorNotification from '../../components/ErrorNotification';
import SuccessNotification from '../../components/SuccessNotification';
import PrimaryNotification from '../../components/PrimaryNotification';

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

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const saveUserInput = async () => {
    // get the user id
    const userId = FIREBASE_AUTH.currentUser.uid;
    const email = FIREBASE_AUTH.currentUser.email;

    if (!userId) {
      console.log('No user id found');
      return;
    }

    if (!email) {
      console.log('No user email found');
      return;
    }

    // show the loading indicator
    setLoading(true);

    try {
      // save the user input to the database
      await setDoc(doc(FIRESTORE, "users", userId), {
        email: email,
        name: name,
        preferredSystem: preferredSystem,
        gender: gender,
        birthDate: birthDate,
        initialWeight: initialWeight,
        goalWeight: goalWeight,
        height: height,
        objectives: objectives,
        exercises: exercises,
        trainingFrequency: exerciseFrequency,
        trainingDays: exerciseDays,
        reminder: reminders,
        trainingDuration: exerciseDuration,
        fitnessLevel: fitnessLevel,
        activityLevel: activityLevel,
      })
      // hide the loading indicator
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('Main Tabs');
      }, 2000);
      setSuccess(true);
      // navigate to the home screen
      console.log('User input saved');
    } catch (error) {
      // hide the loading indicator
      setLoading(false);
      // show the error notification
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Hubo un error al guardar tu información');
      console.log(error);
    }

  }

  return (
    <View style={styles.container}>
      { error && <ErrorNotification message={error} /> }
      { loading && <PrimaryNotification message={'Guardando tu información'} /> }
      { success && <SuccessNotification message={'Tu información se guardó correctamente'} /> }
      <TopNavigationBar navigation={navigation} actualScreen={'Tu Resumen'} progress={1} back={true} />
      <Text style={styles.title}>Tu resumen</Text>
      <Text style={styles.summaryLabel}>Nombre: <Text style={styles.summaryContent}>{name}</Text></Text>
      <Text style={styles.summaryLabel}>Genero: <Text style={styles.summaryContent}>{gender}</Text></Text>
      <Text style={styles.summaryLabel}>Fecha de nacimiento: <Text style={styles.summaryContent}>{birthDate}</Text></Text>
      <Text style={styles.summaryLabel}>Sistema de unidades: <Text style={styles.summaryContent}>{preferredSystem}</Text></Text>
      <Text style={styles.summaryLabel}>Peso inicial: <Text style={styles.summaryContent}>{initialWeight}{preferredSystem === 'Metrico' ? 'kg' : 'lb'}</Text></Text>
      <Text style={styles.summaryLabel}>Peso objetivo: <Text style={styles.summaryContent}>{goalWeight}{preferredSystem === 'Metrico' ? 'kg' : 'lb'}</Text></Text>
      <Text style={styles.summaryLabel}>Altura: <Text style={styles.summaryContent}>{height}{preferredSystem === 'Metrico' ? 'cm' : 'in'}</Text></Text>
      <Text style={styles.summaryLabel}>Objetivos: <Text style={styles.summaryContent}>{objectives.join(', ')}</Text></Text>
      <Text style={styles.summaryLabel}>Ejercicios: <Text style={styles.summaryContent}>{exercises.join(', ')}</Text></Text>
      <Text style={styles.summaryLabel}>Frecuencia de ejercicio: <Text style={styles.summaryContent}>{exerciseFrequency} dias por semana</Text></Text>
      <Text style={styles.summaryLabel}>Días de ejercicio: <Text style={styles.summaryContent}>{exerciseDays.join(', ')}</Text></Text>
      <Text style={styles.summaryLabel}>Recordatorios: <Text style={styles.summaryContent}>{reminders ? 'Si' : 'No'}</Text></Text>
      <Text style={styles.summaryLabel}>Duración del ejercicio: <Text style={styles.summaryContent}>{exerciseDuration}</Text></Text>
      <Text style={styles.summaryLabel}>Nivel de fitness: <Text style={styles.summaryContent}>{fitnessLevel}</Text></Text>
      <Text style={styles.summaryLabel}>Nivel de actividad: <Text style={styles.summaryContent}>{activityLevel}</Text></Text>
      <Pressable
        style={styles.btn}
        onPress={() => saveUserInput()}
      >
        <Text style={styles.btnText}>Guardar y continuar</Text>
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
    marginBottom: 20,
    marginTop: 0,
    textAlign: 'center',
    width: '85%',
  },

  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    marginTop: 0,
    textAlign: 'left',
    width: '80%',
  },

  summaryContent: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 5,
    marginTop: 0,
    textAlign: 'left',
    width: '80%',
  },

  btn: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 16,
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
