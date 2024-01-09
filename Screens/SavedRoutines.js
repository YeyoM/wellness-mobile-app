import React from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'

import Accordion from '../components/AccordionWorkout'

import { routines } from '../routines'

export default function SavedRoutines({ navigation }) {

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', marginTop: Constants.statusBarHeight }}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between' }}>
            <TextInput
              placeholder='Search'
              placeholderTextColor='rgba(147, 146, 154, 1)'
              style={{
                height: 50,
                borderWidth: 0,
                borderRadius: 14,
                paddingHorizontal: 20,
                backgroundColor: '#1F1F1F',
                color: '#fff',
                width: '84%',
                marginBottom: 20,
              }}
            />
            <Pressable style={styles.button}>
              <Ionicons name='filter-outline' size={30} color='#0496FF' />
            </Pressable>
          </View>
          <Pressable style={styles.createContainer} onPress={() => navigation.navigate('Add Routine')}>
            <Text style={styles.create}>Add new routine</Text>
            <Ionicons name='create-outline' size={30} color='#0496FF' />
          </Pressable>
          {routines.map((routine, index) => (
            <Accordion routine_={routine} key={index} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  createContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#24262B',
    padding: 10,
    borderRadius: 14,
  },

  create: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0496FF',
    marginBottom: 30,
  },

  button: {
    height: 50,
    width: "15%",
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
})