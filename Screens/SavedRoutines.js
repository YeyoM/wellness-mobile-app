import React from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'

import Accordion from '../components/AccordionWorkout'

const routines = [
  {
    routineName: 'Push Day',
    duration: '70',
    calories: '100',
    sets: '12',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd5bXxlbnwwfHwwfHx8MA%3D%3D',
    exercises: [
      {
        exerciseName: 'Push Up',
        sets: '4',
        reps: '10',
        weight: '0',
      },
      {
        exerciseName: 'Bench Press',
        sets: '4',
        reps: '10',
        weight: '0',
      },
      {
        exerciseName: 'Overhead Press',
        sets: '4',
        reps: '10',
        weight: '0',
      },
    ],
  },
  {
    routineName: 'Leg Day',
    duration: '70',
    calories: '100',
    sets: '12',
    image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNxdWF0fGVufDB8fDB8fHww',
    exercises: [
      {
        exerciseName: 'Squat',
        sets: '4',
        reps: '10',
        weight: '0',
      },
      {
        exerciseName: 'Lunge',
        sets: '4',
        reps: '10',
        weight: '0',
      },
      {
        exerciseName: 'Deadlift',
        sets: '4',
        reps: '10',
        weight: '0',
      },
    ],
  }
]


export default function SavedRoutines() {
  return (
    <View style={styles.container}>
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
          <Pressable style={styles.createContainer}>
            <Text style={styles.create}>Add new routine</Text>
            <Ionicons name='create-outline' size={30} color='#0496FF' />
          </Pressable>
          {routines.map((routine, index) => (
            <Accordion routine={routine} key={index} />
          ))}
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