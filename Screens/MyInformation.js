
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import TopNavigationBar from '../components/TopNavigationBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FIRESTORE, FIREBASE_AUTH } from '../firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';

import ErrorNotification from '../components/ErrorNotification';
import PrimaryNotification from '../components/PrimaryNotification';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyInformation({ navigation }) {

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ userData, setUserData ] = useState(null);

  useEffect(() => {

    setLoading(true);

    const unsubscribe = navigation.addListener('focus', async () => {
      const docRef = doc(FIRESTORE, 'users', FIREBASE_AUTH.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setError('No se encontró información del usuario');
      }

      setLoading(false);
    });

    return unsubscribe;

  }, [ navigation ]);

  {
    /**
     Document data: 
      {
        "activityLevel": "Moderadamente activo", 
        "birthDate": "25/2/2003", 
        "email": "yeyo@gmail.com", 
        "exercises": ["HIIT", "CrossFit", "Gym"], 
        "fitnessLevel": "Intermedio", 
        "gender": "Hombre", 
        "goalWeight": "70", 
        "height": "172", 
        "initialWeight": "60", 
        "name": "Yeyo", 
        "objectives": ["Mejorar mi forma física", "Desarrollar músculo", "Aumentar resistencia", "Fortalecer la mente", "Manejar el estés", "Flexibilidad", "Optimizar mis entrenamientos"], 
        "preferredSystem": "Metrico", 
        "reminder": false, 
        "trainingDays": ["Lunes", "Martes", "Jueves", "Viernes"], 
        "trainingDuration": "1h 30min", 
        "trainingFrequency": 4
      }
    */
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {error && <ErrorNotification message={error} />}
      {loading && <PrimaryNotification message={'Cargando...'} />}
      <TopNavigationBar navigation={navigation} actualScreen={'Tu información'} previousScreen={'Main Tabs'} backArrow={true} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          <Pressable>
            <Image source={require('../assets/edit.png')} style={{ width: 0, height: 0, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Nombre: {userData && userData.name}
        </Text>
        <Text style={styles.text}>
          <Pressable>
            <Image source={require('../assets/edit.png')} style={{ width: 0, height: 0, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Email: {userData && userData.email}
        </Text>
        <Text style={styles.text}>
          <Pressable>
            <Image source={require('../assets/edit.png')} style={{ width: 0, height: 0, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Fecha de nacimiento: {userData && userData.birthDate}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Sistema de preferencia)',
                params: {
                  system: userData && userData.preferredSystem
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Sistema de unidades: {userData && userData.preferredSystem}
        </Text>
        <Text style={styles.text}>
          <Pressable>
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Peso actual: {userData && userData.initialWeight}{userData && userData.preferredSystem === 'Metrico' ? 'kg' : 'lb'}
        </Text>
        <Text style={styles.text}>
          <Pressable>
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Peso objetivo: {userData && userData.goalWeight}{userData && userData.preferredSystem === 'Metrico' ? 'kg' : 'lb'}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Altura)',
                params: {
                  height_: userData && userData.height,
                  system: userData && userData.preferredSystem
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Altura: {userData && userData.height}{userData && userData.preferredSystem === 'Metrico' ? 'cm' : 'in'}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Objetivos)',
                params: {
                  objectives_: userData && userData.objectives
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Objetivos: {userData && userData.objectives.join(', ')}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Ejercicios)',
                params: {
                  exercises: userData && userData.exercises
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginRight: 8, marginTop: 11 }} />
          </Pressable>
          Ejercicios: {userData && userData.exercises.join(', ')}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Frecuencia)',
                params: {
                  exerciseFrequency: userData && userData.trainingFrequency,
                  reminder_: userData && userData.reminder
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Frecuencia de entrenamiento: {userData && userData.trainingFrequency} veces por semana
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Días)',
                params: {
                  exerciseDays: userData && userData.trainingDays,
                  reminder_: userData && userData.reminder
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Días de entrenamiento: {userData && userData.trainingDays.join(', ')}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Días)',
                params: {
                  exerciseDays: userData && userData.trainingDays,
                  reminder_: userData && userData.reminder
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Recordatorios: {userData && userData.reminder ? 'Si' : 'No'}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Hora)',
                params: {
                  exerciseTime: userData && userData.trainingDuration
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Duración del entrenamiento: {userData && userData.trainingDuration}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Nivel de fitness)',
                params: {
                  fitnessLevel: userData && userData.fitnessLevel
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Nivel de fitness: {userData && userData.fitnessLevel}
        </Text>
        <Text style={styles.text}>
          <Pressable onPress={
            () => navigation.navigate(
              'User Update',
              {
                screen: 'Actualizar información (Activo)',
                params: {
                  activityLevel: userData && userData.activityLevel
                }
              }
            )}
          >
            <Image source={require('../assets/edit.png')} style={{ width: 15, height: 15, marginTop: 11, marginRight: 8 }} />
          </Pressable>
          Nivel de actividad: {userData && userData.activityLevel}
        </Text>
      </ScrollView>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  scrollView: {
    width: '80%',
    marginTop: 100,
  },

  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 5,
    marginTop: 0,
    textAlign: 'left',
    width: '100%',
  },

});