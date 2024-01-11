import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native"

import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'

const lifts = [
  {
    id: Math.random(),
    name: 'Bench Press',
    reps: 10,
    sets: 3,
    weight: 100,
    rest: 60,
  },
  {
    id: Math.random(),
    name: 'Leg Press',
    reps: 10,
    sets: 3,
    weight: 100,
    rest: 60,
  },
  {
    id: Math.random(),
    name: 'Lateral raises',
    reps: 10,
    sets: 3,
    weight: 100,
    rest: 60,
  },
]

export default function AddLift({ route, navigation }) {

  if (route.params === undefined) {
    navigation.navigate('Home');
    return null;
  }

  const { routine, setRoutine, currentDay } = route.params;

  if (!routine || !setRoutine || currentDay === undefined) {
    navigation.navigate('Home');
    return null;
  }

  const handleAddLift = ({ lift }) => {
    // add lift to the exercise list of the current day
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].exercises.push(lift);
      return newRoutine;
    });

    // go back to the previous screen
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <View style={styles.home}>
        {/*aqui la parte de arriba*/}
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: -5, left: 20, height: 36, width: 36, zIndex: 999, backgroundColor: "#131417", borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
          <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
            <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#4A4A4B", padding: 14, borderRadius: 20, marginBottom: 10 }}>
              <Ionicons name="barbell-outline" size={36} color="white" />
            </View>
            <Text style={styles.title}>Find a Lift</Text>
          </View>
        </View>
        <View style={{ width: '100%', minHeight: 600, backgroundColor: '#0B0B0B', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20, paddingTop: 16 }}>
          <View style={styles.containerExercises}>
            <ScrollView style={{ width: '100%', minHeight: 600 }}>
              <View style={styles.exercises}>
                <TextInput
                  style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginBottom: 20, backgroundColor: '#4A4A4B', padding: 14, borderRadius: 20 }}
                  placeholder="Search for a lift"
                />
                {/** Example lifts*/}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: '#313231', padding: 14, borderRadius: 20 }}>
                  <Pressable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#157AFF', padding: 14, borderRadius: 20, width: 80 }}
                    onPress={() => handleAddLift({ lift: lifts[0] })}
                  >
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Add</Text>
                    <Ionicons name="add-outline" size={26} color="white" />
                  </Pressable>
                  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', width: '48%' }}>Bench Press</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Workout')}>
                      <Ionicons name="play-circle-outline" size={32} color="white" />
                    </Pressable>
                    <Text style={{ color: '#a0a0a0', fontSize: 12, marginTop: 0 }}>Tutorial</Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: '#313231', padding: 14, borderRadius: 20 }}>
                  <Pressable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#157AFF', padding: 14, borderRadius: 20, width: 80 }}
                    onPress={() => handleAddLift({ lift: lifts[1] })}
                  >
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Add</Text>
                    <Ionicons name="add-outline" size={26} color="white" />
                  </Pressable>
                  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', width: '48%' }}>Leg Press</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Workout')}>
                      <Ionicons name="play-circle-outline" size={32} color="white" />
                    </Pressable>
                    <Text style={{ color: '#a0a0a0', fontSize: 12, marginTop: 0 }}>Tutorial</Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: '#313231', padding: 14, borderRadius: 20 }}>
                  <Pressable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#157AFF', padding: 14, borderRadius: 20, width: 80 }}
                    onPress={() => handleAddLift({ lift: lifts[2] })}
                  >
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Add</Text>
                    <Ionicons name="add-outline" size={26} color="white" />
                  </Pressable>
                  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', width: '48%' }}>Lateral raises</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Workout')}>
                      <Ionicons name="play-circle-outline" size={32} color="white" />
                    </Pressable>
                    <Text style={{ color: '#a0a0a0', fontSize: 12, marginTop: 0 }}>Tutorial</Text>
                  </View>
                </View>
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
    marginBottom: 20,
    top: 0,
    zIndex: 900,
    backgroundColor: '#24262B',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
    marginBottom: 60,
    padding: 20
  },
})
