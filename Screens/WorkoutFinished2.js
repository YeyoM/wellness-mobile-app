import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

import * as Progress from 'react-native-progress'


export default function WorkoutFinished2({ route, navigation }) {

  const { routine } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summary}>

        <Text style={{ color: '#fff', fontSize: 26, marginTop: 50, alignSelf: 'flex-start', marginLeft: 30 }}>Daily Challenge</Text>
        <View style={styles.accomplishments}>
          <View>
            <Text style={styles.accomplishmentsText}>Burn 300 calories</Text>
            <Text style={styles.accomplishmentsText_}>Done</Text>
            <Progress.Bar
              progress={1}
              width={200}
              height={4}
              color={'#0496FF'}
              unfilledColor={'#fff'}
              borderWidth={0}
              borderRadius={8}
              style={styles.progressBar}
            />
          </View>
          <Ionicons name='trophy' size={30} color='#0496FF' />
        </View>

        <Text style={{ color: '#fff', fontSize: 26, marginTop: 20, alignSelf: 'flex-start', marginLeft: 30 }}>Weekly Challenge</Text>
        <View style={styles.accomplishments}>
          <View>
            <Text style={styles.accomplishmentsText}>Finish 75 sets</Text>
            <Text style={styles.accomplishmentsText_}>Keep Going</Text>
            <Progress.Bar
              progress={1}
              width={200}
              height={4}
              color={'#0496FF'}
              unfilledColor={'#fff'}
              borderWidth={0}
              borderRadius={8}
              style={styles.progressBar}
            />
          </View>
          <Ionicons name='trophy' size={30} color='#0496FF' />
        </View>

        <Text style={{ color: '#fff', fontSize: 26, marginTop: 20, alignSelf: 'flex-start', marginLeft: 30 }}>Current Streak</Text>

        <Ionicons name='flame-outline' size={60} color='white' style={{ alignSelf: 'center', marginTop: 30 }} />
        <Text style={{ color: '#fff', fontSize: 26, marginTop: 0, alignSelf: 'center' }}>3 days</Text>

        <Pressable style={{ backgroundColor: '#0496FF', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 20, marginVertical: 40 }} onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: 'white', fontSize: 20 }}>Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0b0b',
    flex: 1,
  },

  summary: {
    backgroundColor: '#0b0b0b',
    width: '100%',
    minHeight: Dimensions.get('window').height,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
  },


  accomplishments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#323743',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 20,
  },

  accomplishmentsText: {
    color: '#fff',
    fontSize: 12,
  },

  accomplishmentsText_: {
    color: '#fff',
    fontSize: 10,
  },

  progressBar: {
    marginTop: 15,
  }
})