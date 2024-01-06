import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import * as Progress from 'react-native-progress'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'

export default function TopNavigationBar({ navigation, actualScreen, previousScreen, progress, back, steps, currentStep }) {
  return (
    <View style={styles.topBar}>
      {
        back && (
          <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, left: 20, height: 36, width: 36, zIndex: 999, backgroundColor: "#24262B", borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="chevron-back-outline" size={36} color="white" />
          </Pressable>
        )
      }
      { 
        previousScreen && (
          <Pressable onPress={() => navigation.navigate(previousScreen)} style={{ position: 'absolute', top: 10, left: 20, height: 36, width: 36, zIndex: 999, backgroundColor: "#24262B", borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="chevron-back-outline" size={36} color="white" />
        </Pressable>
        ) 
      }
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title}>{actualScreen}</Text>
        {
          progress && (
            <Progress.Bar
              progress={progress}
              width={100}
              height={4}
              color={'#0496FF'}
              unfilledColor={'#F9F9F9'}
              borderWidth={0}
              borderRadius={8}
              style={styles.progressBar}
            />
          )
        }
        {
          steps && (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#142749", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, marginBottom: 10 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{currentStep} of {steps}</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    top: 0,
    marginTop: Constants.statusBarHeight + 10,
    zIndex: 900,
    backgroundColor: '#0B0B0B',
  },

  title: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 5,
  },

  progressBar: {
    alignSelf: 'center',
    marginBottom: 5,
  }
})