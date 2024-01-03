
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { FIRESTORE, FIREBASE_AUTH } from '../firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';

import ErrorNotification from '../components/ErrorNotification';
import PrimaryNotification from '../components/PrimaryNotification';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyGoals({ navigation }) {

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
        console.log(docSnap.data());
      } else {
        setError('No se encontró información del usuario');
      }

      setLoading(false);
    });

    return unsubscribe;

  }, [ navigation ]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {error && <ErrorNotification message={error} />}
      {loading && <PrimaryNotification message={'Cargando...'} />}
      <ScrollView style={styles.scrollView}>
        <Ionicons name="ribbon-outline" size={100} color="white" style={{ alignSelf: 'center', marginBottom: 20, marginTop: 70 }} />
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, textAlign: 'center' }}>{userData && userData.name}</Text>
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingHorizontal: 30, paddingVertical: 10, borderColor: '#b0b0b0', borderWidth: 1, borderRightColor: '#000', borderLeftColor: '#000' }}>
          <Text style={{ color: '#b0b0b0', fontSize: 16 }}>Goal Weight</Text>
          <Text style={{ color: 'white', fontSize: 22 }}>{userData && userData.goalWeight} { userData && userData.preferredSystem ? 'lbs' : 'kg' }</Text>
        </View>
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingHorizontal: 30, paddingVertical: 10, borderColor: '#b0b0b0', borderWidth: 1, borderRightColor: '#000', borderLeftColor: '#000' }}>
          <Text style={{ color: '#b0b0b0', fontSize: 16 }}>Goal Body Fat %</Text>
          <Text style={{ color: 'white', fontSize: 22 }}>12%</Text>
        </View>
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingHorizontal: 30, paddingVertical: 10, borderColor: '#b0b0b0', borderWidth: 1, borderRightColor: '#000', borderLeftColor: '#000' }}>
          <Text style={{ color: '#b0b0b0', fontSize: 16 }}>Goal Timeframe</Text>
          <Text style={{ color: 'white', fontSize: 22 }}>6 months</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routeName='Edit Goals')} style={{ alignSelf: 'center' ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 60, backgroundColor: '#0496FF', width: '90%', paddingVertical: 16, borderRadius: 24 }}>
          <Text style={{ color: 'white' }}>Edit Goals</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
  },

  scrollView: {
    width: '100%',
    marginTop: 0,
  },

  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    marginBottom: 5,
    marginTop: 0,
    textAlign: 'left',
    width: '100%',
  },

});