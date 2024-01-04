import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import DraggableFlatList, {
  ScaleDecorator, NestableDraggableFlatList, NestableScrollContainer
} from "react-native-draggable-flatlist"; import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

import CurrentExercise from '../components/CurrentExercise'

import { useState } from 'react'

export default function WorkoutInProgress({ route, navigation }) {

  const { routine } = route.params

  /**
   * {"calories": "100", "duration": "70", "exercises": [{"exerciseName": "Push Up", "reps": "10", "sets": "4", "weight": "0"}, {"exerciseName": "Bench Press", "reps": "10", "sets": "4", "weight": "0"}, {"exerciseName": "Overhead Press", "reps": "10", "sets": "4", "weight": "0"}], "image": "../assets/push_day.png", "routineName": "Push Day", "sets": "12"}
   */

  console.log(routine)

  const [ currentExercise, setCurrentExercise ] = useState(routine.exercises[ 0 ])
  const [ currentExerciseIndex, setCurrentExerciseIndex ] = useState(0)
  const [ currentExerciseReps, setCurrentExerciseReps ] = useState(routine.exercises[ 0 ].reps)
  const [ currentExerciseSets, setCurrentExerciseSets ] = useState(routine.exercises[ 0 ].sets)
  const [ currentExerciseWeight, setCurrentExerciseWeight ] = useState(routine.exercises[ 0 ].weight)

  const [ numberOfExercises, setNumberOfExercises ] = useState(routine.exercises.length)
  const [ exercises, setExercises ] = useState(routine.exercises)

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator activeScale={0.95} inactiveScale={1}>
        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: "#0b0b0b",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#fff",
            borderLeftWidth: 0,
            borderRightWidth: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
          }}
          onLongPress={drag}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {item.exerciseName}
          </Text>
          <Ionicons name="reorder-three-outline" size={50} color="white" />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.workout}>
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={55} color="white" />
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.headerText}>Total Time</Text>
              <Text style={styles.headerText_}>00:00</Text>
            </View>
            <Image source={require('../assets/icon.png')} style={{ width: 70, height: 70 }} />
          </View>
          <Text style={{ color: 'white', fontSize: 24, marginVertical: 30 }}>Workout session in progress</Text>
          <CurrentExercise exercise={currentExercise.exerciseName} reps={currentExerciseReps} sets={currentExerciseSets} weight={currentExerciseWeight} image={routine.image} navigation={navigation} />
          <Text style={{ color: 'white', fontSize: 24, marginVertical: 30, paddingLeft: 20, alignSelf: 'flex-start' }}>Next in Line</Text>
          <View style={{ width: '90%', backgroundColor: '#0b0b0b', marginBottom: 60, display: 'flex', alignItems: 'center' }}>
            <NestableScrollContainer>
              <DraggableFlatList
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item) => `draggable-item-${item.exerciseName}`}
                onDragEnd={({ data }) => setExercises(data)}
              />
            </NestableScrollContainer>
          </View>
          <Pressable style={{ backgroundColor: '#FF0431', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 20, marginBottom: 60 }} onPress={() => navigation.navigate('WorkoutComplete', { routine: routine })}>
            <Text style={{ color: 'white', fontSize: 20 }}>End Workout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0b0b',
    flex: 1,
  },

  scrollView: {
    backgroundColor: '#0b0b0b',
  },

  workout: {
    backgroundColor: '#0b0b0b',
    width: '100%',
    minHeight: Dimensions.get('window').height + 100,
    alignItems: 'center',
  },

  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#323743',
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },

  headerText_: {
    fontSize: 12,
    color: '#fff'
  },
})