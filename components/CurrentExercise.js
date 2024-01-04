import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function CurrentExercise({ exercise, reps, sets, weight, image, navigation }) {

  console.log(image)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={{ uri: image }} style={{ width: 180, height: 130, borderRadius: 10, objectFit: 'cover' }} />
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text style={{ color: '#a0a0a0', fontSize: 13, marginTop: 25 }}>Current Exercise: </Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 5 }}>{exercise}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15, justifyContent: 'center' }}>
            <Ionicons name="flame-outline" size={24} color="white" />
            <Text style={{ color: '#c0c0c0', fontSize: 16, marginLeft: 5 }}>60 cal</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, borderRightWidth: 1, borderRightColor: '#a0a0a0' }}>
            <Text style={styles.reps}>Reps</Text>
            <Text style={styles.reps}>{reps}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, borderRightWidth: 1, borderRightColor: '#a0a0a0'  }}>
            <Text style={styles.sets}>Sets</Text>
            <Text style={styles.sets}>{sets}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10, borderRightWidth: 1, borderRightColor: '#a0a0a0'  }}>
            <Text style={styles.weight}>Weight</Text>
            <Text style={styles.weight}>{weight}kg</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={styles.rest}>Rest</Text>
            <Text style={styles.rest}>30s</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => navigation.navigate('Workout')}>
            <Ionicons name="play-circle-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={{ color: '#a0a0a0', fontSize: 12, marginTop: 0 }}>Tutorial</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323743',
    width: '90%',
    height: 220,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
  },

  exerciseText: {
    color: 'white',
    fontSize: 24,
    marginVertical: 10,
  },

  exerciseText_: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
  },

  top: {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  bottom: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  left: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reps: {
    color: '#a0a0a0',
    fontSize: 12,
  },

  sets: {
    color: '#a0a0a0',
    fontSize: 12,
  },

  weight: {
    color: '#a0a0a0',
    fontSize: 12,
  },

  rest: {
    color: '#a0a0a0',
    fontSize: 12,
  },
})