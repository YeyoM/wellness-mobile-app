import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function PreviewWorkout({ routine, navigation }) {

  // console.log(routine)

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Image
          source={require('../assets/leg_day.png')}
          style={{ width: "100%", resizeMode: 'contain', borderRadius: 14 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', width: '70%' }}>
            <Text style={styles.textTitle}>{routine.routineName}</Text>
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={styles.routineInfo}>{routine.duration} min</Text>
              <Text style={styles.routineInfo}>{routine.calories} cal</Text>
              <Text style={styles.routineInfo}>{routine.sets} sets</Text>
            </View>
          </View>
          <Pressable style={styles.buttonStart} onPress={() => navigation.navigate('Workout In Progress', { routine: routine })}>
            <Text style={{ color: 'white' }}>Start</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323743',
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
  },
  
  textTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  },
  
  viewContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  routineInfo: {
    fontSize: 11,
    color: '#f0f0f0',
    marginRight: 8,
    marginTop: 5,
  },

  buttonStart: {
    width: '30%',
    backgroundColor: '#0496FF',
    height: 36,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  },
});