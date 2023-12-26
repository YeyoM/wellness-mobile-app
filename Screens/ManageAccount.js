import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { signOut } from 'firebase/auth';

import SuccessNotification from '../components/SuccessNotification';
import ErrorNotification from '../components/ErrorNotification';
import PrimaryNotification from '../components/PrimaryNotification';

export default function ManageAccount ({ navigation }) {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setSuccess('Cerrando sesión...');
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setError('Hubo un error al cerrar sesión');
    }
  }

  return (
    <View style={styles.container}>
      {success && <SuccessNotification message={success} />}
      {error && <ErrorNotification message={error} />}
      {loading && <PrimaryNotification message={loading} />}
      <Pressable onPress={handleSignOut} style={styles.button}>
        <Text style={{ color: 'white' }}>Salir de la cuenta</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate(routeName='User Information')} style={styles.button}>
        <Text style={{ color: 'white' }}>Mi información</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 20,
  },

  button: {
    width: '85%',
    height: 48,
    backgroundColor: '#0496FF',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  }
})