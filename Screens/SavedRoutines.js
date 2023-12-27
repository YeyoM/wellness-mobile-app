import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Accordion from '../components/AccordionWorkout'

const routines = [
  {
    routineName: 'Push Day',
    duration: '70',
    calories: '100',
    sets: '12',
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
]

export default function SavedRoutines () {
  return (
    <View style={styles.container}>
      <Accordion routine={routines[0]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF'
  }
})