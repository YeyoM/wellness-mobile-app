import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { useState } from "react"

import TopNavigationBar from "../../components/TopNavigationBar"

export default function SelectAI({ navigation }) {

  const [selectAI, setSelectAI] = useState(true);
  const [selectNoAI, setSelectNoAI] = useState(false);

  const pressSelectAI = () => {
    setSelectAI(true);
    setSelectNoAI(false);
  }

  const pressSelectNoAI = () => {
    setSelectAI(false);
    setSelectNoAI(true);
  }

  const handleContinue = () => {
    if (!selectAI && !selectNoAI) {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setError('Por favor selecciona una opción');
      return;
    }

    if (selectAI) {
      navigation.navigate('AI')
    }

    if (selectNoAI) {
      navigation.navigate('Add Routine')
    }
  }


  return (
    <View style={styles.container}>
      <TopNavigationBar navigation={navigation} actualScreen={'Creating new Routine'} back={true}/>
      <View style={styles.content}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Do you want AI to help you with your new routine?</Text>
        <Pressable onPress={pressSelectAI} style={selectAI ? styles.btnSelected : styles.btn}>
          <Ionicons name='laptop-outline' size={20} color='#fff' style={{ marginRight: 5 }} />
          <Text style={styles.btnText}>Yes, Please</Text>
        </Pressable>
        <Pressable onPress={pressSelectNoAI} style={selectNoAI ? styles.btnSelected : styles.btn}>
          <Ionicons name='hammer-outline' size={20} color='#fff' style={{ marginRight: 5 }} />
          <Text style={styles.btnText}>No thanks, I’ll do it by myself</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Select Number Days Per Week')} style={styles.btnContinue}>
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
    backgroundColor: '#24262B',
    borderColor: '#0f0f0f',
    borderWidth: 2,
    width: '85%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  btnSelected: {
    backgroundColor: '#0496FF',
    borderColor: '#142749',
    borderWidth: 2,
    width: '85%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
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
  },

  btnContinueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }

})
