import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EnableLocation from './EnableLocation';
import CurrentCapacity from './CurrentCapacity';
import DailyCapacity from './DailyCapacity';

export default function Crowdmeter() {

  const [date, setDate] = useState(new Date())

  const [location, setLocation] = useState(true)

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.crowdmeter}>
          <View style={{ flexDirection: 'column', marginTop: 20, width: '90%' }}>
            {
              location === null ?
                <EnableLocation />
                :
                <View>
                  <CurrentCapacity />
                  <DailyCapacity />
                </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
  },

  crowdmeter: {
    width: '100%',
    backgroundColor: '#0b0b0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 16,
  }
})