import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, RefreshControl } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'

import { userSavedExercises } from "../firebaseFunctions.js"; 

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

  const [ exercises, setExercises ] = useState(null);
  const [refreshing, setRefreshing] = useState(false)
  const [ error, setError ] = useState(null);

  const saveExercisesStorage = async (exercises) => {
    try {
      const jsonValue = JSON.stringify(exercises)
      await AsyncStorage.setItem('@exercises', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getExercisesStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@exercises')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {

    // Check in the async storage if the user has saved excercises
    // If the user has saved exercises, set them in the state
    // If the user doesn't have saved exercises, fetch them from the API
    // and save them in the async storage
   
    getExercisesStorage().then((exercises) => {
      if (exercises) {
        setExercises(exercises);
      } else {
        userSavedExercises(routine.userId, setExercises, setError, setRefreshing);
        saveExercisesStorage(exercises);
      }
    });

  }, []);

  const handleAddLift = async ({ lift }) => {
    
    console.log('adding lift');

    // check if the lift is already in the exercise list of the current day
    // if it is, don't add it
    const isAlreadyInList = routine.days[currentDay].exercises.find((exercise) => exercise.exerciseId === lift.id);
    if (isAlreadyInList) {
      return;
    }

    const newLift = {
      exerciseId: lift.id,
      exerciseName: lift.exerciseName,
      numberOfSets: lift.defaultNumberOfSets,
      numberOfReps: lift.defaultNumberOfReps,
      weight: lift.defaultWeight,
      restTime: lift.defaultRestTime,
    };

    // add lift to the exercise list of the current day
    setRoutine((prevRoutine) => {
      const newRoutine = { ...prevRoutine };
      newRoutine.days[currentDay].exercises.push(newLift);
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
            <ScrollView 
              style={{ width: '100%', minHeight: 600 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {userSavedExercises(routine.userId, setExercises, setError, setRefreshing)}}
                />
              }
            >
              <View style={styles.exercises}>
                <TextInput
                  style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginBottom: 20, backgroundColor: '#4A4A4B', padding: 14, borderRadius: 20 }}
                  placeholder="Search for a lift"
                />
                {/** User's saved lifts */}
                { error && <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>{error.message}</Text> }
                { exercises && !refreshing && exercises.map((lift) => (
                   <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: '#313231', padding: 14, borderRadius: 20 }} key={lift.id}>
                  <Pressable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#157AFF', padding: 14, borderRadius: 20, width: 80 }}
                    onPress={() => handleAddLift({ lift: lift })}
                  >
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Add</Text>
                    <Ionicons name="add-outline" size={26} color="white" />
                  </Pressable>
                  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', width: '48%' }}>{lift.exerciseName}</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Workout')}> 
                      <Ionicons name="play-circle-outline" size={32} color="white" />
                    </Pressable>
                    <Text style={{ color: '#a0a0a0', fontSize: 12, marginTop: 0 }}>Tutorial</Text>
                  </View>
                </View>
                )) }
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
