import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default function WorkoutFinished1({ route, navigation }) {

  const { routine } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summary}>
        <Text style={{ color: '#fff', fontSize: 26, marginTop: 50 }}>Workout session Finished</Text>
        
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#E01439', width: '75%', padding: 5, borderRadius: 36 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <Ionicons name="flame-outline" size={24} color="white" style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Calories</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#0b0b0b', width: '100%', padding: 10, borderRadius: 36 }}>
            <Text style={{ color: 'white', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>400</Text>
            <Text style={{ color: 'white', fontSize: 22 }}>Calories Burned</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#24E014', width: '75%', padding: 5, borderRadius: 36 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <Ionicons name="checkmark-circle-outline" size={24} color="white" style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Sets Finished</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#0b0b0b', width: '100%', padding: 10, borderRadius: 36 }}>
            <Text style={{ color: 'white', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>20</Text>
            <Text style={{ color: 'white', fontSize: 22 }}>Sets Finished</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#157AFF', width: '75%', padding: 5, borderRadius: 36 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <Ionicons name="time-outline" size={24} color="white" style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Time</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#0b0b0b', width: '100%', padding: 10, borderRadius: 36 }}>
            <Text style={{ color: 'white', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>1</Text>
            <Text style={{ color: 'white', fontSize: 22 }}>Hour</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#FF4D15', width: '75%', padding: 5, borderRadius: 36 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <Ionicons name="barbell-outline" size={24} color="white" style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Kg Lifted</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#0b0b0b', width: '100%', padding: 10, borderRadius: 36 }}>
            <Text style={{ color: 'white', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>400</Text>
            <Text style={{ color: 'white', fontSize: 22 }}>Calories Burned</Text>
          </View>
        </View>
        
        <Pressable style={{ backgroundColor: '#0496FF', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 20, marginVertical: 40 }} onPress={() => navigation.navigate('Workout Finished 2', { routine: routine })}>
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
})