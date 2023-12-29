import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EnableLocation() {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Ionicons name="navigate-circle-outline" size={80} color="#0496FF" style={{ marginVertical: 40 }} />
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center'  }}>Enable location services to access this feature</Text>
        <Pressable style={styles.buttonEnable}>
          <Text style={{ color: 'white' }}>Enable</Text>
        </Pressable>
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
  
  viewContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonEnable: {
    width: '30%',
    backgroundColor: '#0496FF',
    height: 36,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
})