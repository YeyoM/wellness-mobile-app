import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import PreviewWorkout from './PreviewWorkout';

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

  console.log(navigation)

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.plan}>
        <Text style={{ color: '#fff', fontSize: 20, marginTop: 20 }}>What muscle group are we training today?</Text>
        <View style={{ flexDirection: 'column', marginTop: 20, width: '90%' }}>
          <PreviewWorkout routine={routines[ 0 ]} navigation={navigation} />
          <PreviewWorkout routine={routines[ 1 ]} navigation={navigation} />
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