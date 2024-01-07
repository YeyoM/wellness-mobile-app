import React from "react"
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"

import { useState } from "react"

import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'

export default function EditNewRoutine({ route, navigation }) {

  const { routine } = route.params;

  const [ routine_, setRoutine_ ] = useState(routine);
  const [ routineName, setRoutineName ] = useState(routine.name);


  return (
    <View style={styles.container}>
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
        <View style={{ width: '100%', minHeight: 600, backgroundColor: '#0B0B0B', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20 }}>
          {/*aqui la parte de abajo (editar nombre dia y agregar ejercicios)*/}
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Monday</Text>
            <Pressable onPress={() => navigation.navigate('Edit Day', { day: { name: 'Monday', exercises: [] } })}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.containerExercises}>
            <ScrollView style={{ width: '100%', minHeight: 600 }}>
              <View style={styles.exercises}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>Exercises</Text>
                
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
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
    marginBottom: 100,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 16,
  },
})
