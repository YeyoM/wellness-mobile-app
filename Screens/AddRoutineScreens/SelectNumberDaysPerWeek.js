import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { useState } from "react"

import TopNavigationBar from "../../components/TopNavigationBar"

export default function SelectNUmberDaysPerWeek({ navigation }) {

  const [days, setDays] = useState(0);

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'AI routine maker'} back={true}/>
      <View style={styles.content}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>How many days/wk will you commit?</Text>
        <Text style={{ color: '#fff', fontSize: 140, marginTop: 20, textAlign: 'center', fontWeight: 'bold' }}>{days}x</Text>
        <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: "#24262B", padding: 4, borderRadius: 16 }}>
          <Pressable onPress={() => setDays(1)} style={days === 1 ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>1</Text>
          </Pressable>
          <Pressable onPress={() => setDays(2)} style={days === 2 ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>2</Text>
          </Pressable>
          <Pressable onPress={() => setDays(3)} style={days === 3 ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>3</Text>
          </Pressable>
          <Pressable onPress={() => setDays(4)} style={days === 4 ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>4</Text>
          </Pressable>
          <Pressable onPress={() => setDays(5)} style={days === 5 ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>5</Text>
          </Pressable>
        </View>
        <Text style={{ color: '#fff', fontSize: 16, marginVertical: 20, textAlign: 'center' }}>I’m commited to exercising {days}x weekly</Text>
        <Pressable onPress={() => navigation.navigate('Select Workout Duration')} style={styles.btnContinue}>
          <Text style={styles.btnContinueText}>Continue</Text>
        </Pressable>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0b0b',
    flex: 1,
    alignItems: 'center'
  },

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn: {
    backgroundColor: '#24262F',
    borderColor: '#24262F',
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 16,
  },

  btnSelected: {
    backgroundColor: '#0496FF',
    borderColor: '#142749',
    borderWidth: 2,
    width: "18%",
    aspectRatio: 1,

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 16,
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  btnContinue: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 2,
    width: '85%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 30,
  },

  btnContinueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }

})
