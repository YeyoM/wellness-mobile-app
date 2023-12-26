import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { FIREBASE_AUTH } from '../firebaseConfig'
import { FIRESTORE } from '../firebaseConfig'

import { doc, getDoc } from 'firebase/firestore'

import PrimaryNotification from '../components/PrimaryNotification'

export default function Home ({ navigation }) {

  const [message, setMessage] = useState(false)

  // Check if the user has registered their initial information
  // on the database (/users/{userId}) and if not, redirect them
  // to the initial screens

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser.uid

    const docRef = doc(FIRESTORE, 'users', userId)

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // console.log('Document data:', docSnap.data())
          setMessage(false)
        } else {
          setMessage(true)
          setTimeout(() => {
            setMessage(false)
            navigation.navigate('User Input')
          }, 3000)
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  })

  return (
    <View style={styles.container}>
      {message && <PrimaryNotification message='Por favor, completa tu información inicial, redirigiendo...' />}
      <Text style={styles.text}>Home</Text>
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
    justifyContent: 'center'
  }
})
