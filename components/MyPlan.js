import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import PreviewWorkout from './PreviewWorkout';

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

export default function MyPlan({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.plan}>
        <Text style={{ color: '#fff', fontSize: 20, marginTop: 20 }}>What muscle group are we training today?</Text>
        <View style={{ flexDirection: 'column', marginTop: 20, width: '90%' }}>
          <PreviewWorkout routine={routines[ 0 ]} />
          <PreviewWorkout routine={routines[ 1 ]} />
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
  },

  plan: {
    width: '100%',
    backgroundColor: '#0b0b0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 16,
  },
});