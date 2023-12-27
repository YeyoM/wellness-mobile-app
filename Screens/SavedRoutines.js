import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Accordion from '../components/AccordionWorkout'

const routines = [
  {
    routineName: 'Push Day',
    duration: '70',
    calories: '100',
    sets: '12',
    image: '../assets/push_day.png',
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
    image: '../assets/leg_day.png',
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
      <ScrollView style={{ width: '100%', marginTop: 70 }}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View style={styles.createContainer}>
            <Text style={styles.create}>Create Routine</Text>
            <Ionicons name='add-circle-outline' size={30} color='#0496FF' />
          </View>
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
    backgroundColor: '#323743',
    padding: 10,
    borderRadius: 14,
  },

  create: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 30,
  }
})