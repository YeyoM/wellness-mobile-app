import React, { useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'

import Accordion from '../components/AccordionWorkout'

import ErrorNotification from '../components/ErrorNotification'

import { getRoutines } from '../firebaseFunctions.js'
import { FIREBASE_AUTH } from '../firebaseConfig.js'

export default function SavedRoutines({ navigation }) {

  const [routines, setRoutines] = useState(null) 
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {

    // get the user id, to get the user's routines   
    const user = FIREBASE_AUTH.currentUser

    if (user) {
      setUser(user)
    }

    else {
      navigation.navigate('Login')
    }

    // get the user's routines
    getRoutines(user.uid, setRoutines, setError, setLoading)
  }
  , [])

  return (
    <View style={styles.container}>
      {error ? <ErrorNotification error="Couldn't get your routines" /> : null}
      <ScrollView style={{ width: '100%', marginTop: Constants.statusBarHeight }}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between' }}>
            <TextInput
              placeholder='Search'
              placeholderTextColor='rgba(147, 146, 154, 1)'
              style={{
                height: 50,
                borderWidth: 0,
                borderRadius: 14,
                paddingHorizontal: 20,
                backgroundColor: '#1F1F1F',
                color: '#fff',
                width: '84%',
                marginBottom: 20,
              }}
            />
            <Pressable style={styles.button}>
              <Ionicons name='filter-outline' size={30} color='#0496FF' />
            </Pressable>
          </View>
          <Pressable style={styles.createContainer} onPress={() => navigation.navigate('Add Routine')}>
            <Text style={styles.create}>Add new routine</Text>
            <Ionicons name='create-outline' size={30} color='#0496FF' />
          </Pressable>
          {
            loading && <ActivityIndicator size='large' color='#fff' style={{ marginTop: 20 }} />
          }

          {
            routines !== null && routines.length === 0 
            ? <Text style={{ color: '#fff', fontSize: 20 }}>You don't have any routines yet</Text>
            : routines && routines.map((routine, index) => {
              return (
                <Accordion key={index} routine_={routine} navigation={navigation} />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  createContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#24262B',
    padding: 10,
    borderRadius: 14,
  },

  create: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 30,
  },

  button: {
    height: 50,
    width: "15%",
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
})
