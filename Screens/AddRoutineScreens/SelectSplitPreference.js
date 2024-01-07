import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { useState } from "react"

import TopNavigationBar from "../../components/TopNavigationBar"

export default function SelectSplitPreference({ navigation }) {

  const [ selectArnold, setSelectArnold ] = useState(false);
  const [ selectPushPull, setSelectPushPull ] = useState(false);
  const [ selectBroSplit, setSelectBroSplit ] = useState(false);
  const [ selectUpperLower, setSelectUpperLower ] = useState(false);

  const pressSelectArnold = () => {
    setSelectArnold(true);
    setSelectPushPull(false);
    setSelectBroSplit(false);
    setSelectUpperLower(false);
  }

  const pressSelectPushPull = () => {
    setSelectArnold(false);
    setSelectPushPull(true);
    setSelectBroSplit(false);
    setSelectUpperLower(false);
  }

  const pressSelectBroSplit = () => {
    setSelectArnold(false);
    setSelectPushPull(false);
    setSelectBroSplit(true);
    setSelectUpperLower(false);
  }

  const pressSelectUpperLower = () => {
    setSelectArnold(false);
    setSelectPushPull(false);
    setSelectBroSplit(false);
    setSelectUpperLower(true);
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'AI Routine Maker'} back={true} />
      <View style={styles.content}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Do you have a specific workout split preference?</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <Pressable onPress={pressSelectArnold} style={selectArnold ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>Arnold Split</Text>
            <Text style={selectArnold ? styles.btnTextSelected : styles.btnText_}>Arms and shoulders focused</Text>
          </Pressable>
          <Pressable onPress={pressSelectPushPull} style={selectPushPull ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>Push Pull</Text>
            <Text style={selectPushPull ? styles.btnTextSelected : styles.btnText_}>All around, compound lifts</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <Pressable onPress={pressSelectBroSplit} style={selectBroSplit ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>Bro Split</Text>
            <Text style={selectBroSplit ? styles.btnTextSelected : styles.btnText_}>One muscle per day</Text>
          </Pressable>
          <Pressable onPress={pressSelectUpperLower} style={selectUpperLower ? styles.btnSelected : styles.btn}>
            <Text style={styles.btnText}>Upper Lower</Text>
            <Text style={selectUpperLower ? styles.btnTextSelected : styles.btnText_}>One day upper body. One day lower. Repeat! </Text>
          </Pressable>
        </View>
        <Pressable style={styles.btnContinue} onPress={() => navigation.navigate('Creating Routine AI')}>
          <Text style={styles.btnContinueText}>Get my Routine</Text>
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
    backgroundColor: '#24262B',
    borderColor: '#0f0f0f',
    borderWidth: 2,
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 20,
    minHeight: 160,
  },

  btnSelected: {
    backgroundColor: '#0496FF',
    borderColor: '#142749',
    borderWidth: 2,
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 20,
    minHeight: 160,
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

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  btnText_: {
    color: '#9EA0A5',
    fontSize: 12,
  },

  btnTextSelected: {
    color: '#fff',
    fontSize: 12,
  },

  btnContinueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }

})
