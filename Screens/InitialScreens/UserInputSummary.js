import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
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
      <Text style={styles.title}>Tu rutina se ha completado</Text>
      <Text style={styles.label}>Da click en finalizar para visualizar tu rutina</Text>
      <Image
        style={styles.image}
        source={require('../../assets/icon.png')}
      />
      <Pressable
        style={styles.btn}
        onPress={() => saveUserInput()}
      >
        <Text style={styles.btnText}>Finalizar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 38,
    fontWeight: 'semibold',
    color: 'white',
    marginBottom: 20,
    marginTop: 0,
    textAlign: 'center',
    width: '85%',
  },

  label: {
    fontSize: 14,
    color: '#f1f1f1',
    width: '80%',
    textAlign: 'center',
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
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 30,
  }
});
