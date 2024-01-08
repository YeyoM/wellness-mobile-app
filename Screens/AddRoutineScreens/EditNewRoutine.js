import React, { useEffect } from "react"
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native"
import { useState } from "react"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'

import CarouselDays from "../../components/CarouselDays"
import EditingRoutineExerciseList from "../../components/EditingRoutineExerciseList"

export default function EditNewRoutine({ route, navigation }) {

  // const { routine } = route.params;

  const routine = {
    name: 'My new routine',
    numberOfDays: 4,
    days: [
      {
        name: 'Push Day',
        exercises: [
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
        ],
      },
      {
        name: 'Push Day 2',
        exercises: [
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
        ],
      },
      {
        name: 'Push Day 3',
        exercises: [
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
        ],
      },
      {
        name: 'Push Day 4',
        exercises: [
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
          {
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 50,
            rest: 60,
          },
        ],
      },
    ],
  }

  const [ routine_, setRoutine_ ] = useState(routine);
  const [ routineName, setRoutineName ] = useState(routine.name);

  const [ currentDay, setCurrentDay ] = useState(0);

  useEffect(() => {
    setRoutineName(routine_.name);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.home}>
        {/*aqui la parte de arriba*/}
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.navigate('Home')} style={{ position: 'absolute', top: -5, left: 20, height: 36, width: 36, zIndex: 999, backgroundColor: "#131417", borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <Text style={styles.title}>{routineName}</Text>
            <Ionicons name="pencil-outline" size={16} color="white" style={{ marginLeft: 5 }} />
          </View>
        </View>
        {/* Carrousel de los dias */}
        <CarouselDays currentDay={currentDay} setCurrentDay={setCurrentDay} />
        <View style={{ width: '100%', minHeight: 600, backgroundColor: '#0B0B0B', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20, paddingTop: 16 }}>
          {/*aqui la parte de abajo (editar nombre dia y agregar ejercicios)*/}
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 20 }}>
            <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{routine_.days[ currentDay ].name}</Text>
              <Ionicons name="pencil-outline" size={20} color="white" style={{ marginLeft: 5 }} />
            </View>
            <Pressable style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Ionicons name="add-outline" size={34} color="white" />
              <Text style={{ color: '#9095A1', fontSize: 10, textAlign: 'center' }}>Add Lift</Text>
            </Pressable>
          </View>
          <View style={styles.containerExercises}>
            <ScrollView style={{ width: '100%', minHeight: 600 }}>
              <View style={styles.exercises}>
                <EditingRoutineExerciseList />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24262B',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },

  home: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    top: 0,
    zIndex: 900,
    backgroundColor: '#24262B',
  },

  title: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
  },

  containerExercises: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  exercises: {
    width: '100%',
    backgroundColor: '#0b0b0b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
})
